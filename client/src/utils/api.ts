import type { MemeResponse, ApiError, Category } from '../types/meme';

const API_BASE = '/api';

export async function generateMemes(category: Category): Promise<MemeResponse> {
  const response = await fetch(`${API_BASE}/memes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category }),
  });

  if (!response.ok) {
    const errorData: ApiError = await response
      .json()
      .catch(() => ({ error: 'Failed to generate memes' }));
    throw new Error(errorData.error || 'Failed to generate memes');
  }

  return response.json();
}

export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/health`, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
}
