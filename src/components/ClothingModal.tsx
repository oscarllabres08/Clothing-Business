import { X, Shirt, Palette, Ruler, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { ClothingItem } from '../lib/supabase';

interface ClothingModalProps {
  item: ClothingItem | null;
  onClose: () => void;
}

export function ClothingModal({ item, onClose }: ClothingModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!item) return null;

  const images = item.image_urls && item.image_urls.length > 0 ? item.image_urls : ['/placeholder.png'];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasMultipleImages) {
      nextImage();
    }
    if (isRightSwipe && hasMultipleImages) {
      prevImage();
    }
  };

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="relative">
            <div
              onClick={handleImageClick}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="cursor-pointer select-none"
            >
              <img
                src={images[currentImageIndex]}
                alt={`${item.name} - Image ${currentImageIndex + 1}`}
                className="w-full aspect-[3/4] object-cover rounded-t-xl sm:rounded-t-2xl"
                draggable={false}
              />
            </div>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-700 transition-colors z-10 shadow-md"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            {item.status === 'sold' && (
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-500 text-white text-sm sm:text-lg font-bold rounded-lg z-10 shadow-md">
                SOLD
              </div>
            )}
            
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-700 transition-colors z-10 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-700 transition-colors z-10 shadow-md"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-6'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 text-gray-700 text-xs rounded z-10 shadow-md">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          <div className="p-4 sm:p-6 md:p-8 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 truncate">
                  {item.name}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs sm:text-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-3xl sm:text-4xl font-bold text-sky-600">
                  ₱{item.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-sky-50 border border-sky-100 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-1.5 sm:mb-2">
                <Ruler className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Size</span>
              </div>
              <p className="text-gray-900 font-semibold text-base sm:text-lg">{item.size}</p>
            </div>

            <div className="bg-sky-50 border border-sky-100 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-1.5 sm:mb-2">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Color</span>
              </div>
              <p className="text-gray-900 font-semibold text-base sm:text-lg truncate">{item.color}</p>
            </div>

            <div className="bg-sky-50 border border-sky-100 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-1.5 sm:mb-2">
                <Shirt className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Material</span>
              </div>
              <p className="text-gray-900 font-semibold text-base sm:text-lg truncate">{item.material}</p>
            </div>

            </div>

          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Item Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-700">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-semibold text-gray-900">{item.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 font-semibold text-gray-900">{item.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className={`ml-2 font-semibold ${item.status === 'sold' ? 'text-gray-500' : 'text-sky-600'}`}>
                  {item.status === 'sold' ? 'Sold' : 'Available'}
                </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[60]"
          onClick={handleCloseFullscreen}
        >
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-4 right-4 p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-700 transition-colors z-10 shadow-lg"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={images[currentImageIndex]}
              alt={`${item.name} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />

            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-700 transition-colors z-10 shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-700 transition-colors z-10 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-8 h-2'
                          : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                      } rounded-full`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/90 text-gray-700 text-sm rounded z-10 shadow-lg">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
