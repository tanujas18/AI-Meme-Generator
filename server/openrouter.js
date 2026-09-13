// ─────────────────────────────────────────────────────────────────────────────
//  OpenRouter meme-text generation (server-side only).
//
//  Uses the OpenAI-compatible Chat Completions endpoint OpenRouter exposes.
//  We try a list of FREE models in order, so the demo keeps working even if one
//  is rate-limited or retired. Browse current free models at:
//    https://openrouter.ai/models?max_price=0
//
//  The key idea for GOOD memes: we don't ask for generic captions. We tell the
//  model exactly which meme template each line is for, and its joke structure,
//  so the text actually fits the format (that's what viral memes do).
// ─────────────────────────────────────────────────────────────────────────────
const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

// NOTE: OpenRouter's free catalog changes often. If these all 404, run
// `GET https://openrouter.ai/api/v1/models` and swap in current `:free` ids
// (or set OPENROUTER_MODEL in .env).
// Ordered by SPEED (fastest first) for Vercel 10s/60s timeout limits.
const FREE_MODELS = [
  process.env.OPENROUTER_MODEL, // override from .env (fastest flash model)
  'inclusionai/ling-3.0-flash:free',      // fastest: flash model ~2-5s
  'openai/gpt-oss-20b:free',              // backup: 20B params ~5-10s
  'google/gemma-4-26b-a4b-it:free',       // backup: 26B params ~10-15s
  'nvidia/nemotron-3-nano-30b-a3b:free',  // backup: 30B params ~15-20s
  'google/gemma-4-31b-it:free',           // slower: 31B params ~20-30s
  'nvidia/nemotron-3-super-120b-a12b:free', // slowest: 120B params ~30-60s
].filter(Boolean);

// templates: [{ id, lines, brief }]  ->  [{ top, bottom }] (one per template)
export async function generateMemeTexts(theme, templates) {
  const apiKey = process.env.OPEN_ROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPEN_ROUTER_API_KEY is missing from .env');
  }

  const prompt = buildPrompt(theme, templates);

  let lastError;
  for (const model of FREE_MODELS) {
    try {
      const texts = await callModel(apiKey, model, prompt);
      if (texts.length >= 1) {
        return normalize(texts, templates.length);
      }
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error('No meme text returned by any model');
}

function buildPrompt(theme, templates) {
  const list = templates
    .map((t, i) => {
      const eg = (t.example || []).filter(Boolean).join('  ->  ') || 'setup -> punchline';
      const slots = t.lines === 2 ? 'top + bottom' : 'one line';
      return `${i + 1}. ${t.name} (${slots}). Its format looks like:  ${eg}`;
    })
    .join('\n');

  return [
    `Write ${templates.length} genuinely funny, RELATABLE memes about ${theme}.`,
    '',
    'WHAT MAKES A GOOD MEME (read carefully):',
    '- Each meme = ONE specific everyday situation with a clear setup and a punchline.',
    '- Every line must be a COMPLETE, natural Hinglish sentence, like texting a friend.',
    '- The two lines must connect into ONE joke. NEVER write disconnected keywords.',
    '- Be specific + relatable: padhai, salary, shaadi, cricket, reels, mummy ki daant, EMI.',
    '- Hinglish = Hindi + English in Roman/English letters. Casual spoken tone.',
    '- Keep each line under ~10 words. No emojis, no hashtags, no quotes, no gaali.',
    '',
    'BAD (never do this): "Hero dialogue yaad, public ne mazak udaya"  <- random fragments, no joke.',
    'GOOD (match this coherence + relatability):',
    '  Drake        -> top: "Gym ka membership lena"       bottom: "Ek din jaake sirf photo daalna"',
    '  Futurama Fry -> top: "Not sure if sach me bhookh hai" bottom: "ya bas bore ho raha hoon"',
    '  Wonka        -> top: "Oh, tumne ek match dekha?"      bottom: "Ab toh tum coach ban gaye"',
    '  This Is Fine (one line): "Exam kal hai aur main abhi bhi reels dekh raha hoon"',
    '',
    'Now write for these templates, IN ORDER. Fit YOUR situation into each format:',
    list,
    '',
    'Reply with ONLY this JSON (bottom = "" for one-line templates):',
    '{"memes":[{"top":"...","bottom":"..."}]}',
  ].join('\n');
}

async function callModel(apiKey, model, prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a savage desi meme writer who thinks in Hinglish and knows ' +
              'every classic meme template by heart. You always reply with valid JSON.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.9,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // fetch does NOT throw on 4xx/5xx — check res.ok yourself (Week 1, Slide 22).
    if (!res.ok) {
      throw new Error(`OpenRouter responded ${res.status} for ${model}`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content ?? '';
    return parseMemes(text);
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      throw new Error(`Model ${model} timed out after 25s`);
    }
    throw err;
  }
}

// Models sometimes wrap JSON in ``` fences or add stray text. Parse leniently.
function parseMemes(text) {
  const cleaned = text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  try {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      const obj = JSON.parse(match[0]);
      const list = Array.isArray(obj.memes) ? obj.memes : Array.isArray(obj) ? obj : null;
      if (list) return list.map(toMeme);
    }
  } catch {
    // fall through
  }

  // Fallback: treat each non-empty line as a single-line meme.
  return cleaned
    .split('\n')
    .map((line) =>
      line
        .replace(/^[-*\d.)\s]+/, '')
        .replace(/^"|"$/g, '')
        .trim()
    )
    .filter(Boolean)
    .map((top) => ({ top, bottom: '' }));
}

// Accept a few shapes the model might use and normalise to { top, bottom }.
function toMeme(item) {
  if (typeof item === 'string') return { top: item.trim(), bottom: '' };
  const top = item.top ?? item.line1 ?? item.text ?? '';
  const bottom = item.bottom ?? item.line2 ?? '';
  return { top: String(top).trim(), bottom: String(bottom).trim() };
}

function normalize(texts, count) {
  return texts.slice(0, count).filter((t) => t.top || t.bottom);
}
