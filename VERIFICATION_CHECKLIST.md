# ✅ Verification Checklist

Use this checklist to verify everything is set up correctly!

## 1. ✅ Supabase Database Table

**Check if `clothing_items` table exists:**
1. Go to Supabase Dashboard → **Table Editor**
2. You should see a table named `clothing_items`
3. Click on it - you should see columns:
   - id, brand, name, price, size, color, category, material, image_url, status, created_at, updated_at

**If table doesn't exist:**
- Go to **SQL Editor**
- Copy and run the SQL from `supabase/migrations/20251201001221_create_vehicles_table.sql`

---

## 2. ✅ Storage Bucket Setup

**Check storage bucket:**
1. Go to Supabase Dashboard → **Storage**
2. You should see a bucket named `clothing-images`
3. Click on it
4. Check the bucket settings:
   - ✅ Should be marked as **"Public bucket"**
   - ✅ Should have a policy named **"Public Read Access"**

**Verify the policy (based on your screenshot):**
- Policy name: `Public Read Access` ✅
- Allowed operation: `SELECT` ✅ (checked)
- Target roles: `public` ✅
- Policy definition should be:
  ```sql
  CREATE POLICY "Public Read Access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'clothing-images');
  ```
- Click **"Review"** → **"Save policy"** if you haven't already

**If bucket doesn't exist:**
- Create new bucket named `clothing-images`
- Check "Public bucket"
- Add the policy as shown above

---

## 3. ✅ Authentication Setup

**Check if admin user exists:**
1. Go to Supabase Dashboard → **Authentication** → **Users**
2. You should see at least one user (your admin account)
3. Note the email - you'll use this to log in

**Check authentication settings:**
1. Go to **Authentication** → **Settings**
2. Verify:
   - ✅ **Enable Email Signup** is ON
   - ✅ **Confirm email** can be OFF for testing (or ON for production)

**If no user exists:**
- Click **"Add user"** → **"Create new user"**
- Enter email and password
- Save these credentials!

---

## 4. ✅ Environment Variables

**Check `.env` file exists:**
1. In your project root folder, verify you have a `.env` file
2. Open it and check it contains:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Make sure:
   - ✅ No quotes around the values
   - ✅ No spaces before/after the `=` sign
   - ✅ Values are from your Supabase project (Settings → API)

**Get your credentials:**
- Supabase Dashboard → **Settings** → **API**
- Copy **Project URL** → paste as `VITE_SUPABASE_URL`
- Copy **anon public** key → paste as `VITE_SUPABASE_ANON_KEY`

---

## 5. ✅ Test Locally

**Run the app:**
```bash
npm install
npm run dev
```

**Check the browser:**
1. Open `http://localhost:5173`
2. You should see:
   - ✅ "FASHION BOUTIQUE" header
   - ✅ "Our Collection" heading
   - ✅ Empty state or items if you added any

**Test Admin Login:**
1. Click **"Admin Login"** button
2. Enter your admin email and password
3. You should:
   - ✅ Successfully log in
   - ✅ See "Admin Dashboard" page
   - ✅ See "Add Item" button

**If login fails:**
- Check email/password matches Supabase user
- Check browser console for errors (F12)
- Verify `.env` file has correct values

---

## 6. ✅ Test Adding an Item

**In Admin Dashboard:**
1. Click **"Add Item"** button
2. Fill in the form:
   - Brand: Select from dropdown (e.g., "Nike")
   - Category: Select (e.g., "Men")
   - Item Name: Enter text (e.g., "Classic T-Shirt")
   - Price: Enter number (e.g., 1500)
   - Size: Select (e.g., "M")
   - Color: Enter text (e.g., "Navy Blue")
   - Material: Select (e.g., "Cotton")
   - Upload an image file
3. Click **"Add Item"**
4. You should:
   - ✅ See the item appear in the grid
   - ✅ Be able to view it in the showroom

**If image upload fails:**
- Check storage bucket `clothing-images` exists
- Check storage policy is set correctly (see #2 above)
- Check browser console for errors

---

## 7. ✅ Test Public Showroom

**Log out (or open in incognito):**
1. Click **"Exit Admin"** (if logged in)
2. You should see the public showroom
3. Verify:
   - ✅ Can see items (if any added)
   - ✅ Can filter by category
   - ✅ Can filter by brand
   - ✅ Can search items
   - ✅ Can click "View Details" on items
   - ✅ Can click "Message" button (opens Messenger)

---

## 8. ✅ GitHub & Vercel (If Deploying)

**GitHub:**
- ✅ Code is pushed to GitHub
- ✅ `.env` file is NOT committed (should be in `.gitignore`)

**Vercel:**
- ✅ Project is connected to GitHub
- ✅ Environment variables are set in Vercel:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- ✅ Site is deployed and accessible

---

## 🚨 Common Issues & Fixes

### Issue: "Failed to fetch" error
**Fix:**
- Check `.env` file has correct Supabase URL and key
- Restart dev server after changing `.env`
- Clear browser cache

### Issue: Can't upload images
**Fix:**
- Verify storage bucket `clothing-images` exists
- Check bucket is set to "Public"
- Verify storage policy allows SELECT for public
- Check browser console for specific error

### Issue: Can't log in
**Fix:**
- Verify user exists in Supabase Authentication → Users
- Check email/password is correct
- Try creating a new user if needed

### Issue: Table doesn't exist
**Fix:**
- Go to Supabase SQL Editor
- Run the migration SQL again
- Check Table Editor to confirm table exists

### Issue: Items not showing
**Fix:**
- Check browser console for errors
- Verify database table has data
- Check RLS policies allow public read access

---

## ✅ All Checks Passed?

If everything above is checked ✅, you're ready to:
1. Add more clothing items
2. Share your site with customers
3. Start managing your inventory!

🎉 **Congratulations! Your Fashion Boutique is ready!**
