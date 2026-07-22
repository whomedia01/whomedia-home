import React from 'react';
import { CategoryType } from '../types';

interface CategoryPillsProps {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div id="category-pills" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
              isSelected
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow-indigo-500/10 scale-[1.02]'
                : 'bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/80'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
