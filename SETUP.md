# Setup Guide for LearnRBX with Supabase and Railway

This guide will help you set up LearnRBX with Supabase for the backend and Railway for deployment.

## Prerequisites

- A GitHub account (for Railway deployment)
- A Supabase account (free tier works)
- Node.js 18+ installed locally

## Step 1: Set up Supabase

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: LearnRBX (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to you
4. Click "Create new project" and wait for it to initialize (2-3 minutes)

### 1.2 Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (the `anon` key under Project API keys)

### 1.3 Set up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

This creates:
- `profiles` table for user profiles
- `lesson_progress` table for tracking user progress
- Row Level Security (RLS) policies
- Triggers for auto-creating profiles on signup

### 1.4 Configure Authentication

1. Go to **Authentication** → **Settings** in Supabase dashboard
2. Under "Auth Providers", make sure "Email" is enabled
3. Optional: Configure email templates if you want custom emails

## Step 2: Set up Local Development

### 2.1 Install Dependencies

```bash
npm install
```

### 2.2 Configure Environment Variables

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

2. Open `.env` and add your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 1.2.

### 2.3 Run the Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Step 3: Deploy to Railway

### 3.1 Prepare for Deployment

1. Make sure your code is pushed to a GitHub repository
2. Ensure `.env` is in `.gitignore` (it should be by default)

### 3.2 Create Railway Account and Project

1. Go to [railway.app](https://railway.app) and sign up/login with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your LearnRBX repository
4. Railway will automatically detect it's a Node.js project

### 3.3 Configure Environment Variables in Railway

1. In your Railway project, go to **Variables** tab
2. Add the following environment variables:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
   - `PORT` = 3000 (optional, Railway will provide this)

3. Railway will automatically redeploy when you add variables

### 3.4 Configure Build Settings (if needed)

Railway should auto-detect the build, but if needed:
- **Build Command**: `npm run build`
- **Start Command**: `npx serve -s dist -l $PORT`

### 3.5 Deploy

1. Railway will automatically deploy on push to your main branch
2. Or manually trigger a deploy from the Railway dashboard
3. Once deployed, Railway will give you a URL like `your-app.railway.app`

### 3.6 (Optional) Custom Domain

1. In Railway project, go to **Settings** → **Domains**
2. Click "Generate Domain" or "Custom Domain"
3. Follow instructions to configure DNS if using custom domain

## Step 4: Verify Everything Works

1. Visit your deployed Railway URL
2. Click "Sign Up" and create a test account
3. Check your Supabase dashboard:
   - **Authentication** → **Users**: Should see your new user
   - **Table Editor** → **profiles**: Should see your profile
4. Complete a lesson and mark it complete
5. Check **Table Editor** → **lesson_progress**: Should see your progress

## Troubleshooting

### Database Errors

- Make sure you ran the migration SQL in Supabase
- Check that RLS policies are enabled
- Verify your user has permissions in Supabase

### Authentication Issues

- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Verify email provider is enabled in Supabase
- Check browser console for errors

### Railway Deployment Issues

- Make sure all environment variables are set
- Check Railway logs in the dashboard
- Verify build command completes successfully
- Ensure `dist` folder is created after build

### Progress Not Saving

- Check browser console for errors
- Verify user is authenticated
- Check Supabase logs in dashboard
- Ensure RLS policies allow user operations

## Next Steps

- Customize email templates in Supabase
- Add more courses/lessons in `src/data/courses.ts`
- Set up custom domain
- Add analytics tracking
- Configure backup strategy in Supabase

## Support

If you encounter issues:
1. Check Railway deployment logs
2. Check Supabase logs in dashboard
3. Check browser console for frontend errors
4. Review the main README.md for general setup

