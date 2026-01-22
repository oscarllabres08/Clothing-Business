import { X, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ClothingItem, supabase } from '../lib/supabase';

const CATEGORIES = ['Men', 'Women', 'Unisex'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const MATERIALS = ['Cotton', 'Polyester', 'Denim', 'Wool', 'Silk', 'Linen', 'Leather', 'Synthetic'];
const MAX_IMAGES = 5;

interface ImagePreview {
  file?: File;
  url: string;
  isExisting: boolean;
}

interface ClothingFormModalProps {
  item: ClothingItem | null;
  onClose: () => void;
  onSubmit: (data: Partial<ClothingItem>) => Promise<void>;
}

export function ClothingFormModal({ item, onClose, onSubmit }: ClothingFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Men',
    price: 0,
    size: 'M',
    color: '',
    material: 'Cotton'
  });
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price,
        size: item.size,
        color: item.color,
        material: item.material
      });
      // Load existing images
      const existingImages: ImagePreview[] = (item.image_urls || []).map(url => ({
        url,
        isExisting: true
      }));
      setImagePreviews(existingImages);
    } else {
      setImagePreviews([]);
    }
  }, [item]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - imagePreviews.length;
    
    if (files.length > remainingSlots) {
      alert(`You can only add ${remainingSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`);
      return;
    }

    const newPreviews: ImagePreview[] = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false
    }));

    setImagePreviews([...imagePreviews, ...newPreviews]);
    e.target.value = ''; // Reset input
  };

  const removeImage = (index: number) => {
    const preview = imagePreviews[index];
    if (!preview.isExisting && preview.file) {
      URL.revokeObjectURL(preview.url);
    }
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imagePreviews.length === 0) {
      alert('Please add at least one image.');
      return;
    }

    setLoading(true);

    try {
      const imageUrls: string[] = [];

      // Upload new images first
      for (const preview of imagePreviews) {
        if (preview.isExisting) {
          // Keep existing image URL
          imageUrls.push(preview.url);
        } else if (preview.file) {
          // Upload new image
          const fileExt = preview.file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
          const filePath = `clothing/${fileName}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('clothing-images')
            .upload(filePath, preview.file);

          if (uploadError) {
            alert(`Failed to upload image: ${preview.file.name}. Please try again.`);
            console.error('Image upload error:', uploadError);
            setLoading(false);
            return;
          }

          const { data: publicUrlData } = supabase.storage
            .from('clothing-images')
            .getPublicUrl(filePath);

          imageUrls.push(publicUrlData.publicUrl);
        }
      }

      await onSubmit({
        ...formData,
        brand: '', // Brand field removed from form, set to empty string
        image_urls: imageUrls
      });

      // Clean up object URLs
      imagePreviews.forEach(preview => {
        if (!preview.isExisting) {
          URL.revokeObjectURL(preview.url);
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save item. Please try again.');
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
          <div className="mb-4">
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

          <div className="grid grid-cols-2 gap-4 mb-4">
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
            <label className="block text-gray-300 mb-2 font-medium">
              Item Photos ({imagePreviews.length}/{MAX_IMAGES})
            </label>
            
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {imagePreviews.length < MAX_IMAGES && (
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700"
              />
            )}

            <p className="mt-2 text-xs text-gray-400">
              {imagePreviews.length === 0 
                ? 'Upload up to 5 clear photos of the clothing item. On mobile, you can choose from your gallery or take new pictures.'
                : `You can add ${MAX_IMAGES - imagePreviews.length} more image(s).`
              }
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
