# 📸 Multiple Images Feature - Implementation Guide

## ✅ What's New

Your clothing business now supports **up to 5 images per item**! Admins can upload multiple photos to showcase clothing items from different angles.

## 🗄️ Database Changes

### Migration Required

You need to run a database migration to update your Supabase table:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **"New query"**
3. Open the file: `supabase/migrations/20251201001222_add_multiple_images.sql`
4. Copy **ALL** the SQL code from that file
5. Paste it into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: "Success. No rows returned"

**What this migration does:**
- Adds a new `image_urls` column (text array)
- Migrates existing `image_url` data to the new array format
- Adds a constraint to limit to maximum 5 images
- Removes the old `image_url` column

## 🎨 New Features

### Admin Dashboard
- **Upload up to 5 images** when adding/editing items
- **Preview all images** before saving
- **Remove individual images** by clicking the trash icon
- **Visual indicator** showing how many images are uploaded (e.g., "3/5")

### Public Showroom
- **Card view**: Shows the first image with a "+X more" indicator if there are multiple images
- **Detail modal**: 
  - Image carousel with navigation arrows
  - Dot indicators showing which image you're viewing
  - Image counter (e.g., "2 / 5")
  - Click arrows or dots to navigate between images

## 📋 How to Use

### Adding an Item with Multiple Images

1. Click **"Add Item"** in Admin Dashboard
2. Fill in all the item details
3. In the **"Item Photos"** section:
   - Click **"Choose File"** and select one or more images (up to 5 total)
   - You can add images one at a time or select multiple at once
   - See previews of all selected images
   - Remove any image by hovering and clicking the trash icon
4. Click **"Add Item"** to save

### Editing an Item

1. Click **"Edit"** on any item
2. Existing images will be shown as previews
3. You can:
   - **Add more images** (if less than 5)
   - **Remove existing images** by clicking the trash icon
   - **Replace images** by removing old ones and adding new ones
4. Click **"Update Item"** to save

## 🔍 Technical Details

### Data Structure

**Before:**
```typescript
{
  image_url: string  // Single image URL
}
```

**After:**
```typescript
{
  image_urls: string[]  // Array of up to 5 image URLs
}
```

### Components Updated

1. **ClothingFormModal**: Multi-image upload with preview
2. **ClothingCard**: Shows first image + indicator for multiple
3. **ClothingModal**: Image carousel with navigation
4. **ClothingItem Interface**: Updated to use `image_urls` array

## ⚠️ Important Notes

1. **Migration is required** - Your existing data will be automatically migrated
2. **Maximum 5 images** - The database enforces this limit
3. **At least 1 image required** - You must upload at least one image per item
4. **Backward compatibility** - Existing items with single images will work fine

## 🚀 Deployment Steps

1. **Run the migration** in Supabase (see above)
2. **Test locally**: `npm run dev`
3. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "Add support for multiple images per item"
   git push
   ```
4. **Vercel will auto-deploy** - Your changes will be live automatically!

## 🐛 Troubleshooting

### Issue: "Failed to upload image"
- Make sure you have the INSERT policy for storage (see `STORAGE_UPLOAD_POLICY_FIX.md`)
- Check you're logged in as admin
- Verify storage bucket `clothing-images` exists

### Issue: Can't see images after migration
- Check browser console for errors
- Verify migration ran successfully
- Check that `image_urls` column exists in Supabase Table Editor

### Issue: Images not showing in carousel
- Make sure you have multiple images uploaded
- Check browser console for errors
- Verify image URLs are valid

## ✅ Checklist

- [ ] Migration SQL run in Supabase
- [ ] Tested adding item with multiple images
- [ ] Tested editing item and adding/removing images
- [ ] Verified carousel works in detail view
- [ ] Checked that existing items still display correctly
- [ ] Pushed changes to GitHub
- [ ] Verified deployment on Vercel

## 🎉 You're All Set!

Your clothing business now supports multiple images per item. Customers can see your products from different angles, making it easier to showcase your inventory!
