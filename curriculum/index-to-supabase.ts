import fs from "node:fs";
import path from "node:path";

// This file will be used to upsert the curriculum data to Supabase
// For now, it just reads the generated index and prepares it for database insertion

interface LessonIndex {
  track_slug: string;
  track_title: string;
  track_is_premium: boolean;
  module_slug: string;
  module_title: string;
  module_index_in_track: number;
  lesson_slug: string;
  lesson_title: string;
  lesson_index_in_module: number;
  step_count: number;
  duration_min: number;
  objectives: string[];
}

(async () => {
  try {
    const indexPath = path.join(process.cwd(), "curriculum", "codecademy-index.json");
    const index: LessonIndex[] = JSON.parse(fs.readFileSync(indexPath, "utf8"));

    // Group by tracks
    const tracks = new Map<string, any>();
    const modules = new Map<string, any>();
    const lessons = new Map<string, any>();

    for (const item of index) {
      // Track data
      if (!tracks.has(item.track_slug)) {
        tracks.set(item.track_slug, {
          slug: item.track_slug,
          title: item.track_title,
          description: `Learn ${item.track_title}`,
          is_premium: item.track_is_premium
        });
      }

      // Module data
      const moduleKey = `${item.track_slug}-${item.module_slug}`;
      if (!modules.has(moduleKey)) {
        modules.set(moduleKey, {
          track_slug: item.track_slug,
          slug: item.module_slug,
          title: item.module_title,
          index_in_track: item.module_index_in_track
        });
      }

      // Lesson data
      const lessonKey = `${item.module_slug}-${item.lesson_slug}`;
      if (!lessons.has(lessonKey)) {
        lessons.set(lessonKey, {
          module_slug: item.module_slug,
          slug: item.lesson_slug,
          title: item.lesson_title,
          mdx_path: `lessons/${item.lesson_slug}.mdx`,
          step_count: item.step_count,
          index_in_module: item.lesson_index_in_module,
          duration_min: item.duration_min,
          objectives: item.objectives
        });
      }
    }

    const dbData = {
      tracks: Array.from(tracks.values()),
      modules: Array.from(modules.values()),
      lessons: Array.from(lessons.values())
    };

    fs.writeFileSync(
      path.join(process.cwd(), "curriculum", "supabase-data.json"),
      JSON.stringify(dbData, null, 2)
    );

    console.log(`✅ Prepared database data:`);
    console.log(`   - ${dbData.tracks.length} tracks`);
    console.log(`   - ${dbData.modules.length} modules`);
    console.log(`   - ${dbData.lessons.length} lessons`);
    console.log(`📊 Database data saved to: ${path.join(process.cwd(), "curriculum", "supabase-data.json")}`);
  } catch (error) {
    console.error("❌ Error preparing database data:", error);
    process.exit(1);
  }
})();
