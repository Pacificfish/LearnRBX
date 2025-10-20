export interface User {
  id: string;
  email: string;
  username?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username?: string;
  joined_at: string;
}

export interface Subscription {
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status: 'active' | 'canceled' | 'past_due';
  current_period_end?: string;
}
