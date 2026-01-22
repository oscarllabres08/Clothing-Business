import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ClothingItem, supabase } from '../lib/supabase';

const BRANDS = ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Forever 21', 'Gap', 'Levi\'s', 'Puma', 'Under Armour'];
const CATEGORIES = ['Men', 'Women', 'Kids', 'Accessories', 'Shoes'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const MATERIALS = ['Cotton', 'Polyester', 'Denim', 'Wool', 'Silk', 'Linen', 'Leather', 'Synthetic'];

interface ClothingFormModalProps {
  item: ClothingItem | null;
  onClose: () => void;
  onSubmit: (data: Partial<ClothingItem>) => Promise<void>;
}

export function ClothingFormModal({ item, onClose, onSubmit }: ClothingFormModalProps) {
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    price: 0,
    size: 'M',
    color: '',
    category: 'Men',
    material: 'Cotton',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({
        brand: item.brand,
        name: item.name,
        price: item.price,
        size: item.size,
        color: item.color,
        category: item.category,
        material: item.material,
        image_url: item.image_url
      });
      setImagePreview(item.image_url);
    } else {
      setImagePreview(null);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrlToUse = formData.image_url;

      // If a new image file was selected, upload it to Supabase Storage
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const filePath = `clothing/${fileName}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('clothing-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          // eslint-disable-next-line no-alert
          alert('Failed to upload image. Please try again.');
          console.error('Image upload error:', uploadError);
          setLoading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('clothing-images')
          .getPublicUrl(filePath);

        imageUrlToUse = publicUrlData.publicUrl;
      }

      await onSubmit({
        ...formData,
        image_url: imageUrlToUse
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-2xl max-w-3xl w-full my-8">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {item ? 'Edit Clothing Item' : 'Add New Clothing Item'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          <p className="text-gray-400 mt-1">
            {item ? 'Update the clothing item details below.' : 'Enter the details for the new clothing item.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Brand</label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              >
                <option value="">Select Brand</option>
                {BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="e.g. Classic T-Shirt"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Price (₱)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Size</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              >
                {SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">Color</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="e.g. Navy Blue"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">Material</label>
            <select
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            >
              {MATERIALS.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Item Photo</label>
            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="Clothing item preview"
                  className="w-full max-h-56 object-cover rounded-lg border border-slate-700"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                if (file) {
                  const previewUrl = URL.createObjectURL(file);
                  setImagePreview(previewUrl);
                }
              }}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700"
              required={!item}
            />
            <p className="mt-2 text-xs text-gray-400">
              Upload a clear photo of the clothing item. On mobile, you can choose from your gallery or take a new picture.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? 'Saving...' : item ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
}
