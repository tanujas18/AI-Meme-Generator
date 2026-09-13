import { CATEGORIES, type Category } from '../types/meme';
import { CategoryCard } from './CategoryCard';

interface CategoryPickerProps {
  activeCategory: Category | null;
  disabled?: boolean;
  onSelect: (category: Category) => void;
}

export function CategoryPicker({ activeCategory, disabled, onSelect }: CategoryPickerProps) {
  return (
    <div className="category-grid" role="group" aria-label="Meme categories">
      {CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat.value}
          category={cat}
          isActive={activeCategory === cat.value}
          disabled={disabled}
          onSelect={() => onSelect(cat.value)}
        />
      ))}
    </div>
  );
}
