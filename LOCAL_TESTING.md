# Testing LearnRBX Locally

## Quick Start

1. **Clone or navigate to the project:**
   ```bash
   cd /Users/everett/Desktop/LearnRBX
   ```

2. **Create a `.env` file** (optional, for full features with Supabase):
   ```bash
   cp env.example .env
   ```
   
   Then edit `.env` and add your Supabase credentials if you have them.

3. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## Without Supabase

If you don't have Supabase credentials yet, the app will still run but:
- Authentication will show errors in console (but won't crash)
- Login/Signup won't work
- Progress tracking won't be saved to database
- You can still browse the UI and see lessons

The app is designed to degrade gracefully without Supabase credentials.

## With Supabase (Full Features)

1. **Create a Supabase project:**
   - Go to https://supabase.com
   - Create a new project
   - Get your project URL and anon key from Settings → API

2. **Run the database migration:**
   - Go to SQL Editor in Supabase
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run it

3. **Update your `.env` file:**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Restart the dev server:**
   ```bash
   npm run dev
   ```

Now you can:
- Sign up and log in
- Track progress
- Save your code as you learn

## Troubleshooting

### Port 5173 already in use
```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
PORT=3000 npm run dev
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### White screen in browser
1. Check browser console (F12) for errors
2. Make sure dev server is running
3. Try hard refresh (Cmd/Ctrl + Shift + R)

### Environment variables not loading
- Make sure `.env` is in the project root
- Variable names must start with `VITE_`
- Restart dev server after changing `.env`

## Next Steps

- Add more lessons in `src/data/courses.ts`
- Customize the UI in `src/index.css`
- Deploy to Railway (see DEPLOYMENT.md)

