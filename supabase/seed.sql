-- Seed data for LearnRBX
-- Run this after running schema.sql

-- Insert tracks (with conflict handling)
INSERT INTO public.tracks (slug, title, description, is_premium) VALUES
  ('core-luau', 'Roblox Scripting Fundamentals', 'Master the basics of Roblox Studio scripting with Luau. Learn to create your first game scripts!', false),
  ('gameplay-scripting', 'Advanced Game Mechanics', 'Build interactive Roblox game features with parts, CFrames, and player interactions.', true),
  ('ui-scripting', 'Roblox UI Development', 'Create polished user interfaces for your Roblox games with ScreenGuis and animations.', true),
  ('networking-advanced', 'Networking & Advanced Systems', 'Master client-server communication, data persistence, and advanced Roblox systems for professional games.', true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_premium = EXCLUDED.is_premium;

-- Get track IDs for reference
DO $$
DECLARE
  track_core_id uuid;
  track_gameplay_id uuid;
  track_ui_id uuid;
  track_networking_id uuid;
  module_basics_id uuid;
  module_roblox_id uuid;
  module_advanced_id uuid;
  module_parts_id uuid;
  module_advanced_mechanics_id uuid;
  module_ui_basics_id uuid;
  module_networking_id uuid;
  module_data_security_id uuid;
BEGIN
  -- Get track IDs
  SELECT id INTO track_core_id FROM public.tracks WHERE slug = 'core-luau';
  SELECT id INTO track_gameplay_id FROM public.tracks WHERE slug = 'gameplay-scripting';
  SELECT id INTO track_ui_id FROM public.tracks WHERE slug = 'ui-scripting';
  SELECT id INTO track_networking_id FROM public.tracks WHERE slug = 'networking-advanced';

  -- Insert modules for Core Luau track
  INSERT INTO public.modules (track_id, title, index_in_track) VALUES
    (track_core_id, 'Luau Scripting Basics', 1),
    (track_core_id, 'Roblox Studio Fundamentals', 2),
    (track_core_id, 'Advanced Luau Concepts', 3)
  ON CONFLICT (track_id, index_in_track) DO UPDATE SET
    title = EXCLUDED.title;

  SELECT id INTO module_basics_id FROM public.modules WHERE track_id = track_core_id AND title = 'Luau Scripting Basics';
  SELECT id INTO module_roblox_id FROM public.modules WHERE track_id = track_core_id AND title = 'Roblox Studio Fundamentals';
  SELECT id INTO module_advanced_id FROM public.modules WHERE track_id = track_core_id AND title = 'Advanced Luau Concepts';

  -- Insert lessons for Luau Scripting Basics module
  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_basics_id, 'hello-world', 'Hello World - Your First Script', '/content/lessons/hello-world.mdx', '/content/challenges/hello-world.json', 1),
    (module_basics_id, 'data-types', 'Data Types in Luau', '/content/lessons/data-types.mdx', '/content/challenges/data-types.json', 2),
    (module_basics_id, 'basic-operators', 'Basic Operators & Math', '/content/lessons/basic-operators.mdx', '/content/challenges/basic-operators.json', 3),
    (module_basics_id, 'variables-and-printing', 'Variables & Roblox Output', '/content/lessons/variables-and-printing.mdx', '/content/challenges/variables-and-printing.json', 4),
    (module_basics_id, 'tables-and-loops', 'Tables & Loops for Game Data', '/content/lessons/tables-and-loops.mdx', '/content/challenges/tables-and-loops.json', 5),
    (module_basics_id, 'functions-and-scope', 'Functions for Game Logic', '/content/lessons/functions-and-scope.mdx', '/content/challenges/functions-and-scope.json', 6),
    (module_basics_id, 'conditionals-and-logic', 'Conditionals & Game Logic', '/content/lessons/conditionals-and-logic.mdx', '/content/challenges/conditionals-and-logic.json', 7),
    (module_basics_id, 'math-and-operators', 'Math & Operators in Roblox', '/content/lessons/math-and-operators.mdx', '/content/challenges/math-and-operators.json', 8),
    (module_basics_id, 'string-manipulation', 'String Manipulation & Text', '/content/lessons/string-manipulation.mdx', '/content/challenges/string-manipulation.json', 9)
  ON CONFLICT (module_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    mdx_path = EXCLUDED.mdx_path,
    challenge_json_path = EXCLUDED.challenge_json_path,
    index_in_module = EXCLUDED.index_in_module;

  -- Insert lessons for Roblox Studio Fundamentals module
  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_roblox_id, 'explorer-and-instances', 'Roblox Explorer & Instances', '/content/lessons/explorer-and-instances.mdx', '/content/challenges/explorer-and-instances.json', 1),
    (module_roblox_id, 'events-touched-click', 'Roblox Events: Touched & Clicked', '/content/lessons/events-touched-click.mdx', '/content/challenges/events-touched-click.json', 2),
    (module_roblox_id, 'client-server-remotes', 'Client vs Server Scripts & RemoteEvents', '/content/lessons/client-server-remotes.mdx', '/content/challenges/client-server-remotes.json', 3)
  ON CONFLICT (module_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    mdx_path = EXCLUDED.mdx_path,
    challenge_json_path = EXCLUDED.challenge_json_path,
    index_in_module = EXCLUDED.index_in_module;

  -- Insert lessons for Advanced Luau Concepts module
  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_advanced_id, 'error-handling-debugging', 'Error Handling & Debugging', '/content/lessons/error-handling-debugging.mdx', '/content/challenges/error-handling-debugging.json', 1),
    (module_advanced_id, 'advanced-data-structures', 'Advanced Data Structures', '/content/lessons/advanced-data-structures.mdx', '/content/challenges/advanced-data-structures.json', 2),
    (module_advanced_id, 'roblox-services-deep-dive', 'Roblox Services Deep Dive', '/content/lessons/roblox-services-deep-dive.mdx', '/content/challenges/roblox-services-deep-dive.json', 3),
    (module_advanced_id, 'advanced-events-and-signals', 'Advanced Events & Signals', '/content/lessons/advanced-events-and-signals.mdx', '/content/challenges/advanced-events-and-signals.json', 4),
    (module_advanced_id, 'memory-management-optimization', 'Memory Management & Optimization', '/content/lessons/memory-management-optimization.mdx', '/content/challenges/memory-management-optimization.json', 5)
  ON CONFLICT (module_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    mdx_path = EXCLUDED.mdx_path,
    challenge_json_path = EXCLUDED.challenge_json_path,
    index_in_module = EXCLUDED.index_in_module;

  -- Insert modules for premium tracks
  INSERT INTO public.modules (track_id, title, index_in_track) VALUES
    (track_gameplay_id, 'Roblox Part Manipulation', 1),
    (track_gameplay_id, 'Advanced Game Mechanics', 2)
  ON CONFLICT (track_id, index_in_track) DO UPDATE SET
    title = EXCLUDED.title;

  SELECT id INTO module_parts_id FROM public.modules WHERE track_id = track_gameplay_id AND title = 'Roblox Part Manipulation';
  SELECT id INTO module_advanced_mechanics_id FROM public.modules WHERE track_id = track_gameplay_id AND title = 'Advanced Game Mechanics';

  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_parts_id, 'cframe-basics', 'Roblox CFrame Positioning', '/content/lessons/cframe-basics.mdx', '/content/challenges/cframe-basics.json', 1),
    (module_parts_id, 'color-and-material', 'Roblox Part Colors & Materials', '/content/lessons/color-and-material.mdx', '/content/challenges/color-and-material.json', 2),
    (module_parts_id, 'advanced-cframes', 'Advanced CFrame Techniques', '/content/lessons/advanced-cframes.mdx', '/content/challenges/advanced-cframes.json', 3),
    (module_parts_id, 'physics-and-constraints', 'Physics & Constraints', '/content/lessons/physics-and-constraints.mdx', '/content/challenges/physics-and-constraints.json', 4),
    (module_parts_id, 'datastores-and-persistence', 'DataStores & Data Persistence', '/content/lessons/datastores-and-persistence.mdx', '/content/challenges/datastores-and-persistence.json', 5),
    (module_advanced_mechanics_id, 'ai-and-pathfinding', 'AI & Pathfinding Systems', '/content/lessons/ai-and-pathfinding.mdx', '/content/challenges/ai-and-pathfinding.json', 1),
    (module_advanced_mechanics_id, 'advanced-tweening-systems', 'Advanced Tweening Systems', '/content/lessons/advanced-tweening-systems.mdx', '/content/challenges/advanced-tweening-systems.json', 2),
    (module_advanced_mechanics_id, 'physics-simulation-advanced', 'Advanced Physics Simulation', '/content/lessons/physics-simulation-advanced.mdx', '/content/challenges/physics-simulation-advanced.json', 3)
  ON CONFLICT (module_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    mdx_path = EXCLUDED.mdx_path,
    challenge_json_path = EXCLUDED.challenge_json_path,
    index_in_module = EXCLUDED.index_in_module;

  -- UI Scripting track
  INSERT INTO public.modules (track_id, title, index_in_track) VALUES
    (track_ui_id, 'Roblox UI Basics', 1)
  ON CONFLICT (track_id, index_in_track) DO UPDATE SET
    title = EXCLUDED.title;

  SELECT id INTO module_ui_basics_id FROM public.modules WHERE track_id = track_ui_id AND title = 'Roblox UI Basics';

  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_ui_basics_id, 'buttons-and-labels', 'Roblox GUI Buttons & Labels', '/content/lessons/buttons-and-labels.mdx', '/content/challenges/buttons-and-labels.json', 1),
    (module_ui_basics_id, 'tweenservice-intro', 'Roblox TweenService Animations', '/content/lessons/tweenservice-intro.mdx', '/content/challenges/tweenservice-intro.json', 2),
    (module_ui_basics_id, 'advanced-gui-layout', 'Advanced GUI Layout & Design', '/content/lessons/advanced-gui-layout.mdx', '/content/challenges/advanced-gui-layout.json', 3),
    (module_ui_basics_id, 'gui-animations', 'GUI Animations & Effects', '/content/lessons/gui-animations.mdx', '/content/challenges/gui-animations.json', 4)
  ON CONFLICT (module_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    mdx_path = EXCLUDED.mdx_path,
    challenge_json_path = EXCLUDED.challenge_json_path,
    index_in_module = EXCLUDED.index_in_module;

  -- Networking & Advanced Systems track
  INSERT INTO public.modules (track_id, title, index_in_track) VALUES
    (track_networking_id, 'Client-Server Communication', 1),
    (track_networking_id, 'Data Management & Security', 2)
  ON CONFLICT (track_id, index_in_track) DO UPDATE SET
    title = EXCLUDED.title;

  SELECT id INTO module_networking_id FROM public.modules WHERE track_id = track_networking_id AND title = 'Client-Server Communication';
  SELECT id INTO module_data_security_id FROM public.modules WHERE track_id = track_networking_id AND title = 'Data Management & Security';

  INSERT INTO public.lessons (module_id, slug, title, mdx_path, challenge_json_path, index_in_module) VALUES
    (module_networking_id, 'client-server-remotes', 'Client vs Server Scripts & RemoteEvents', '/content/lessons/client-server-remotes.mdx', '/content/challenges/client-server-remotes.json', 1),
    (module_networking_id, 'datastores-and-persistence', 'DataStores & Data Persistence', '/content/lessons/datastores-and-persistence.mdx', '/content/challenges/datastores-and-persistence.json', 2),
    (module_networking_id, 'advanced-datastores-persistence', 'Advanced DataStores & Persistence', '/content/lessons/advanced-datastores-persistence.mdx', '/content/challenges/advanced-datastores-persistence.json', 3),
    (module_networking_id, 'networking-architecture-patterns', 'Networking Architecture & Patterns', '/content/lessons/networking-architecture-patterns.mdx', '/content/challenges/networking-architecture-patterns.json', 4),
    (module_networking_id, 'advanced-networking-systems', 'Advanced Networking & Replication', '/content/lessons/advanced-networking-systems.mdx', '/content/challenges/advanced-networking-systems.json', 5),
    (module_data_security_id, 'data-encryption-security', 'Data Encryption & Security', '/content/lessons/data-encryption-security.mdx', '/content/challenges/data-encryption-security.json', 1),
    (module_data_security_id, 'performance-optimization-advanced', 'Advanced Performance Optimization', '/content/lessons/performance-optimization-advanced.mdx', '/content/challenges/performance-optimization-advanced.json', 2),
    (module_advanced_mechanics_id, 'game-passes-developer-products', 'Game Passes & Developer Products', '/content/lessons/game-passes-developer-products.mdx', '/content/challenges/game-passes-developer-products.json', 8),
    (module_advanced_mechanics_id, 'advanced-character-systems', 'Advanced Character Systems', '/content/lessons/advanced-character-systems.mdx', '/content/challenges/advanced-character-systems.json', 9)
  ON CONFLICT (module_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    mdx_path = EXCLUDED.mdx_path,
    challenge_json_path = EXCLUDED.challenge_json_path,
    index_in_module = EXCLUDED.index_in_module;

END $$;

