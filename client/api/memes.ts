import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createMemes } from '../../server/memes-core';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const memes = await createMemes(req.body?.category);
    res.status(200).json({ memes });
  } catch (err: any) {
    const status = err.status ?? 502;
    if (status >= 500) {
      console.error('[/api/memes] failed:', err.message);
    }
    res.status(status).json({
      error: status === 400 ? err.message : 'Failed to generate memes',
    });
  }
}