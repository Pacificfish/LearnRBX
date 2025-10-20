-- LearnRBX Database Schema
-- Run this in your Supabase SQL editor

-- Enable RLS
alter table auth.users enable row level security;

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
  is_premium boolean default false,
  created_at timestamptz default now()
);

-- Modules table
create table public.modules (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references public.tracks(id) on delete cascade,
  slug text not null,
  title text not null,
  index_in_track int not null,
  created_at timestamptz default now(),
  unique(track_id, slug)
);

-- Lessons table
create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text,
  mdx_path text not null,
  step_count int default 0,
  index_in_module int not null,
  duration_min int default 10,
  objectives text[],
  created_at timestamptz default now(),
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

-- Step states table
create table public.step_states (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  step_index int not null,
  passed boolean default false,
  updated_at timestamptz default now(),
  primary key (user_id, lesson_id, step_index)
);

-- Module assessments table
create table public.module_assessments (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id uuid not null references public.modules(id) on delete cascade,
  score int default 0,
  details jsonb,
  submitted_at timestamptz default now(),
  primary key (user_id, module_id)
);

-- Subscriptions table
create table public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text check (status in ('active','canceled','past_due')) default 'canceled',
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.tracks enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.progress enable row level security;
alter table public.step_states enable row level security;
alter table public.module_assessments enable row level security;
alter table public.subscriptions enable row level security;

-- RLS Policies

-- Profiles policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Tracks policies (public read)
create policy "Anyone can view tracks" on public.tracks
  for select using (true);

-- Modules policies (public read)
create policy "Anyone can view modules" on public.modules
  for select using (true);

-- Lessons policies (public read)
create policy "Anyone can view lessons" on public.lessons
  for select using (true);

-- Progress policies
create policy "Users can view own progress" on public.progress
  for select using (auth.uid() = user_id);

create policy "Users can update own progress" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Step states policies
create policy "Users can view own step states" on public.step_states
  for select using (auth.uid() = user_id);

create policy "Users can update own step states" on public.step_states
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Module assessments policies
create policy "Users can view own assessments" on public.module_assessments
  for select using (auth.uid() = user_id);

create policy "Users can update own assessments" on public.module_assessments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Subscriptions policies
create policy "Users can view own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Functions

-- Function to handle new user registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user registration
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to get lesson gate state
create or replace function public.get_lesson_gate_state(
  p_user_id uuid,
  p_lesson_id uuid
)
returns json as $$
declare
  lesson_record record;
  subscription_record record;
  previous_lesson_record record;
  progress_record record;
  result json;
begin
  -- Get lesson info with track and module details
  select l.*, m.track_id, t.is_premium
  into lesson_record
  from public.lessons l
  join public.modules m on l.module_id = m.id
  join public.tracks t on m.track_id = t.id
  where l.id = p_lesson_id;

  if not found then
    return json_build_object('canAccess', false, 'reason', 'Lesson not found');
  end if;

  -- Check if track is premium and user has active subscription
  if lesson_record.is_premium then
    select * into subscription_record
    from public.subscriptions
    where user_id = p_user_id and status = 'active';

    if not found then
      return json_build_object('canAccess', false, 'reason', 'Premium subscription required');
    end if;
  end if;

  -- Check if previous lesson is completed (if not first lesson in module)
  if lesson_record.index_in_module > 0 then
    select id into previous_lesson_record
    from public.lessons
    where module_id = lesson_record.module_id
    and index_in_module = lesson_record.index_in_module - 1;

    if found then
      select completed into progress_record
      from public.progress
      where user_id = p_user_id and lesson_id = previous_lesson_record.id;

      if not found or not progress_record.completed then
        return json_build_object('canAccess', false, 'reason', 'Complete previous lesson first');
      end if;
    end if;
  end if;

  return json_build_object('canAccess', true);
end;
$$ language plpgsql security definer;

-- Function to mark step as passed
create or replace function public.mark_step_passed(
  p_user_id uuid,
  p_lesson_id uuid,
  p_step_index int
)
returns boolean as $$
declare
  lesson_record record;
begin
  -- Mark step as passed
  insert into public.step_states (user_id, lesson_id, step_index, passed, updated_at)
  values (p_user_id, p_lesson_id, p_step_index, true, now())
  on conflict (user_id, lesson_id, step_index)
  do update set passed = true, updated_at = now();

  -- Check if this was the last step and mark lesson as completed
  select step_count into lesson_record
  from public.lessons
  where id = p_lesson_id;

  if lesson_record.step_count > 0 and p_step_index >= lesson_record.step_count - 1 then
    insert into public.progress (user_id, lesson_id, completed, updated_at)
    values (p_user_id, p_lesson_id, true, now())
    on conflict (user_id, lesson_id)
    do update set completed = true, updated_at = now();
  end if;

  return true;
end;
$$ language plpgsql security definer;
