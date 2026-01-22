import { X, Shirt, Palette, Ruler, Calendar, Tag } from 'lucide-react';
import { ClothingItem } from '../lib/supabase';

interface ClothingModalProps {
  item: ClothingItem | null;
  onClose: () => void;
}

export function ClothingModal({ item, onClose }: ClothingModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-slate-800 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={item.image_url}
            alt={`${item.brand} ${item.name}`}
            className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-t-xl sm:rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-slate-900 bg-opacity-80 hover:bg-opacity-100 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {item.status === 'sold' && (
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white text-sm sm:text-lg font-bold rounded-lg">
              SOLD
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 truncate">
                {item.brand} {item.name}
              </h2>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs sm:text-sm">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-3xl sm:text-4xl font-bold text-rose-500">
                ₱{item.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-slate-700 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 mb-1.5 sm:mb-2">
                <Ruler className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Size</span>
              </div>
              <p className="text-white font-semibold text-base sm:text-lg">{item.size}</p>
            </div>

            <div className="bg-slate-700 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 mb-1.5 sm:mb-2">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Color</span>
              </div>
              <p className="text-white font-semibold text-base sm:text-lg truncate">{item.color}</p>
            </div>

            <div className="bg-slate-700 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 mb-1.5 sm:mb-2">
                <Shirt className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Material</span>
              </div>
              <p className="text-white font-semibold text-base sm:text-lg truncate">{item.material}</p>
            </div>

            <div className="bg-slate-700 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 mb-1.5 sm:mb-2">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Brand</span>
              </div>
              <p className="text-white font-semibold text-base sm:text-lg truncate">{item.brand}</p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-4 sm:pt-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Item Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-300">
              <div>
                <span className="text-gray-400">Brand:</span>
                <span className="ml-2 font-semibold text-white">{item.brand}</span>
              </div>
              <div>
                <span className="text-gray-400">Name:</span>
                <span className="ml-2 font-semibold text-white">{item.name}</span>
              </div>
              <div>
                <span className="text-gray-400">Category:</span>
                <span className="ml-2 font-semibold text-white">{item.category}</span>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <span className={`ml-2 font-semibold ${item.status === 'sold' ? 'text-red-500' : 'text-green-500'}`}>
                  {item.status === 'sold' ? 'Sold' : 'Available'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
