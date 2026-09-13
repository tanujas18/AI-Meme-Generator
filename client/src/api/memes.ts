import type { Meme, Category } from '../types/meme';

export async function generateMemes(category: Category): Promise<Meme[]> {
  const res = await fetch('/api/memes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category }),
  });

  if (!res.ok) {
    throw new Error("Couldn't generate memes. Please try again.");
  }

  const data = await res.json();
  return data.memes as Meme[];
}
