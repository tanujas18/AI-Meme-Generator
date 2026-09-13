import type { Meme } from '../types/meme';
import { useEffect } from 'react';

interface MemeModalProps {
  meme: Meme;
  onClose: () => void;
}

export function MemeModal({ meme, onClose }: MemeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Meme preview"
      onClick={handleBackdropClick}
    >
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close preview"
          autoFocus
        >
          ×
        </button>
        <img className="modal__img" src={meme.imageUrl} alt={meme.caption} />
        <p className="modal__caption">{meme.caption}</p>
        <a
          className="modal__open btn btn--primary"
          href={meme.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open image in new tab
        </a>
      </div>
    </div>
  );
}
