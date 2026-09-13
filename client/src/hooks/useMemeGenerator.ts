import { useState, useCallback } from 'react';
import { generateMemes } from '../api/memes';
import type { Meme, Category } from '../types/meme';

export function useMemeGenerator() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = useCallback(async (category: Category) => {
    setLoading(true);
    setError('');
    setActiveCategory(category);

    try {
      const results = await generateMemes(category);
      setMemes(results);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { memes, activeCategory, loading, error, generate };
}
