# 🚨 Quick Fix: Image Upload Issue

## The Problem
You're getting "Failed to upload image" because your Supabase storage bucket needs an INSERT policy.

## ✅ Quick Fix (2 minutes)

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Navigate to Storage**
   - Click **Storage** in the left sidebar
   - Click on **`clothing-images`** bucket
   - Click the **"Policies"** tab

3. **Add INSERT Policy**
   - Click **"New Policy"** → **"For full customization"**
   - Fill in:
     - **Policy name**: `Allow Authenticated Uploads`
     - **Allowed operation**: Check **INSERT** ✅
     - **Target roles**: Select **authenticated**
     - **Policy definition**: Enter ONLY: `bucket_id = 'clothing-images'`
   - Click **"Review"** → **"Save policy"**

4. **Test It**
   - Go to your app (local or Vercel)
   - Log in as admin
   - Try uploading an image
   - It should work now! ✅

## 📋 What You Should Have

After adding the policy, you should have **TWO** policies:

1. **Public Read Access** (SELECT) - for viewing images
2. **Allow Authenticated Uploads** (INSERT) - for uploading images

That's it! Your image uploads should work now.
