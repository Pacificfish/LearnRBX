import { createClient } from "@supabase/supabase-js";

type Row = {
  track_slug: string; 
  track_title: string; 
  is_premium: boolean;
  module_title: string; 
  module_index: number;
  lesson_slug: string; 
  lesson_title: string; 
  lesson_index: number;
  mdx_path: string; 
  challenge_json_path: string;
  module_test_path?: string;
};

export async function syncToSupabase(index: Row[]) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.log("⚠️ Supabase environment variables not set. Skipping database sync.");
    return;
  }

  const supabase = createClient(url, key);

  try {
    // Upsert tracks
    const tracks = Array.from(
      new Map(
        index.map(r => [r.track_slug, { 
          slug: r.track_slug, 
          title: r.track_title,
          description: r.track_title + " - LearnRBX Curriculum",
          is_premium: r.is_premium
        }])
      ).values()
    );
    
    console.log("📝 Upserting tracks...");
    for (const track of tracks) {
      const { error } = await supabase
        .from("tracks")
        .upsert({ 
          slug: track.slug, 
          title: track.title,
          description: track.description,
          is_premium: track.is_premium
        }, { onConflict: "slug" });
      
      if (error) {
        console.error("Error upserting track:", track.slug, error);
      }
    }

    // Upsert modules & lessons
    console.log("📝 Upserting modules and lessons...");
    for (const row of index) {
      // Get track id
      const { data: trackData, error: trackError } = await supabase
        .from("tracks")
        .select("id")
        .eq("slug", row.track_slug)
        .single();

      if (trackError || !trackData) {
        console.error("Error finding track:", row.track_slug, trackError);
        continue;
      }

      // Upsert module
      const { error: moduleError } = await supabase
        .from("modules")
        .upsert({
          track_id: trackData.id,
          title: row.module_title,
          index_in_track: row.module_index,
        }, { onConflict: "track_id,title" });

      if (moduleError) {
        console.error("Error upserting module:", row.module_title, moduleError);
        continue;
      }

      // Get module id
      const { data: moduleData, error: moduleDataError } = await supabase
        .from("modules")
        .select("id")
        .eq("track_id", trackData.id)
        .eq("title", row.module_title)
        .single();

      if (moduleDataError || !moduleData) {
        console.error("Error finding module:", row.module_title, moduleDataError);
        continue;
      }

      // Upsert lesson
      const { error: lessonError } = await supabase
        .from("lessons")
        .upsert({
          module_id: moduleData.id,
          slug: row.lesson_slug,
          title: row.lesson_title,
          index_in_module: row.lesson_index,
          mdx_path: row.mdx_path,
          challenge_json_path: row.challenge_json_path,
        }, { onConflict: "module_id,slug" });

      if (lessonError) {
        console.error("Error upserting lesson:", row.lesson_slug, lessonError);
      }
    }

    console.log("✅ Supabase content index updated successfully!");
    
  } catch (error) {
    console.error("❌ Error syncing to Supabase:", error);
    throw error;
  }
}
