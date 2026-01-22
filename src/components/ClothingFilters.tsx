import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ['All', 'Men', 'Women', 'Unisex'];

interface ClothingFiltersProps {
  selectedCategory: string;
  selectedBrand: string;
  brands: string[];
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
}

export function ClothingFilters({
  selectedCategory,
  selectedBrand,
  brands,
  onCategoryChange,
  onBrandChange
}: ClothingFiltersProps) {
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <span className="text-gray-700 font-medium text-sm sm:text-base">Category:</span>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
