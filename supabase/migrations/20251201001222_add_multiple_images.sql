/*
  # Add Multiple Images Support
  
  This migration updates the clothing_items table to support multiple images (up to 5) per item.
  
  Changes:
  - Rename `image_url` to `image_urls` (text array)
  - Add constraint to limit array to maximum 5 images
*/

-- Add new column for image URLs array
ALTER TABLE clothing_items 
ADD COLUMN image_urls text[] DEFAULT ARRAY[]::text[];

-- Migrate existing data: convert single image_url to array
UPDATE clothing_items 
SET image_urls = CASE 
  WHEN image_url IS NOT NULL AND image_url != '' THEN ARRAY[image_url]
  ELSE ARRAY[]::text[]
END
WHERE image_urls IS NULL;

-- Make image_urls NOT NULL (but allow empty array)
ALTER TABLE clothing_items 
ALTER COLUMN image_urls SET NOT NULL,
ALTER COLUMN image_urls SET DEFAULT ARRAY[]::text[];

-- Add constraint to limit to 5 images maximum
-- array_length returns NULL for empty arrays, so we check for that too
ALTER TABLE clothing_items 
ADD CONSTRAINT check_max_images CHECK (
  array_length(image_urls, 1) IS NULL OR 
  array_length(image_urls, 1) <= 5
);

-- Drop the old image_url column (after migration)
ALTER TABLE clothing_items 
DROP COLUMN image_url;
