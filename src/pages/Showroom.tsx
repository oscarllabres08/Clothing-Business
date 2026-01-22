import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Header } from '../components/Header';
import { ClothingFilters } from '../components/ClothingFilters';
import { ClothingCard } from '../components/ClothingCard';
import { ClothingModal } from '../components/ClothingModal';
import { LoginModal } from '../components/LoginModal';
import { useClothingItems } from '../hooks/useClothingItems';
import { ClothingItem } from '../lib/supabase';

export function Showroom() {
  const { clothingItems, loading } = useClothingItems();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const filteredItems = useMemo(() => {
    return clothingItems.filter((item) => {
      const categoryMatch =
        selectedCategory === 'All' || item.category === selectedCategory;
      const searchMatch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.color.toLowerCase().includes(searchQuery.toLowerCase());
      // Show both available and sold items; status is indicated on the card
      return categoryMatch && searchMatch;
    });
  }, [clothingItems, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header onAdminClick={() => setShowLoginModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8 space-y-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3">Our Collection</h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Browse our stylish collection of quality clothing and accessories.
            </p>
          </div>

          <div className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder:text-gray-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <ClothingFilters
          selectedCategory={selectedCategory}
          selectedBrand="All"
          brands={[]}
          onCategoryChange={setSelectedCategory}
          onBrandChange={() => {}}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading items...</p>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No items found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <ClothingCard
                key={item.id}
                item={item}
                onViewDetails={setSelectedItem}
              />
            ))}
          </div>
        )}
      </main>

      {selectedItem && (
        <ClothingModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
