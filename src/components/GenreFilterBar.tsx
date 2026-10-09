import React from 'react';
import { CategoryFilter } from '../types/symposium';

interface GenreFilterBarProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
}

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Arenas' },
  { id: 'tech', label: '💻 Technical Events' },
  { id: 'nontech', label: '🎯 Non-Technical Events' },
];

export const GenreFilterBar: React.FC<GenreFilterBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="sticky top-[68px] z-30 bg-[#141414]/95 backdrop-blur-md border-y border-white/10 py-3.5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                  : 'bg-[#222222] text-neutral-200 hover:bg-[#303030] hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
