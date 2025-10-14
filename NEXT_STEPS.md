# 🎉 LearnRBX - Next Steps

Your LearnRBX application is ready! Follow these steps to get it running.

## ✅ Quick Start Checklist

### 1. Install Dependencies (5 min)

```bash
pnpm install
```

### 2. Set Up Supabase (10 min)

1. **Create a Supabase project**: Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Get your credentials**:
   - Project Settings > API
   - Copy Project URL and anon key
3. **Run database schema**:
   - Open SQL Editor in Supabase
   - Copy/paste contents of `supabase/schema.sql` → Run
   - Copy/paste contents of `supabase/seed.sql` → Run
4. **Verify**: Check Table Editor to see 7 tables created

### 3. Set Up Stripe (10 min)

1. **Create Stripe account**: [stripe.com](https://stripe.com)
2. **Get API keys**: Developers > API keys → Copy Secret key
3. **Create product**:
   - Products > Add product
   - Name: "LearnRBX Pro"
   - Price: $15/month recurring
   - Copy the Price ID
4. **Set up local webhooks**:
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Copy the webhook signing secret

### 4. Configure Environment (2 min)

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values from steps 2 & 3.

### 5. Start Development Server (1 min)

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) 🚀

## 🧪 Test Everything

### Authentication
- Go to `/auth`
- Sign up with email
- Confirm email
- Sign in ✅

### Free Lessons
- Go to `/learn`
- Open "Core Luau & Roblox Basics"
- Complete "Variables & Printing" lesson
- Run code and pass tests ✅

### Premium Lock
- Try to access "Gameplay Scripting"
- Should see paywall ✅

### Subscription Flow
- Click "Upgrade to Pro"
- Use test card: `4242 4242 4242 4242`
- Complete checkout
- Verify webhook received (check `stripe listen` terminal)
- Check dashboard - premium unlocked ✅

### Export Feature
- Open any lesson
- Click "Export to Roblox Studio"
- Download ZIP file ✅

## 📝 Customization Ideas

### Add More Lessons
See `README.md` section "Adding New Lessons"

### Change Branding
- Edit logo/colors in `app/globals.css`
- Update `Navbar.tsx` and `Footer.tsx`
- Replace "LearnRBX" throughout

### Modify Pricing
- Update price in Stripe Dashboard
- Update `app/pricing/page.tsx` UI
- Change `STRIPE_PRICE_ID_MONTHLY`

### Add Analytics
- Install PostHog or similar
- Add tracking to key events
- Monitor user behavior

## 🚀 Production Deployment

Ready to launch? See `README.md` deployment section.

**Quick Vercel Deploy:**

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Update Stripe webhook URL
5. Deploy! 🎉

## 📚 Helpful Resources

- **Full README**: `README.md`
- **Detailed Setup**: `SETUP.md`
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## 🐛 Common Issues

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
pnpm dev
```

**Environment variables not working?**
- Restart dev server after changing `.env.local`
- Make sure file is named exactly `.env.local`

**Supabase connection errors?**
- Check project URL and keys are correct
- Verify RLS policies are enabled

**Stripe webhook not receiving?**
- Keep `stripe listen` running in separate terminal
- Check webhook secret matches

## 💡 Pro Tips

1. **Keep Stripe CLI running** during development for webhooks
2. **Use Supabase Studio** (table editor) to inspect data
3. **Check browser console** for frontend errors
4. **Check terminal** for backend errors
5. **Use Stripe test cards** for testing payments

## 🎯 What's Next?

Your app is production-ready! Here's what you can do:

- ✅ Add more curriculum content
- ✅ Deploy to Vercel
- ✅ Set up custom domain
- ✅ Enable Stripe live mode
- ✅ Market to Roblox community
- ✅ Collect user feedback
- ✅ Iterate and improve!

---

**Questions?** Check `SETUP.md` for detailed troubleshooting.

**Ready to launch?** You've got this! 🚀

