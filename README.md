# LearnRBX - Codecademy-Style Roblox Learning Platform

LearnRBX is a comprehensive, interactive learning platform for Roblox scripting that follows the proven Codecademy learning model. Master Lua and Roblox development through step-by-step lessons, mandatory checkpoints, and real project building.

## 🚀 Features

- **Codecademy-Style Learning Flow**: Step-based lessons with mandatory checkpoints
- **Interactive Code Editor**: Monaco editor with Lua syntax highlighting and real-time execution
- **Sandboxed Execution**: Fengari Lua runtime with security restrictions
- **Progress Tracking**: Detailed progress tracking with XP, streaks, and completion percentages
- **Premium Content**: Subscription-based premium tracks with Stripe integration
- **Real Projects**: Build actual Roblox games and systems
- **Responsive Design**: Desktop-first design optimized for coding

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL with RLS)
- **Payments**: Stripe Subscriptions
- **Editor**: Monaco Editor
- **Lua Runtime**: Fengari (WebWorker)
- **Static Analysis**: luaparse

## 📚 Curriculum

### Free Track: Core Lua
- Variables & Data Types
- Control Structures (if/else, loops)
- Functions & Scope
- Tables & Advanced Data Structures

### Premium Tracks:
1. **Roblox Studio Fundamentals**
   - Instances & Explorer
   - Services & Events
   - Parts & Properties
   - LocalScripts vs Scripts

2. **Advanced Roblox Scripting**
   - Remote Events & Functions
   - Player Management
   - Gameplay Systems
   - UI & Effects

3. **Capstone Projects**
   - Coin Collector Game
   - Obby Platformer
   - Tycoon System
   - Combat Arena

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Supabase account
- Stripe account

### 1. Clone and Install

```bash
git clone <repository-url>
cd LearnRBX
npm install
```

### 2. Environment Setup

Copy the example environment file:
```bash
cp env.example .env.local
```

Fill in your environment variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema in your Supabase SQL editor:
   ```bash
   cat supabase-schema.sql
   ```
   Copy and paste this into your Supabase SQL editor and run it.

### 4. Generate Content

Generate lesson content from the curriculum manifest:
```bash
npm run seed
```

This creates:
- `/content/lessons/` - Lesson overview MDX files
- `/content/steps/` - Step JSON files with code tasks and quizzes
- `/content/module-tests/` - Module assessment files

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 📁 Project Structure

```
LearnRBX/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── learn/             # Learning interface
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   └── lesson/            # Lesson-specific components
│   ├── lib/                   # Utilities and configurations
│   │   ├── challenge-engine.ts # Lua execution engine
│   │   ├── progress.ts        # Progress tracking
│   │   ├── stripe.ts          # Stripe configuration
│   │   └── supabase.ts        # Supabase client
│   ├── store/                 # Zustand state management
│   └── types/                 # TypeScript type definitions
├── curriculum/                # Curriculum definition and seeding
│   ├── learnrbx.codecademy.yml # Main curriculum manifest
│   ├── seed.codecademy.ts     # Content generator
│   └── templates.codecademy.ts # Content templates
├── content/                   # Generated content files
│   ├── lessons/              # Lesson overview MDX files
│   ├── steps/                # Step JSON files
│   └── module-tests/         # Module assessment JSON files
└── supabase-schema.sql       # Database schema
```

## 🎯 Learning Flow

### Step Types
1. **Read Steps**: Instructional content with MDX
2. **Code Tasks**: Interactive coding with tests and hints
3. **Quiz Steps**: Multiple choice questions
4. **Project Tasks**: Larger coding projects (optional)

### Progression System
- **Checkpoints**: Required code tasks that must pass all tests
- **Gating**: Cannot proceed until previous checkpoint passes
- **Lesson Completion**: All required steps must be completed
- **Module Tests**: Optional assessments that don't block progression

### Premium Access
- Free users can access Core Lua track
- Premium subscription ($15/month) unlocks all tracks
- Stripe handles subscription management
- RLS policies enforce access control

## 🔧 Development

### Adding New Content

1. Edit `/curriculum/learnrbx.codecademy.yml`
2. Run `npm run seed` to generate files
3. Content is automatically available in the app

### Testing

```bash
npm run lint        # ESLint
npm run build       # TypeScript compilation
npm run dev         # Development server
```

### Database Management

The app uses Supabase with Row Level Security (RLS) for data protection:
- User progress is isolated per user
- Premium content is gated by subscription status
- All operations are secured with RLS policies

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Stripe Webhooks

Configure webhook endpoint in Stripe dashboard:
- URL: `https://yourdomain.com/api/webhooks/stripe`
- Events: `customer.subscription.*`, `invoice.payment_*`

## 📊 Analytics & Monitoring

- User progress tracking
- Lesson completion rates
- Subscription metrics
- Error monitoring (recommend Sentry)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Documentation: [Add your docs URL]
- Issues: GitHub Issues
- Community: [Add your community link]

---

Built with ❤️ for the Roblox developer community. Start your journey to mastering Roblox scripting today!
