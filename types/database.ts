// Database types matching Supabase schema
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          joined_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          joined_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          joined_at?: string;
        };
      };
      tracks: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          is_premium: boolean;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          is_premium?: boolean;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          is_premium?: boolean;
        };
      };
      modules: {
        Row: {
          id: string;
          track_id: string;
          title: string;
          index_in_track: number;
        };
        Insert: {
          id?: string;
          track_id: string;
          title: string;
          index_in_track: number;
        };
        Update: {
          id?: string;
          track_id?: string;
          title?: string;
          index_in_track?: number;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          slug: string;
          title: string;
          mdx_path: string;
          challenge_json_path: string | null;
          index_in_module: number;
        };
        Insert: {
          id?: string;
          module_id: string;
          slug: string;
          title: string;
          mdx_path: string;
          challenge_json_path?: string | null;
          index_in_module: number;
        };
        Update: {
          id?: string;
          module_id?: string;
          slug?: string;
          title?: string;
          mdx_path?: string;
          challenge_json_path?: string | null;
          index_in_module?: number;
        };
      };
      progress: {
        Row: {
          user_id: string;
          lesson_id: string;
          completed: boolean;
          score: number;
          attempts: number;
          last_code: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          completed?: boolean;
          score?: number;
          attempts?: number;
          last_code?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          lesson_id?: string;
          completed?: boolean;
          score?: number;
          attempts?: number;
          last_code?: string | null;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          user_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          status: 'active' | 'canceled' | 'past_due';
          current_period_end: string | null;
        };
        Insert: {
          user_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: 'active' | 'canceled' | 'past_due';
          current_period_end?: string | null;
        };
        Update: {
          user_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: 'active' | 'canceled' | 'past_due';
          current_period_end?: string | null;
        };
      };
      feature_requests: {
        Row: {
          id: string;
          user_id: string | null;
          title: string;
          details: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          title: string;
          details?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          title?: string;
          details?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

// Application types
export interface Track {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  is_premium: boolean;
  modules?: Module[];
}

export interface Module {
  id: string;
  track_id: string;
  title: string;
  index_in_track: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  mdx_path: string;
  challenge_json_path: string | null;
  index_in_module: number;
}

export interface Progress {
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score: number;
  attempts: number;
  last_code: string | null;
  updated_at: string;
}

export interface Subscription {
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: 'active' | 'canceled' | 'past_due';
  current_period_end: string | null;
}

export interface Profile {
  id: string;
  username: string | null;
  joined_at: string;
}

// Challenge types
export type TestAssertionType =
  | 'identifier_exists'
  | 'function_exists'
  | 'literal_includes'
  | 'output_contains'
  | 'output_equals'
  | 'no_errors';

export interface ChallengeTest {
  id: string;
  type: 'static' | 'runtime';
  assert: TestAssertionType;
  value?: string | number;
  description?: string;
}

export interface Challenge {
  starterCode: string;
  tests: ChallengeTest[];
  hints: string[];
  successMessage: string;
}

export interface TestResult {
  id: string;
  passed: boolean;
  message: string;
}

