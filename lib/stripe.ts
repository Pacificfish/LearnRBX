import Stripe from 'stripe';

// Use placeholders for now - will be replaced with real values later
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID_MONTHLY || 'price_placeholder';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export { STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET };

