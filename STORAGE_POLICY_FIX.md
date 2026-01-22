# 🔧 Fix: Storage Policy Error

## The Problem
You're getting a syntax error because Supabase UI automatically wraps your policy definition. You don't need to include `CREATE POLICY` - just the condition!

## ✅ Correct Way to Add Storage Policy

### Option 1: Use Simple Policy Builder (Easiest)

1. Go to **Storage** → **clothing-images** bucket
2. Click **"Policies"** tab
3. Click **"New Policy"**
4. Select **"For full customization"** (or use template)
5. Fill in:
   - **Policy name**: `Public Read Access`
   - **Allowed operation**: Check **SELECT** ✅
   - **Target roles**: Leave as default (public)
   - **Policy definition**: Enter ONLY this:
     ```sql
     bucket_id = 'clothing-images'
     ```
   - **DO NOT** include `CREATE POLICY`, `USING`, or any other SQL keywords!

6. Click **"Review"** → **"Save policy"**

### Option 2: Use SQL Editor (Alternative)

If the UI keeps giving errors, create it directly via SQL:

1. Go to **SQL Editor** in Supabase
2. Click **"New query"**
3. Paste this EXACT code:
   ```sql
   CREATE POLICY "Public Read Access"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'clothing-images');
   ```
4. Click **"Run"**
5. Done! ✅

## 🎯 What You Should See

After saving, in the **Policies** tab you should see:
- Policy name: `Public Read Access`
- Operation: `SELECT`
- Roles: `public`
- Definition: `bucket_id = 'clothing-images'`

## ✅ Quick Fix Steps

1. **Delete the broken policy** (if it was created):
   - Go to Policies tab
   - Find the broken policy
   - Click the three dots → Delete

2. **Create new policy** using Option 1 above
   - Policy definition should be ONLY: `bucket_id = 'clothing-images'`
   - No `CREATE POLICY`, no `USING`, no parentheses

3. **Save and verify** it works!
