-- Add Pro subscription for testing
-- Run this in your Supabase SQL Editor

-- First, get the user ID for the email
DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get the user ID from auth.users
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = 'pacificfishdisc@gmail.com';
  
  IF target_user_id IS NOT NULL THEN
    -- Insert or update subscription record
    INSERT INTO public.subscriptions (user_id, status, current_period_end)
    VALUES (target_user_id, 'active', NOW() + INTERVAL '1 month')
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      status = 'active',
      current_period_end = NOW() + INTERVAL '1 month';
    
    RAISE NOTICE 'Pro subscription added for user: %', target_user_id;
  ELSE
    RAISE NOTICE 'User not found with email: pacificfishdisc@gmail.com';
  END IF;
END $$;
