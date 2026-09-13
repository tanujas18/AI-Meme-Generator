import type { CategoryOption } from '../types/meme';

interface CategoryCardProps {
  category: CategoryOption;
  isActive: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export function CategoryCard({ category, isActive, disabled, onSelect }: CategoryCardProps) {
  return (
    <button
      type="button"
      className={`category-card ${isActive ? 'category-card--active' : ''}`}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={isActive}
      aria-disabled={disabled}
    >
      <span className="category-card__emoji" aria-hidden="true">
        {category.emoji}
      </span>
      <span className="category-card__label">{category.label}</span>
      <span className="category-card__blurb">{category.blurb}</span>
    </button>
  );
}
