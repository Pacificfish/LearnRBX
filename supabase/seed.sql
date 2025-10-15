-- Seed data for LearnRBX
-- Run this after running schema.sql

-- Insert tracks
INSERT INTO public.tracks (slug, title, description, is_premium) VALUES
  ('core-luau', 'Core Luau & Roblox Basics', 'Learn the fundamentals of Lua programming and basic Roblox concepts. Perfect for beginners!', false),
  ('gameplay-scripting', 'Gameplay Scripting', 'Build interactive game mechanics with parts, CFrames, and collectibles.', true),
  ('ui-scripting', 'UI Scripting', 'Create polished user interfaces with ScreenGuis and TweenService.', true);

-- Get track IDs for reference
DO $$
DECLARE
  track_core_id uuid;
  track_gameplay_id uuid;
  track_ui_id uuid;
  module_basics_id uuid;
  module_roblox_id uuid;
  module_parts_id uuid;
  module_ui_basics_id uuid;
BEGIN
  -- Get track IDs
  SELECT id INTO track_core_id FROM public.tracks WHERE slug = 'core-luau';
  SELECT id INTO track_gameplay_id FROM public.tracks WHERE slug = 'gameplay-scripting';
  SELECT id INTO track_ui_id FROM public.tracks WHERE slug = 'ui-scripting';

  -- Insert modules for Core Luau track
  INSERT INTO public.modules (track_id, title, index_in_track) VALUES
    (track_core_id, 'Language Basics', 1),
    (track_core_id, 'Roblox Concepts', 2);

  SELECT id INTO module_basics_id FROM public.modules WHERE track_id = track_core_id AND title = 'Language Basics';
  SELECT id INTO module_roblox_id FROM public.modules WHERE track_id = track_core_id AND title = 'Roblox Concepts';

  -- Insert lessons for Language Basics module
  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_basics_id, 'variables-and-printing', 'Variables & Printing', '/content/lessons/variables-and-printing.mdx', '/content/challenges/variables-and-printing.json', 1),
    (module_basics_id, 'tables-and-loops', 'Tables & Loops', '/content/lessons/tables-and-loops.mdx', '/content/challenges/tables-and-loops.json', 2),
    (module_basics_id, 'functions-and-scope', 'Functions & Scope', '/content/lessons/functions-and-scope.mdx', '/content/challenges/functions-and-scope.json', 3);

  -- Insert placeholder lessons for Roblox Concepts module
  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_roblox_id, 'explorer-and-instances', 'Explorer & Instances', '/content/lessons/explorer-and-instances.mdx', '/content/challenges/explorer-and-instances.json', 1),
    (module_roblox_id, 'events-touched-click', 'Events: Touched & Click', '/content/lessons/events-touched-click.mdx', '/content/challenges/events-touched-click.json', 2),
    (module_roblox_id, 'client-server-remotes', 'Client vs Server & RemoteEvents', '/content/lessons/client-server-remotes.mdx', '/content/challenges/client-server-remotes.json', 3);

  -- Insert modules for premium tracks
  INSERT INTO public.modules (track_id, title, index_in_track) VALUES
    (track_gameplay_id, 'Part Manipulation', 1),
    (track_gameplay_id, 'Game Mechanics', 2);

  SELECT id INTO module_parts_id FROM public.modules WHERE track_id = track_gameplay_id AND title = 'Part Manipulation';

  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_parts_id, 'cframe-basics', 'CFrame Basics', '/content/lessons/cframe-basics.mdx', '/content/challenges/cframe-basics.json', 1),
    (module_parts_id, 'color-and-material', 'Color & Material', '/content/lessons/color-and-material.mdx', '/content/challenges/color-and-material.json', 2);

  -- UI Scripting track
  INSERT INTO public.modules (track_id, title, index_in_track) VALUES
    (track_ui_id, 'UI Basics', 1);

  SELECT id INTO module_ui_basics_id FROM public.modules WHERE track_id = track_ui_id AND title = 'UI Basics';

  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_ui_basics_id, 'buttons-and-labels', 'Buttons & Labels', '/content/lessons/buttons-and-labels.mdx', '/content/challenges/buttons-and-labels.json', 1),
    (module_ui_basics_id, 'tweenservice-intro', 'TweenService Intro', '/content/lessons/tweenservice-intro.mdx', '/content/challenges/tweenservice-intro.json', 2);

END $$;

