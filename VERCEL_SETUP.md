# Vercel Build & Deployment Guide

## ✅ Build Status
Your local build passes with **0 errors**. The Vercel build errors are likely due to **missing environment variables**.

## 🔧 Fix Vercel Build Errors

### Step 1: Check Vercel Project Settings
1. Go to your Vercel dashboard
2. Select your **drishtikon-website** project
3. Go to **Settings → Environment Variables**

### Step 2: Add Required Environment Variables

For the site to work **without payment** (recommended for now), add:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

For **payment features** (optional for now):
```
STRIPE_SECRET_KEY=sk_test_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
```

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the latest failed deployment
3. Click **Redeploy** button

---

## 📊 Vercel Analytics

The Analytics component is now integrated! It will automatically:
- ✅ Track page views
- ✅ Track user interactions
- ✅ Monitor Web Vitals
- ✅ Show data in Vercel Dashboard (Analytics tab)

**No additional setup needed!**

---

## Common Vercel Build Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot find module` | Missing dependency | `npm install [package]` |
| `Environment variable undefined` | Missing env vars | Add to Vercel Settings |
| `Build failed: Unexpected token` | TypeScript error | Check `tsconfig.json` |
| `Port already in use` | Local conflict | Restart Vercel deployment |
| `Error: ENOENT: no such file` | Missing file | Check file paths in code |

---

## Step-by-Step: Getting Supabase Credentials

### 1. Go to Supabase
- https://app.supabase.com

### 2. Select Your Project
- Click on your project name

### 3. Go to Settings
- Bottom left → Settings

### 4. Get API Keys
- Project Settings → API
- Copy:
  - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 5. Add to Vercel
- Vercel Dashboard → Project Settings → Environment Variables
- Paste all three values

---

## Vercel Deployment Checklist

- ✅ Repository connected to Vercel
- ⬜ Environment variables added
- ⬜ Supabase configured
- ⬜ Deployment successful
- ⬜ Website accessible at vercel domain

---

## Test Your Deployment

After redeploying:
1. Check your Vercel domain: `https://drishtikon-xxxxx.vercel.app`
2. Page should load without errors
3. Check Vercel Analytics tab for traffic
4. Test player and tracklist functionality

---

## Need More Help?

If you still see errors on Vercel:
1. Go to Deployments tab
2. Click on failed deployment
3. Click "View Build Log"
4. Paste the error here and I'll help fix it!

---

## Summary

✅ **Analytics**: Integrated and ready  
✅ **Build**: Passes locally with 0 errors  
⏳ **Vercel**: Just needs environment variables  

Once you add the env vars to Vercel Settings and redeploy, it will work! 🚀
