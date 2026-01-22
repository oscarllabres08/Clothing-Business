import { Shirt, Palette, Ruler, MessageCircle } from 'lucide-react';
import { ClothingItem } from '../lib/supabase';
import { generateMessengerUrl } from '../utils/messenger';

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
    <div className="bg-slate-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-rose-500 transition-all">
      <div className="relative aspect-[3/4]">
        <img
          src={item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : '/placeholder.png'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1 sm:gap-2">
          <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 bg-slate-700 text-white text-[10px] sm:text-xs md:text-sm font-medium rounded-full">
            {item.category}
          </span>
          {isSold && (
            <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
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
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="px-6 py-3 border-2 border-red-500 text-red-500 text-2xl font-extrabold tracking-[0.3em] uppercase bg-black/80 rounded-lg">
              SOLD
            </span>
          </div>
        )}
      </div>

      <div className="p-2 sm:p-4 md:p-5">
        <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
          <div className="flex-1 min-w-0 pr-1 sm:pr-2">
            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white truncate">
              {item.name}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">{item.color}</p>
          </div>
          <p className="text-base sm:text-xl md:text-2xl font-bold text-rose-500 flex-shrink-0">
            ₱{item.price.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-300">
            <Ruler className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{item.size}</span>
          </div>
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-300">
            <Palette className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{item.color}</span>
          </div>
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-300">
            <Shirt className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{item.material}</span>
          </div>
        </div>

        {!showActions ? (
          <div className="space-y-1.5 sm:space-y-2">
            <button
              onClick={() => onViewDetails(item)}
              className="w-full py-1.5 sm:py-2.5 md:py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors text-xs sm:text-sm md:text-base"
            >
              View Details
            </button>
            <a
              href={generateMessengerUrl(item)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-1.5 sm:py-2.5 md:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-xs sm:text-sm md:text-base flex items-center justify-center space-x-1 sm:space-x-2"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span>Message</span>
            </a>
          </div>
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
                className="py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
