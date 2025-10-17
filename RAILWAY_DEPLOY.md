# Deploy LearnRBX to Railway

This guide will help you deploy your LearnRBX application to Railway.

## Step 1: Create Railway Account

1. **Go to**: https://railway.app
2. **Sign up** with your GitHub account
3. **Verify your email** if prompted

## Step 2: Create New Project

1. **Click "New Project"**
2. **Select "Deploy from GitHub repo"**
3. **Choose your repository**: `Pacificfish/LearnRBX`
4. **Click "Deploy Now"**

Railway will automatically:
- Detect it's a Next.js app
- Install dependencies with `pnpm`
- Build the application
- Deploy it

## Step 3: Configure Environment Variables

In your Railway project dashboard:

1. **Go to "Variables" tab**
2. **Add these environment variables**:

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://your-app.railway.app

# Optional - Stripe (will use placeholders if not set)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_PRICE_ID_MONTHLY=price_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# Optional - OpenAI (for AI chatbot feature)
# OPENAI_API_KEY=sk-...
```

**Important**: 
- Replace `NEXT_PUBLIC_SITE_URL` with your actual Railway app URL after deployment
- Stripe variables are optional - the app will work with placeholders for now
- OpenAI API key is optional - the AI chatbot will show a "not configured" message if not set

## Step 4: Get Your App URL

1. **Go to "Settings" tab**
2. **Copy your domain** (something like `https://learnrbx-production-xxxx.up.railway.app`)
3. **Update `NEXT_PUBLIC_SITE_URL`** in Variables with this URL

## Step 5: Update Stripe Webhook

1. **Go to Stripe Dashboard** > Webhooks
2. **Add new endpoint**: `https://your-app.railway.app/api/webhooks/stripe`
3. **Select events**:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. **Copy webhook secret** to Railway Variables

## Step 6: Test Your Deployment

1. **Visit your Railway app URL**
2. **Test the features**:
   - Sign up/Sign in
   - Complete a lesson
   - Try premium checkout (use test card: `4242 4242 4242 4242`)

## Railway vs Vercel

### Railway Advantages:
- ✅ Better for full-stack apps
- ✅ Built-in PostgreSQL (if you want to migrate from Supabase)
- ✅ More flexible deployment
- ✅ Better for persistent storage

### Vercel Advantages:
- ✅ Optimized for Next.js
- ✅ Better edge functions
- ✅ Faster static deployments
- ✅ Better CDN

## Custom Domain (Optional)

1. **Go to Railway Settings** > Domains
2. **Add custom domain**
3. **Update DNS records** as instructed
4. **Update `NEXT_PUBLIC_SITE_URL`** in Variables

## Monitoring

Railway provides:
- **Logs**: View real-time application logs
- **Metrics**: CPU, memory, and network usage
- **Deployments**: Track deployment history

## Troubleshooting

### Build Fails:
- Check logs in Railway dashboard
- Ensure all environment variables are set
- Verify `package.json` has correct scripts

### App Won't Start:
- Check `NEXT_PUBLIC_SITE_URL` is correct
- Verify Supabase and Stripe credentials
- Check logs for specific errors

### Stripe Webhooks Not Working:
- Verify webhook URL is correct
- Check webhook secret matches
- Ensure all required events are selected

## Cost

Railway pricing:
- **Free tier**: $5 credit monthly
- **Pro**: $20/month for unlimited usage
- **Team**: $20/user/month

For LearnRBX, the free tier should be sufficient for development and small-scale usage.

## Next Steps

After successful deployment:

1. **Test all features** thoroughly
2. **Set up monitoring** and alerts
3. **Configure custom domain** (optional)
4. **Set up CI/CD** for automatic deployments
5. **Monitor usage** and upgrade plan if needed

---

Your LearnRBX app should now be live on Railway! 🚀
