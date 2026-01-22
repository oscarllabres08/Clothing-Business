import { Shirt, Palette, Ruler } from 'lucide-react';
import { ClothingItem } from '../lib/supabase';

interface ClothingCardProps {
  item: ClothingItem;
  onViewDetails: (item: ClothingItem) => void;
  showActions?: boolean;
  onEdit?: (item: ClothingItem) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (item: ClothingItem) => void;
}

export function ClothingCard({
  item,
  onViewDetails,
  showActions = false,
  onEdit,
  onDelete,
  onToggleStatus
}: ClothingCardProps) {
  const isSold = item.status === 'sold';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-200 transition-all">
      <div className="relative aspect-[3/4]">
        <img
          src={item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : '/placeholder.png'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1 sm:gap-2">
          <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 bg-sky-100 text-sky-700 text-[10px] sm:text-xs md:text-sm font-medium rounded-full">
            {item.category}
          </span>
          {isSold && (
            <span className="px-3 py-1 bg-gray-500 text-white text-sm font-bold rounded-full">
              SOLD
            </span>
          )}
        </div>
        {item.image_urls && item.image_urls.length > 1 && (
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-black/60 text-white text-[10px] sm:text-xs font-medium rounded">
            +{item.image_urls.length - 1}
          </div>
        )}

        {isSold && !showActions && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="px-6 py-3 border-2 border-gray-500 text-gray-700 text-2xl font-extrabold tracking-[0.3em] uppercase bg-white/90 rounded-lg">
              SOLD
            </span>
          </div>
        )}
      </div>

      <div className="p-2 sm:p-4 md:p-5 bg-white">
        <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
          <div className="flex-1 min-w-0 pr-1 sm:pr-2">
            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 truncate">
              {item.name}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">{item.color}</p>
          </div>
          <p className="text-base sm:text-xl md:text-2xl font-bold text-sky-600 flex-shrink-0">
            ₱{item.price.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-600">
            <Ruler className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{item.size}</span>
          </div>
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-600">
            <Palette className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{item.color}</span>
          </div>
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-600">
            <Shirt className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{item.material}</span>
          </div>
        </div>

        {!showActions ? (
          <button
            onClick={() => onViewDetails(item)}
            className="w-full py-1.5 sm:py-2.5 md:py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors text-xs sm:text-sm md:text-base shadow-sm"
          >
            View Details
          </button>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onEdit?.(item)}
                className="py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Shirt className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete?.(item.id)}
                className="py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => onToggleStatus?.(item)}
              className={`w-full py-2 rounded-lg transition-colors ${
                isSold
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isSold ? 'Mark as Available' : 'Mark as Sold'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
