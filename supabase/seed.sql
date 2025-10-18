-- Clear all lessons, modules, and tracks from the database
DELETE FROM public.lessons;
DELETE FROM public.modules;
DELETE FROM public.tracks;

-- Verify deletion
SELECT 'Tracks' as table_name, COUNT(*) as count FROM public.tracks
UNION ALL
SELECT 'Modules' as table_name, COUNT(*) as count FROM public.modules
UNION ALL
SELECT 'Lessons' as table_name, COUNT(*) as count FROM public.lessons;