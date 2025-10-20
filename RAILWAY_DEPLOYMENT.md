# Railway Deployment Guide for LearnRBX

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Push your code to GitHub
3. **Stripe Account**: For payment processing
4. **Domain (Optional)**: For custom domain setup

## Step 1: Deploy to Railway

### Option A: Deploy from GitHub (Recommended)

1. **Connect GitHub to Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "Login" and connect your GitHub account
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your LearnRBX repository

2. **Railway will automatically**:
   - Detect it's a Next.js project
   - Install dependencies
   - Build the application
   - Deploy it

### Option B: Deploy with Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

## Step 2: Set Up PostgreSQL Database

1. **Add PostgreSQL Service**:
   - In your Railway project dashboard
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will create a PostgreSQL instance

2. **Get Database Connection Details**:
   - Click on your PostgreSQL service
   - Go to "Connect" tab
   - Copy the connection details

## Step 3: Configure Environment Variables

In your Railway project dashboard, go to "Variables" and add:

### Database Configuration
```env
DATABASE_URL=postgresql://username:password@host:port/database
```

### Supabase Configuration (Alternative to direct PostgreSQL)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Stripe Configuration
```env
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID_MONTHLY=price_your_monthly_price_id
```

### Site Configuration
```env
NEXT_PUBLIC_SITE_URL=https://your-app-name.railway.app
```

## Step 4: Set Up Database Schema

### Option A: Using Railway PostgreSQL + Supabase

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Use the Railway PostgreSQL connection string

2. **Run Database Schema**:
   ```bash
   # Copy the SQL from supabase-schema.sql
   # Paste it into Supabase SQL Editor and run
   ```

### Option B: Direct PostgreSQL

1. **Connect to Railway PostgreSQL**:
   ```bash
   # Use the connection string from Railway
   psql "postgresql://username:password@host:port/database"
   ```

2. **Run the schema**:
   ```sql
   -- Copy and paste contents of supabase-schema.sql
   ```

## Step 5: Seed the Database

1. **Generate Content**:
   ```bash
   # Run locally or in Railway console
   npm run seed
   ```

2. **Index Content to Database**:
   ```bash
   npm run index
   ```

## Step 6: Configure Stripe Webhooks

1. **Get Railway URL**:
   - Your app will be available at: `https://your-app-name.railway.app`

2. **Set up Stripe Webhook**:
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-app-name.railway.app/api/webhooks/stripe`
   - Select events: `customer.subscription.*`, `invoice.payment_*`

## Step 7: Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Railway project → Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

2. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

## Step 8: Monitor and Scale

1. **Monitor Performance**:
   - Use Railway's built-in metrics
   - Set up alerts for errors

2. **Scale as Needed**:
   - Railway auto-scales based on traffic
   - Upgrade plan for higher limits

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Railway build logs
   - Ensure all dependencies are in package.json

2. **Database Connection Issues**:
   - Verify DATABASE_URL is correct
   - Check if database is accessible

3. **Environment Variables**:
   - Ensure all required variables are set
   - Check for typos in variable names

### Useful Commands

```bash
# View logs
railway logs

# Connect to database
railway connect

# Run commands in Railway environment
railway run npm run seed
```

## Cost Estimation

- **Railway Hobby Plan**: $5/month (includes database)
- **Stripe**: 2.9% + 30¢ per transaction
- **Domain**: ~$10-15/year (optional)

## Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **Database**: Use Railway's built-in security
3. **Stripe**: Use webhook signatures for verification
4. **HTTPS**: Railway provides SSL certificates automatically

## Next Steps

1. Set up monitoring and alerts
2. Configure backup strategies
3. Set up CI/CD for automatic deployments
4. Consider adding analytics (PostHog, Google Analytics)
5. Set up error tracking (Sentry)

Your LearnRBX application should now be live on Railway! 🚀
