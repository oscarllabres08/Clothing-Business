# 🚀 Next Steps - Action Plan

Follow these steps in order to get your Fashion Boutique up and running!

## Step 1: Set Up Supabase (15 minutes)

### 1.1 Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: Fashion Boutique (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

### 1.2 Get Your API Keys
1. In your Supabase project dashboard, click **Settings** (gear icon)
2. Click **API** in the left sidebar
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 1.3 Create Database Table
1. In Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Open the file: `supabase/migrations/20251201001221_create_vehicles_table.sql`
4. Copy **ALL** the SQL code from that file
5. Paste it into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: "Success. No rows returned"

### 1.4 Create Storage Bucket for Images
1. In Supabase dashboard, click **Storage** in the left sidebar
2. Click **"Create a new bucket"**
3. Name it: `clothing-images`
4. Check **"Public bucket"** ✅
5. Click **"Create bucket"**
6. Click on the bucket name
7. Go to **"Policies"** tab
8. Click **"New Policy"** → **"For full customization"**
9. Fill in:
   - **Policy name**: `Public Read Access`
   - **Allowed operation**: Check **SELECT** ✅
   - **Target roles**: Leave as default (public)
   - **Policy definition**: Enter ONLY this (no CREATE POLICY, no USING keyword):
     ```sql
     bucket_id = 'clothing-images'
     ```
   - ⚠️ **IMPORTANT**: Only enter the condition, NOT the full SQL statement!
10. Click **"Review"** → **"Save policy"**

### 1.5 Set Up Authentication
1. In Supabase dashboard, click **Authentication** in the left sidebar
2. Click **"Settings"**
3. Make sure **"Enable Email Signup"** is ON ✅
4. Scroll down and click **"Users"** tab
5. Click **"Add user"** → **"Create new user"**
6. Enter:
   - **Email**: admin@yourstore.com (use your email)
   - **Password**: Create a strong password (save it!)
7. Click **"Create user"**
8. **IMPORTANT**: Copy this email and password - you'll use it to log in as admin!

## Step 2: Set Up Environment Variables (2 minutes)

1. In your project folder, create a file named `.env` (no extension)
2. Copy the contents from `.env.example`
3. Replace the values with your actual Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Save the file

⚠️ **Important**: Never commit `.env` to GitHub! It's already in `.gitignore`

## Step 3: Test Locally (5 minutes)

1. Open terminal in your project folder
2. Run:
   ```bash
   npm install
   ```
3. Then run:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`
5. You should see the Fashion Boutique showroom!
6. Click **"Admin Login"** and test with your admin credentials

## Step 4: Push to GitHub (10 minutes)

### 4.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Fashion Boutique - Clothing business app"
```

### 4.2 Create GitHub Repository
1. Go to [https://github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Name: `fashion-boutique` (or your choice)
4. Make it **Public** or **Private** (your choice)
5. **DON'T** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### 4.3 Push Your Code
Copy the commands GitHub shows you, or use:
```bash
git remote add origin https://github.com/YOUR_USERNAME/fashion-boutique.git
git branch -M main
git push -u origin main
```

## Step 5: Deploy to Vercel (5 minutes)

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up/Login with your **GitHub account**
3. Click **"Add New..."** → **"Project"**
4. Find and select your `fashion-boutique` repository
5. Click **"Import"**
6. **Configure Environment Variables**:
   - Click **"Environment Variables"**
   - Add:
     - Name: `VITE_SUPABASE_URL`
     - Value: (paste your Supabase URL)
   - Add:
     - Name: `VITE_SUPABASE_ANON_KEY`
     - Value: (paste your Supabase anon key)
7. Click **"Deploy"**
8. Wait 1-2 minutes for deployment
9. 🎉 Your site is live! Click the URL to see it

## Step 6: Add Your First Clothing Item

1. Go to your live site
2. Click **"Admin Login"**
3. Log in with your admin email/password
4. Click **"Add Item"**
5. Fill in the form:
   - Brand: e.g., "Nike"
   - Name: e.g., "Classic T-Shirt"
   - Price: e.g., 1500
   - Size: Select from dropdown
   - Color: e.g., "Navy Blue"
   - Category: Select from dropdown
   - Material: Select from dropdown
   - Upload an image
6. Click **"Add Item"**
7. You should see it appear in the inventory!

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database table created (ran migration SQL)
- [ ] Storage bucket `clothing-images` created and set to public
- [ ] Admin user created in Authentication
- [ ] `.env` file created with Supabase credentials
- [ ] Tested locally (`npm run dev`)
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables added in Vercel
- [ ] Successfully logged in as admin
- [ ] Added first clothing item

## 🆘 Troubleshooting

**Problem**: "Failed to fetch" error
- **Solution**: Check your `.env` file has correct Supabase URL and key

**Problem**: Can't upload images
- **Solution**: Make sure storage bucket `clothing-images` exists and is public

**Problem**: Can't log in as admin
- **Solution**: Verify user exists in Supabase Authentication → Users

**Problem**: Table doesn't exist
- **Solution**: Run the migration SQL again in Supabase SQL Editor

## 🎯 You're Done!

Your Fashion Boutique is now live! Share the Vercel URL with customers and start adding inventory!
