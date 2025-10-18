-- Seed data for LearnRBX
-- Run this after running schema.sql

DO $$ 
BEGIN
    -- Clear all existing data
    DELETE FROM public.lessons;
    DELETE FROM public.modules;
    DELETE FROM public.tracks;
    
    -- No new data to insert - all lessons and modules have been removed
    
    -- Verify deletion (using PERFORM to discard results)
    PERFORM COUNT(*) FROM public.tracks;
    PERFORM COUNT(*) FROM public.modules;
    PERFORM COUNT(*) FROM public.lessons;
    
END $$;