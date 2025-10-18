-- LearnRBX Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  joined_at timestamptz default now()
);

-- Tracks table
create table public.tracks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  is_premium boolean default false
);

-- Modules table
create table public.modules (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references public.tracks(id) on delete cascade,
  title text not null,
  index_in_track int not null,
  unique(track_id, index_in_track)
);

-- Lessons table
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text not null,
  title text not null,
  mdx_path text not null,
  challenge_json_path text,
  index_in_module int not null,
  unique(module_id, slug)
);

-- Progress table
create table public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed boolean default false,
  score int default 0,
  attempts int default 0,
  last_code text,
  updated_at timestamptz default now(),
  primary key (user_id, lesson_id)
);

-- Subscriptions table
create table public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text check (status in ('active','canceled','past_due')) default 'canceled',
  current_period_end timestamptz
);

-- Feature requests table (optional)
create table public.feature_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  details text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.tracks enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.progress enable row level security;
alter table public.subscriptions enable row level security;
alter table public.feature_requests enable row level security;

-- RLS Policies

-- Profiles: users can only see their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Tracks: everyone can read tracks
create policy "Tracks are publicly readable"
  on public.tracks for select
  using (true);

-- Modules: everyone can read modules
create policy "Modules are publicly readable"
  on public.modules for select
  using (true);

-- Lessons: everyone can read lessons
create policy "Lessons are publicly readable"
  on public.lessons for select
  using (true);

-- Progress: users can only see/modify their own progress
create policy "Users can view own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.progress for update
  using (auth.uid() = user_id);

-- Subscriptions: users can only see their own subscription
create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Feature requests: authenticated users can insert
create policy "Authenticated users can create feature requests"
  on public.feature_requests for insert
  with check (auth.uid() = user_id);

create policy "Users can view own feature requests"
  on public.feature_requests for select
  using (auth.uid() = user_id);

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Chat sessions table
create table public.chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Chat messages table
create table public.chat_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references public.chat_sessions(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Legacy chatbot conversations table (keeping for backward compatibility)
create table public.chatbot_conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  user_message text not null,
  ai_response text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for all tables
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chatbot_conversations enable row level security;

-- RLS policies for chat sessions
create policy "Users can view their own chat sessions" on public.chat_sessions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own chat sessions" on public.chat_sessions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own chat sessions" on public.chat_sessions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own chat sessions" on public.chat_sessions
  for delete using (auth.uid() = user_id);

-- RLS policies for chat messages
create policy "Users can view messages from their sessions" on public.chat_messages
  for select using (
    session_id in (
      select id from public.chat_sessions where user_id = auth.uid()
    )
  );

create policy "Users can insert messages to their sessions" on public.chat_messages
  for insert with check (
    session_id in (
      select id from public.chat_sessions where user_id = auth.uid()
    )
  );

create policy "Users can update messages in their sessions" on public.chat_messages
  for update using (
    session_id in (
      select id from public.chat_sessions where user_id = auth.uid()
    )
  );

create policy "Users can delete messages from their sessions" on public.chat_messages
  for delete using (
    session_id in (
      select id from public.chat_sessions where user_id = auth.uid()
    )
  );

-- RLS policies for legacy chatbot conversations
create policy "Users can view their own chatbot conversations" on public.chatbot_conversations
  for select using (auth.uid() = user_id);

create policy "Users can insert their own chatbot conversations" on public.chatbot_conversations
  for insert with check (auth.uid() = user_id);

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger update_chat_sessions_updated_at
  before update on public.chat_sessions
  for each row execute function update_updated_at_column();

