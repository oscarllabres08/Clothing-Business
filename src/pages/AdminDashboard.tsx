import { useState, useMemo } from 'react';
import { Shirt, LogOut, Plus, Search, ChevronDown } from 'lucide-react';
import { ClothingCard } from '../components/ClothingCard';
import { ClothingFormModal } from '../components/ClothingFormModal';
import { useAuth } from '../contexts/AuthContext';
import { useClothingItems } from '../hooks/useClothingItems';
import { supabase, ClothingItem } from '../lib/supabase';

const CATEGORIES = ['All Categories', 'Men', 'Women', 'Unisex'];
const STATUSES = ['All Status', 'available', 'sold'];

export function AdminDashboard() {
  const { signOut } = useAuth();
  const { clothingItems, loading, refetch } = useClothingItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredItems = useMemo(() => {
    return clothingItems.filter((item) => {
      const searchMatch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch =
        selectedCategory === 'All Categories' || item.category === selectedCategory;
      const statusMatch =
        selectedStatus === 'All Status' || item.status === selectedStatus;
      return searchMatch && categoryMatch && statusMatch;
    });
  }, [clothingItems, searchQuery, selectedCategory, selectedStatus]);

  const handleAddItem = async (data: Partial<ClothingItem>) => {
    const { error } = await supabase.from('clothing_items').insert([data]);
    if (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    } else {
      setShowAddModal(false);
      refetch();
    }
  };

  const handleUpdateItem = async (data: Partial<ClothingItem>) => {
    if (!editingItem) return;
    const { error } = await supabase
      .from('clothing_items')
      .update(data)
      .eq('id', editingItem.id);
    if (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    } else {
      setEditingItem(null);
      refetch();
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const { error } = await supabase.from('clothing_items').delete().eq('id', id);
    if (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
    else {
      refetch();
    }
  };

  const handleToggleStatus = async (item: ClothingItem) => {
    const nextStatus = item.status === 'sold' ? 'available' : 'sold';

    const { error } = await supabase
      .from('clothing_items')
      .update({ status: nextStatus })
      .eq('id', item.id);

    if (error) {
      console.error('Error updating item status:', error);
      alert('Failed to update item status');
    }
    else {
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Shirt className="w-6 h-6 sm:w-8 sm:h-8 text-sky-600 flex-shrink-0" />
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 truncate">Oca Clothing</h1>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm sm:text-base flex-shrink-0 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Admin</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-sky-600 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600 text-base sm:text-lg">Manage your clothing inventory.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
          <div className="flex-1 w-full sm:min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              />
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-2 px-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors min-w-[150px] justify-between shadow-sm"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      selectedStatus === status ? 'bg-sky-600 text-white' : 'text-gray-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors min-w-[170px] justify-between shadow-sm"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      selectedCategory === category ? 'bg-sky-600 text-white' : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading items...</p>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No items found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {filteredItems.map((item) => (
              <ClothingCard
                key={item.id}
                item={item}
                onViewDetails={() => {}}
                showActions
                onEdit={setEditingItem}
                onDelete={handleDeleteItem}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>

      {showAddModal && (
        <ClothingFormModal
          item={null}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddItem}
        />
      )}

      {editingItem && (
        <ClothingFormModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSubmit={handleUpdateItem}
        />
      )}
    </div>
  );
}
