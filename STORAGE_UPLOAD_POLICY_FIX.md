# 🔧 Fix: Image Upload Failed - Storage Policy Missing

## The Problem
You're getting "Failed to upload image" because your Supabase storage bucket `clothing-images` only has a **SELECT** (read) policy, but it needs an **INSERT** (write) policy to allow uploads.

## ✅ Solution: Add INSERT Policy for Authenticated Users

### Step 1: Go to Storage Policies
1. Open your Supabase Dashboard
2. Go to **Storage** → **clothing-images** bucket
3. Click the **"Policies"** tab

### Step 2: Add INSERT Policy
1. Click **"New Policy"**
2. Select **"For full customization"**
3. Fill in:
   - **Policy name**: `Allow Authenticated Uploads`
   - **Allowed operation**: Check **INSERT** ✅ (and optionally **UPDATE** ✅)
   - **Target roles**: Select **authenticated** (not public)
   - **Policy definition**: Enter ONLY this:
     ```sql
     bucket_id = 'clothing-images'
     ```
   - ⚠️ **IMPORTANT**: Only enter the condition, NOT the full SQL statement!

4. Click **"Review"** → **"Save policy"**

### Step 3: Verify You're Logged In
Make sure you're logged in as admin before trying to upload images:
1. Click **"Admin Login"** in your app
2. Enter your admin credentials
3. Then try uploading an image again

## 🎯 What You Should Have

After adding the policy, you should have **TWO** policies:

1. **Public Read Access** (SELECT)
   - Operation: `SELECT`
   - Roles: `public`
   - Allows anyone to view images

2. **Allow Authenticated Uploads** (INSERT)
   - Operation: `INSERT` (and optionally `UPDATE`)
   - Roles: `authenticated`
   - Allows logged-in users to upload images

## 🔄 Alternative: Use SQL Editor

If the UI gives you trouble, create it directly via SQL:

1. Go to **SQL Editor** in Supabase
2. Click **"New query"**
3. Paste this EXACT code:
   ```sql
   CREATE POLICY "Allow Authenticated Uploads"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'clothing-images');
   ```

4. (Optional) Add UPDATE policy too:
   ```sql
   CREATE POLICY "Allow Authenticated Updates"
   ON storage.objects FOR UPDATE
   TO authenticated
   USING (bucket_id = 'clothing-images');
   ```

5. Click **"Run"**
6. Done! ✅

## ✅ Quick Checklist

- [ ] Storage bucket `clothing-images` exists
- [ ] Bucket is set to "Public bucket" ✅
- [ ] SELECT policy exists for public (read access)
- [ ] INSERT policy exists for authenticated (upload access)
- [ ] You're logged in as admin when trying to upload
- [ ] Try uploading an image again

## 🚨 Still Not Working?

1. **Check browser console** (F12) for the exact error message
2. **Verify you're logged in** - check if you see "Exit Admin" button
3. **Check Supabase logs** - Go to Supabase Dashboard → Logs → Storage
4. **Verify bucket name** - Make sure it's exactly `clothing-images` (case-sensitive)

## 💡 Why This Happens

Supabase Storage uses Row Level Security (RLS) policies. By default, storage buckets have no permissions. You need to explicitly allow:
- **SELECT** for public (so anyone can view images)
- **INSERT** for authenticated users (so logged-in admins can upload)

This is a security feature to prevent unauthorized uploads!
