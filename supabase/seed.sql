-- LearnRBX Codecademy-Style Curriculum Seed Data
-- This file populates the database with interactive, hands-on lessons

-- Clear existing data
DELETE FROM public.lessons;
DELETE FROM public.modules;
DELETE FROM public.tracks;

-- Insert tracks
INSERT INTO public.tracks (slug, title, description, is_premium) VALUES
('lua-fundamentals', 'Lua Fundamentals', 'Master the basics of Lua programming used in Roblox', false),
('roblox-basics', 'Roblox Basics', 'Learn the fundamentals of Roblox development', true),
('game-mechanics', 'Game Mechanics', 'Build core game systems and mechanics', true),
('advanced-topics', 'Advanced Topics', 'Master advanced Roblox development techniques', true);

-- Insert modules for Lua Fundamentals track
INSERT INTO public.modules (track_id, title, index_in_track) VALUES
((SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals'), 'Getting Started', 0),
((SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals'), 'Control Flow', 1);

-- Insert modules for Roblox Basics track
INSERT INTO public.modules (track_id, title, index_in_track) VALUES
((SELECT id FROM public.tracks WHERE slug = 'roblox-basics'), 'Roblox Studio', 0);

-- Insert modules for Game Mechanics track
INSERT INTO public.modules (track_id, title, index_in_track) VALUES
((SELECT id FROM public.tracks WHERE slug = 'game-mechanics'), 'Player Systems', 0);

-- Insert modules for Advanced Topics track
INSERT INTO public.modules (track_id, title, index_in_track) VALUES
((SELECT id FROM public.tracks WHERE slug = 'advanced-topics'), 'Networking', 0);

-- Insert lessons for Lua Fundamentals - Getting Started module
INSERT INTO public.lessons (module_id, slug, title, index_in_module, mdx_path, challenge_json_path) VALUES
((SELECT id FROM public.modules WHERE title = 'Getting Started' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals')), 'welcome-to-lua', 'Welcome to Lua!', 0, '/content/lessons/welcome-to-lua.mdx', '/content/challenges/welcome-to-lua.json'),
((SELECT id FROM public.modules WHERE title = 'Getting Started' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals')), 'variables-and-data', 'Variables and Data Types', 1, '/content/lessons/variables-and-data.mdx', '/content/challenges/variables-and-data.json'),
((SELECT id FROM public.modules WHERE title = 'Getting Started' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals')), 'strings-and-concatenation', 'Strings and Concatenation', 2, '/content/lessons/strings-and-concatenation.mdx', '/content/challenges/strings-and-concatenation.json'),
((SELECT id FROM public.modules WHERE title = 'Getting Started' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals')), 'numbers-and-math', 'Numbers and Math Operations', 3, '/content/lessons/numbers-and-math.mdx', '/content/challenges/numbers-and-math.json');

-- Insert lessons for Lua Fundamentals - Control Flow module
INSERT INTO public.lessons (module_id, slug, title, index_in_module, mdx_path, challenge_json_path) VALUES
((SELECT id FROM public.modules WHERE title = 'Control Flow' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals')), 'if-statements', 'Making Decisions with If Statements', 0, '/content/lessons/if-statements.mdx', '/content/challenges/if-statements.json'),
((SELECT id FROM public.modules WHERE title = 'Control Flow' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals')), 'loops-basics', 'Repeating Code with Loops', 1, '/content/lessons/loops-basics.mdx', '/content/challenges/loops-basics.json'),
((SELECT id FROM public.modules WHERE title = 'Control Flow' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'lua-fundamentals')), 'functions-basics', 'Creating Reusable Code with Functions', 2, '/content/lessons/functions-basics.mdx', '/content/challenges/functions-basics.json');

-- Insert lessons for Roblox Basics - Roblox Studio module
INSERT INTO public.lessons (module_id, slug, title, index_in_module, mdx_path, challenge_json_path) VALUES
((SELECT id FROM public.modules WHERE title = 'Roblox Studio' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'roblox-basics')), 'studio-introduction', 'Welcome to Roblox Studio', 0, '/content/lessons/studio-introduction.mdx', '/content/challenges/studio-introduction.json'),
((SELECT id FROM public.modules WHERE title = 'Roblox Studio' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'roblox-basics')), 'parts-and-properties', 'Working with Parts', 1, '/content/lessons/parts-and-properties.mdx', '/content/challenges/parts-and-properties.json'),
((SELECT id FROM public.modules WHERE title = 'Roblox Studio' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'roblox-basics')), 'events-introduction', 'Making Things Interactive', 2, '/content/lessons/events-introduction.mdx', '/content/challenges/events-introduction.json');

-- Insert lessons for Game Mechanics - Player Systems module
INSERT INTO public.lessons (module_id, slug, title, index_in_module, mdx_path, challenge_json_path) VALUES
((SELECT id FROM public.modules WHERE title = 'Player Systems' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'game-mechanics')), 'player-data', 'Managing Player Data', 0, '/content/lessons/player-data.mdx', '/content/challenges/player-data.json'),
((SELECT id FROM public.modules WHERE title = 'Player Systems' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'game-mechanics')), 'leaderboards', 'Creating Leaderboards', 1, '/content/lessons/leaderboards.mdx', '/content/challenges/leaderboards.json');

-- Insert lessons for Advanced Topics - Networking module
INSERT INTO public.lessons (module_id, slug, title, index_in_module, mdx_path, challenge_json_path) VALUES
((SELECT id FROM public.modules WHERE title = 'Networking' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'advanced-topics')), 'remote-events', 'Client-Server Communication', 0, '/content/lessons/remote-events.mdx', '/content/challenges/remote-events.json'),
((SELECT id FROM public.modules WHERE title = 'Networking' AND track_id = (SELECT id FROM public.tracks WHERE slug = 'advanced-topics')), 'data-stores', 'Saving Player Data', 1, '/content/lessons/data-stores.mdx', '/content/challenges/data-stores.json');

-- Verify the data was inserted correctly
SELECT 'Tracks' as table_name, COUNT(*) as count FROM public.tracks
UNION ALL
SELECT 'Modules' as table_name, COUNT(*) as count FROM public.modules
UNION ALL
SELECT 'Lessons' as table_name, COUNT(*) as count FROM public.lessons;