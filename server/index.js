import 'dotenv/config';
import express from 'express';
import { createMemes } from './memes-core.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8787;

app.post('/api/memes', async (req, res) => {
  try {
    const memes = await createMemes(req.body?.category);
    res.json({ memes });
  } catch (err) {
    const status = err.status ?? 502;
    if (status >= 500) {
      console.error('[/api/memes] failed:', err.message);
    }
    res.status(status).json({
      error: status === 400 ? err.message : 'Failed to generate memes',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Meme backend listening on http://localhost:${PORT}`);
});
