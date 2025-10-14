# Setup Instructions

Complete step-by-step guide to get LearnRBX running locally.

## 1. Prerequisites

Ensure you have:
- **Node.js 18+** ([Download](https://nodejs.org/))
- **pnpm** (Install: `npm install -g pnpm`)
- **Supabase Account** ([Sign up](https://supabase.com))
- **Stripe Account** ([Sign up](https://stripe.com))

## 2. Clone and Install

```bash
cd LearnRBX
pnpm install
```

## 3. Supabase Setup

### Create Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details and wait for setup to complete

### Get API Keys

1. Go to Project Settings > API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Run Database Schema

1. Go to SQL Editor in Supabase Dashboard
2. Create a new query
3. Copy and paste contents of `supabase/schema.sql`
4. Click "Run"
5. Wait for success message

### Run Seed Data

1. Create another new query
2. Copy and paste contents of `supabase/seed.sql`
3. Click "Run"

### Verify Tables

Go to Table Editor and verify these tables exist:
- profiles
- tracks
- modules
- lessons
- progress
- subscriptions
- feature_requests

## 4. Stripe Setup

### Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Click "Developers" > "API keys"
3. Copy **Secret key** (starts with `sk_test_`) → `STRIPE_SECRET_KEY`

### Create Product & Price

1. Go to "Products" in Stripe Dashboard
2. Click "+ Add product"
3. Name: "LearnRBX Pro"
4. Add a price:
   - Recurring: Monthly
   - Price: $15.00 USD
5. Save and copy the **Price ID** (starts with `price_`) → `STRIPE_PRICE_ID_MONTHLY`

### Set Up Webhook (Development)

For local development, use Stripe CLI:

```bash
# Install Stripe CLI
# macOS: brew install stripe/stripe-cli/stripe
# Windows: Download from https://github.com/stripe/stripe-cli/releases

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret (starts with `whsec_`) → `STRIPE_WEBHOOK_SECRET`

Keep this terminal window open while developing!

## 5. Environment Variables

Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```env
# Supabase (from step 3)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Stripe (from step 4)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PRICE_ID_MONTHLY=price_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 6. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 7. Test the Application

### Test Authentication

1. Go to `/auth`
2. Sign up with an email
3. Check your email for confirmation link
4. Confirm and sign in

### Test Free Lessons

1. Go to `/learn`
2. Click on "Core Luau & Roblox Basics"
3. Open a lesson
4. Try writing code and running tests

### Test Premium Lock

1. Try to access "Gameplay Scripting" track
2. Should redirect to pricing page
3. Click "Upgrade to Pro"

### Test Stripe Checkout (Test Mode)

1. Click "Upgrade to Pro" on pricing page
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any CVC
5. Complete checkout
6. Should redirect back to `/learn`

### Verify Subscription Activated

1. Check terminal running `stripe listen`
2. Should see webhook events received
3. Go to dashboard - should show premium unlocked
4. Try accessing premium track - should work now!

## 8. Troubleshooting

### "Missing environment variable" error

- Double-check `.env.local` has all required variables
- Restart dev server after adding env vars

### Supabase RLS errors

- Verify you ran both `schema.sql` AND `seed.sql`
- Check RLS policies are enabled in Table Editor

### Stripe webhook not receiving events

- Make sure `stripe listen` is running
- Check the webhook secret matches in `.env.local`
- Verify URL is `http://localhost:3000/api/webhooks/stripe`

### Database connection errors

- Verify Supabase project URL and keys are correct
- Check if Supabase project is paused (free tier pauses after inactivity)

### Monaco Editor not loading

- Clear Next.js cache: `rm -rf .next && pnpm dev`
- Check browser console for errors

## Next Steps

- **Add more lessons**: See `README.md` for instructions
- **Customize styling**: Edit `app/globals.css` and component styles
- **Deploy to production**: See deployment section in `README.md`

## Production Setup

When deploying to production:

1. **Update environment variables** with production values
2. **Create production Stripe webhook**:
   - Go to Stripe Dashboard > Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select same events as development
   - Copy signing secret to production env vars
3. **Update `NEXT_PUBLIC_SITE_URL`** to your production domain
4. **Test subscription flow** end-to-end in production

## Support

If you encounter issues:

1. Check console logs in browser DevTools
2. Check terminal logs for API errors
3. Check Supabase logs in dashboard
4. Check Stripe logs in dashboard
5. Open a GitHub issue with error details

---

Happy coding! 🚀

