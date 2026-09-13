export function EmptyState() {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <h2 className="empty-state__title">Pick a category to start</h2>
      <p className="empty-state__hint">
        We'll whip up 5 fresh memes — captions written by AI, printed onto classic meme templates.
      </p>
    </div>
  );
}
