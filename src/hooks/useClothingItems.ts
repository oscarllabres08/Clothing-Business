import { useEffect, useState } from 'react';
import { supabase, ClothingItem } from '../lib/supabase';

export function useClothingItems() {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClothingItems();

    const channel = supabase
      .channel('clothing-items-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'clothing_items' },
        () => {
          fetchClothingItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchClothingItems = async () => {
    try {
      const { data, error } = await supabase
        .from('clothing_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClothingItems(data || []);
    } catch (error) {
      console.error('Error fetching clothing items:', error);
    } finally {
      setLoading(false);
    }
  };

  return { clothingItems, loading, refetch: fetchClothingItems };
}
