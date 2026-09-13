interface SpinnerProps {
  label?: string;
}

export function Spinner({ label = 'Cooking up memes…' }: SpinnerProps) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <div className="spinner__ring" aria-hidden="true"></div>
      <span className="spinner__label">{label}</span>
    </div>
  );
}
