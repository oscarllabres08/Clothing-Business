# 🚀 Deploy to Vercel - Complete Guide

Follow these steps to deploy your Fashion Boutique to Vercel!

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ Code pushed to GitHub (see Step 1 below if not done)
- ✅ Supabase project set up
- ✅ `.env` file with your credentials (for reference)

## Step 1: Push Code to GitHub (If Not Done)

### 1.1 Initialize Git (if needed)
```bash
git init
git add .
git commit -m "Fashion Boutique - Ready for deployment"
```

### 1.2 Create GitHub Repository
1. Go to [https://github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Name: `fashion-boutique` (or your choice)
4. Choose **Public** or **Private**
5. **DON'T** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### 1.3 Push Your Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/fashion-boutique.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 2: Deploy to Vercel

### 2.1 Sign Up / Login to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. **Important**: Sign in with your **GitHub account** (recommended)
   - This allows Vercel to access your repositories
   - Click **"Continue with GitHub"**

### 2.2 Import Your Project
1. After logging in, you'll see the Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. You'll see a list of your GitHub repositories
4. Find and click **"Import"** next to your `fashion-boutique` repository
   - If you don't see it, click **"Adjust GitHub App Permissions"** to grant access

### 2.3 Configure Project Settings
Vercel will auto-detect it's a Vite project. You should see:
- **Framework Preset**: Vite ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅

**Leave these as default** - they're correct!

### 2.4 Add Environment Variables (CRITICAL!)
1. Before clicking "Deploy", expand **"Environment Variables"**
2. Click **"Add"** to add each variable:

   **Variable 1:**
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: `https://momlryeeozkrgfexantl.supabase.co`
     (or your Supabase URL from `.env` file)
   - **Environment**: Check all three ✅
     - Production
     - Preview
     - Development

   **Variable 2:**
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vbWxyeWVlb3prcmdmZXhhbnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NjMyMjYsImV4cCI6MjA4MDIzOTIyNn0.ySjce4AWzggLCCsVGUxmU7rNVXCS5J9OweEt2OtH59w`
     (or your anon key from `.env` file)
   - **Environment**: Check all three ✅
     - Production
     - Preview
     - Development

3. Click **"Add"** after each variable

### 2.5 Deploy!
1. Click the big **"Deploy"** button
2. Wait 1-2 minutes for deployment
3. You'll see a progress bar and build logs
4. When complete, you'll see: **"Congratulations! Your project has been deployed."**

### 2.6 Get Your Live URL
After deployment, you'll see:
- **Production URL**: `https://fashion-boutique.vercel.app` (or similar)
- Click **"Visit"** to see your live site! 🎉

---

## Step 3: Verify Deployment

### 3.1 Test Your Live Site
1. Open the Vercel URL in your browser
2. You should see:
   - ✅ "FASHION BOUTIQUE" header
   - ✅ "Our Collection" page
   - ✅ No errors in the browser console

### 3.2 Test Admin Login
1. Click **"Admin Login"**
2. Enter your admin credentials (from Supabase)
3. You should be able to:
   - ✅ Log in successfully
   - ✅ See the Admin Dashboard
   - ✅ Add/edit/delete items

### 3.3 Test Adding an Item
1. In Admin Dashboard, click **"Add Item"**
2. Fill in the form and upload an image
3. Click **"Add Item"**
4. Verify the item appears in the inventory

---

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain
1. In Vercel project dashboard, go to **"Settings"** → **"Domains"**
2. Enter your domain (e.g., `yourstore.com`)
3. Follow Vercel's instructions to configure DNS
4. Wait for DNS propagation (can take up to 24 hours)

---

## 🔄 Updating Your Site

Every time you push to GitHub, Vercel automatically redeploys:

1. Make changes to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Vercel automatically:
   - Detects the push
   - Builds the new version
   - Deploys it
   - Updates your live site

You can see deployment status in the Vercel dashboard!

---

## 🛠️ Troubleshooting

### Issue: "Build Failed"
**Solution:**
- Check build logs in Vercel dashboard
- Common causes:
  - Missing environment variables
  - TypeScript errors
  - Missing dependencies

### Issue: "Failed to fetch" on live site
**Solution:**
- Verify environment variables are set correctly in Vercel
- Check they match your `.env` file values
- Make sure all three environments (Production, Preview, Development) are checked

### Issue: Can't see images
**Solution:**
- Verify Supabase storage bucket `clothing-images` exists
- Check storage policy allows public read access
- Verify image URLs are correct

### Issue: Can't log in
**Solution:**
- Verify admin user exists in Supabase Authentication
- Check email/password is correct
- Try creating a new user if needed

---

## 📊 Vercel Dashboard Features

### View Deployments
- See all deployment history
- View build logs
- Rollback to previous versions if needed

### Analytics
- View site traffic
- Monitor performance
- Check error rates

### Settings
- Update environment variables
- Configure domains
- Set up team members
- Configure build settings

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created (with GitHub)
- [ ] Project imported from GitHub
- [ ] Environment variables added:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Deployment successful
- [ ] Live site accessible
- [ ] Admin login works
- [ ] Can add items
- [ ] Images upload correctly

---

## 🎉 You're Live!

Your Fashion Boutique is now live on the internet! Share your Vercel URL with customers and start managing your inventory.

**Your site URL will look like:**
`https://fashion-boutique-xxxxx.vercel.app`

Or if you added a custom domain:
`https://yourstore.com`

---

## 💡 Pro Tips

1. **Automatic Deployments**: Every push to `main` branch auto-deploys
2. **Preview Deployments**: Pull requests get preview URLs automatically
3. **Environment Variables**: Update them anytime in Vercel settings
4. **Rollback**: If something breaks, you can rollback to previous version
5. **Analytics**: Enable Vercel Analytics to track visitors

---

## 🆘 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Check browser console for errors
4. Review the troubleshooting section above

Happy deploying! 🚀
