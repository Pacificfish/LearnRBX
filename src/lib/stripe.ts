import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Check if Stripe is properly configured
const isStripeConfigured = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  return secretKey && 
         publishableKey && 
         !secretKey.includes('placeholder') && 
         !publishableKey.includes('placeholder') &&
         secretKey.startsWith('sk_') &&
         publishableKey.startsWith('pk_');
};

// Create Stripe instance only if properly configured
export const stripe = isStripeConfigured() 
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    })
  : null;

export const getStripe = () => {
  if (!isStripeConfigured()) {
    console.warn('Stripe not configured - using placeholder values');
    return null;
  }
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

export const isStripeEnabled = isStripeConfigured();
