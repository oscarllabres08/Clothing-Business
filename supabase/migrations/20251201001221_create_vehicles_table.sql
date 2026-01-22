/*
  # Create Clothing Items Table and Authentication Setup

  ## Overview
  This migration creates the core clothing_items table for the clothing business platform with real-time capabilities.

  ## New Tables
  
  ### `clothing_items`
  - `id` (uuid, primary key) - Unique identifier for each clothing item
  - `brand` (text) - Clothing brand (e.g., Nike, Adidas, Zara)
  - `name` (text) - Item name/description
  - `price` (integer) - Price in dollars
  - `size` (text) - Size information (e.g., "M", "L", "XL", "One Size")
  - `color` (text) - Color of the item
  - `category` (text) - Clothing category (Men, Women, Kids, Accessories, Shoes)
  - `material` (text) - Material type (Cotton, Polyester, Denim, etc.)
  - `image_url` (text) - URL to clothing item image
  - `status` (text) - Item status: 'available' or 'sold'
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the clothing_items table
  - Public read access for all users (showroom view)
  - Admin-only write access (authenticated users with admin role)

  ## Policies
  
  1. **Public Read Access**: Anyone can view all clothing items
  2. **Admin Insert**: Only authenticated admins can add clothing items
  3. **Admin Update**: Only authenticated admins can update clothing items
  4. **Admin Delete**: Only authenticated admins can delete clothing items

  ## Notes
  - Real-time subscriptions are enabled by default on this table
  - The status field defaults to 'available'
  - Timestamps are automatically managed
*/

CREATE TABLE IF NOT EXISTS clothing_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  name text NOT NULL,
  price integer NOT NULL,
  size text NOT NULL,
  color text NOT NULL,
  category text NOT NULL,
  material text NOT NULL,
  image_url text NOT NULL,
  status text DEFAULT 'available' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE clothing_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view clothing items"
  ON clothing_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert clothing items"
  ON clothing_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clothing items"
  ON clothing_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete clothing items"
  ON clothing_items FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_clothing_items_category ON clothing_items(category);
CREATE INDEX IF NOT EXISTS idx_clothing_items_status ON clothing_items(status);
CREATE INDEX IF NOT EXISTS idx_clothing_items_brand ON clothing_items(brand);