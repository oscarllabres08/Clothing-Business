import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ClothingItem {
  id: string;
  brand: string;
  name: string;
  price: number;
  size: string;
  color: string;
  category: string;
  material: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}
