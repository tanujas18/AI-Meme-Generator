import type { Meme } from '../types/meme';
import { MemeCard } from './MemeCard';
import { MemeModal } from './MemeModal';
import { useState } from 'react';

interface MemeGalleryProps {
  memes: Meme[];
  activeLabel: string | undefined;
  onShuffle: () => void;
}

export function MemeGallery({ memes, activeLabel, onShuffle }: MemeGalleryProps) {
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);

  return (
    <section className="gallery" aria-labelledby="gallery-title">
      <div className="results-bar">
        <h2 id="gallery-title" className="results-bar__title">
          {activeLabel} memes
        </h2>
        <button type="button" className="btn btn--ghost" onClick={onShuffle}>
          🔀 Shuffle again
        </button>
      </div>

      <div className="gallery__grid">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} onOpen={setSelectedMeme} />
        ))}
      </div>

      {selectedMeme && <MemeModal meme={selectedMeme} onClose={() => setSelectedMeme(null)} />}
    </section>
  );
}
