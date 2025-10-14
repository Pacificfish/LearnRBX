# LearnRBX

**Master Roblox scripting with hands-on lessons and real challenges.**

LearnRBX is a production-ready web application that teaches Roblox scripting (Luau) through interactive lessons and auto-graded challenges. Built with Next.js 14, Supabase, and Stripe.

![LearnRBX](https://via.placeholder.com/1200x600/3b82f6/ffffff?text=LearnRBX)

## Features

- 🎓 **Interactive Lessons**: Learn Lua/Luau with in-browser code editor (Monaco)
- ✅ **Auto-Graded Challenges**: Static AST analysis + runtime validation
- 📊 **Progress Tracking**: XP, streaks, badges, and completion tracking
- 💳 **Subscription-Based**: $15/month for premium tracks (Stripe integration)
- 📦 **Export to Roblox Studio**: Download starter packs as ZIP files
- 🔒 **Secure Authentication**: Powered by Supabase Auth + Row Level Security
- 🎨 **Modern UI**: Built with TailwindCSS and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Editor**: Monaco Editor with Lua syntax highlighting
- **Runtime**: Fengari (Lua VM in browser)
- **Static Analysis**: luaparse for AST validation
- **State**: Zustand
- **Auth & Database**: Supabase (PostgreSQL + Auth + RLS)
- **Payments**: Stripe Checkout + Webhooks
- **Content**: MDX for lessons, JSON for challenges
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**

```bash
cd LearnRBX
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID_MONTHLY=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Database Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the schema**

In your Supabase SQL Editor, run:
```sql
-- Run supabase/schema.sql first
-- Then run supabase/seed.sql
```

3. **Verify RLS policies are enabled**

Check that Row Level Security is active on all tables.

### Stripe Setup

1. **Create a product and price**

In your Stripe Dashboard:
- Create a product called "LearnRBX Pro"
- Create a recurring monthly price ($15/month)
- Copy the price ID to `STRIPE_PRICE_ID_MONTHLY`

2. **Set up webhook endpoint**

Add webhook endpoint: `https://your-domain.com/api/webhooks/stripe`

Listen to these events:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

3. **Test webhooks locally**

Install Stripe CLI:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
LearnRBX/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Navbar/Footer
│   ├── page.tsx                 # Landing page
│   ├── learn/                   # Learning tracks
│   │   ├── page.tsx            # Track list
│   │   └── [track]/[module]/[lesson]/page.tsx
│   ├── dashboard/               # User dashboard
│   ├── pricing/                 # Pricing page
│   ├── auth/                    # Auth page (sign in/up)
│   ├── admin/                   # Admin panel
│   └── api/                     # API routes
│       ├── checkout/            # Create Stripe session
│       ├── webhooks/stripe/     # Stripe webhooks
│       ├── progress/            # Save/load progress
│       └── export/[slug]/       # Export starter packs
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── CodeEditor.tsx           # Monaco editor wrapper
│   ├── ConsolePanel.tsx         # Output console
│   ├── TestRunnerPanel.tsx      # Test results
│   ├── Navbar.tsx               # Navigation
│   ├── Footer.tsx               # Footer
│   └── ...
├── lib/                         # Utilities & libraries
│   ├── supabase/               
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client
│   ├── stripe.ts               # Stripe config
│   ├── challengeEngine.ts      # Test runner (static + runtime)
│   ├── exporter.ts             # ZIP generation
│   └── utils.ts                # Helpers
├── content/                     # Lesson content
│   ├── lessons/                # MDX lesson files
│   └── challenges/             # JSON challenge configs
├── types/                       # TypeScript types
│   └── database.ts             # Supabase types
├── supabase/                    # Database
│   ├── schema.sql              # DB schema
│   └── seed.sql                # Seed data
└── ...
```

## Adding New Lessons

### 1. Create MDX Lesson

Create `content/lessons/your-lesson.mdx`:

```mdx
---
title: "Your Lesson Title"
slug: "your-lesson"
summary: "Brief description"
duration_min: 10
---

# Your Lesson Title

Lesson content in Markdown...
```

### 2. Create Challenge JSON

Create `content/challenges/your-lesson.json`:

```json
{
  "starterCode": "-- Your starter code here\n",
  "tests": [
    {
      "id": "test-1",
      "type": "static",
      "assert": "identifier_exists",
      "value": "variableName",
      "description": "Create a variable named 'variableName'"
    }
  ],
  "hints": ["Hint 1", "Hint 2"],
  "successMessage": "Great job!"
}
```

### 3. Add to Database

Insert into Supabase:

```sql
INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module)
VALUES (
  'your-module-id',
  'your-lesson',
  'Your Lesson Title',
  '/content/lessons/your-lesson.mdx',
  '/content/challenges/your-lesson.json',
  1
);
```

## Challenge Test Types

### Static Tests (AST Analysis)

- `identifier_exists`: Check if variable/function exists
- `function_exists`: Check if function is defined
- `literal_includes`: Check if specific literal value is used

### Runtime Tests (Execution)

- `output_contains`: Check console output contains text
- `output_equals`: Check exact console output
- `no_errors`: Code runs without syntax errors

## Deployment

### Deploy to Vercel

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com)
- Import your repository
- Add environment variables
- Deploy!

3. **Update Stripe webhook URL**

Update your Stripe webhook to point to: `https://your-domain.vercel.app/api/webhooks/stripe`

### Environment Variables on Vercel

Add all variables from `.env.local` to your Vercel project settings.

## Testing

### Run Unit Tests

```bash
pnpm test
```

### Run E2E Tests

```bash
pnpm test:e2e
```

## Development Tips

### Hot Reload Issues?

Clear Next.js cache:
```bash
rm -rf .next
pnpm dev
```

### Database Issues?

Check RLS policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'your_table';
```

### Stripe Webhook Not Working?

- Verify webhook secret in `.env.local`
- Check Stripe CLI is forwarding correctly
- Look for errors in Stripe Dashboard > Developers > Webhooks

## Roadmap

- [ ] Real Fengari Web Worker for true Lua execution
- [ ] More curriculum tracks (Advanced Scripting, DataStore, etc.)
- [ ] Social features (leaderboards, sharing progress)
- [ ] VS Code extension for authoring lessons
- [ ] Mobile responsiveness
- [ ] Dark mode

## Contributing

Contributions are welcome! Please open an issue or submit a PR.

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Open a GitHub issue
- Email: support@learnrbx.com

---

Built with ❤️ for the Roblox developer community

