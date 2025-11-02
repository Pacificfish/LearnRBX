# Deploying LearnRBX to GitHub and Railway

## Step 1: Create GitHub Repository

You need to create a GitHub repository first. You can do this in two ways:

### Option A: Using GitHub Website

1. Go to https://github.com/new
2. Repository name: `LearnRBX` (or your preferred name)
3. Description: "Interactive learning platform for Roblox scripting with Lua"
4. Make it **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create LearnRBX --public --source=. --remote=origin --push
```

## Step 2: Push to GitHub

Run these commands in your terminal:

```bash
cd /Users/everett/Desktop/LearnRBX

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/LearnRBX.git

# Push to GitHub
git push -u origin main
```

If you used GitHub CLI (Option B), it's already pushed!

## Step 3: Set up Supabase

Before deploying to Railway, you need a Supabase project:

1. Go to https://supabase.com and create an account/login
2. Click "New Project"
3. Fill in:
   - **Name**: LearnRBX
   - **Database Password**: (save this!)
   - **Region**: Closest to you
4. Wait for project to be created (~2 minutes)

### Get Your Credentials

1. In Supabase dashboard: **Settings** → **API**
2. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**

### Set up Database

1. Go to **SQL Editor** in Supabase
2. Click "New query"
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and click "Run" (Cmd/Ctrl + Enter)
5. Should see "Success. No rows returned"

## Step 4: Deploy to Railway

### 4.1 Create Railway Account

1. Go to https://railway.app
2. Sign up/login with GitHub
3. Allow Railway to access your repositories

### 4.2 Create New Project

1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `LearnRBX` repository
4. Railway will auto-detect it's a Node.js project

### 4.3 Configure Environment Variables

1. Click on your project in Railway
2. Go to the **Variables** tab
3. Add these variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual Supabase values from Step 3.

4. Railway will automatically redeploy when you add variables

### 4.4 (Optional) Custom Domain

1. Go to **Settings** → **Domains**
2. Click "Generate Domain" for a random Railway domain
3. Or add a custom domain if you have one

## Step 5: Verify Deployment

1. Wait for Railway to finish building (2-5 minutes)
2. Click "View Logs" to see build progress
3. Once deployed, click the generated URL
4. Your app should load!

### Test the App

1. Click "Sign Up" and create an account
2. Check Supabase:
   - **Authentication** → **Users**: Should see your user
   - **Table Editor** → **profiles**: Should see your profile
3. Complete a lesson
4. Check **Table Editor** → **lesson_progress**: Should see your progress

## Troubleshooting

### Build Fails in Railway

- Check Railway logs for errors
- Ensure all environment variables are set
- Verify `package.json` has correct build scripts

### Database Errors

- Double-check you ran the SQL migration in Supabase
- Verify environment variables in Railway match Supabase
- Check RLS policies are enabled in Supabase

### Authentication Not Working

- Verify Supabase credentials in Railway variables
- Check Supabase logs in dashboard
- Ensure email auth is enabled in Supabase

### Progress Not Saving

- Check browser console for errors
- Verify user is authenticated
- Check Supabase database for data

## Next Steps

- Set up custom domain
- Add more courses/lessons
- Configure email templates in Supabase
- Add analytics
- Set up backups

## Useful Links

- Railway Dashboard: https://railway.app/dashboard
- Supabase Dashboard: https://app.supabase.com
- Your Deployed App: (Check Railway domain)

## Environment Variables Reference

For local development, create a `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

For Railway, add these in the dashboard under Variables.

