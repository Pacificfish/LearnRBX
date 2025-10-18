import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { interactiveLessonTemplate, codecademyChallengeTemplate, moduleTestTemplate } from "./codecademy-templates";

type StepSpec = {
  type: "explanation" | "code_exercise" | "quiz" | "hint";
  content?: string;
  instruction?: string;
  starter_code?: string;
  solution?: string;
  test_type?: string;
  expected_output?: string;
  expected_variable?: string;
  expected_condition?: string;
  expected_function?: string;
  expected_event?: string;
  expected_instance?: string;
  expected_table?: string;
  expected_service?: string;
  expected_stats?: string[];
  expected_handler?: string;
  expected_color?: string;
  hint?: string;
};

type LessonSpec = {
  slug: string;
  title: string;
  summary: string;
  duration_min: number;
  objectives: string[];
  lesson_type: string;
  steps: StepSpec[];
  success_message?: string;
};

type ModuleTestSpec = {
  title: string;
  questions: Array<{
    type: "mc";
    prompt: string;
    choices: string[];
    answerIndex: number;
    explanation?: string;
  }>;
  codeTasks: Array<{
    instruction: string;
    starterCode: string;
    solution: string;
    testType: string;
    expectedOutput: string;
    hints: string[];
  }>;
};

type ModuleSpec = {
  title: string;
  lessons: LessonSpec[];
  module_test?: ModuleTestSpec;
};

type TrackSpec = {
  slug: string;
  title: string;
  description: string;
  is_premium: boolean;
  modules: ModuleSpec[];
};

type Manifest = {
  brand: string;
  version: number;
  style: string;
  tracks: TrackSpec[];
};

const ROOT = process.cwd();
const LESSONS = path.join(ROOT, "content", "lessons");
const CHALLENGES = path.join(ROOT, "content", "challenges");
const MODULE_TESTS = path.join(ROOT, "content", "module-tests");

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function writeInteractiveLesson(track: TrackSpec, mod: ModuleSpec, idxInMod: number, lesson: LessonSpec) {
  const mdxOut = interactiveLessonTemplate({
    title: lesson.title,
    slug: lesson.slug,
    summary: lesson.summary,
    duration_min: lesson.duration_min,
    objectives: lesson.objectives ?? [],
    steps: lesson.steps ?? [],
  });

  const jsonOut = codecademyChallengeTemplate({
    steps: lesson.steps ?? [],
    successMessage: lesson.success_message ?? "Great job! You've completed this lesson!",
  });

  const mdxPath = path.join(LESSONS, `${lesson.slug}.mdx`);
  const jsonPath = path.join(CHALLENGES, `${lesson.slug}.json`);

  fs.writeFileSync(mdxPath, mdxOut, "utf8");
  fs.writeFileSync(jsonPath, jsonOut, "utf8");

  return { mdxPath, jsonPath, idxInMod };
}

function writeModuleTest(track: TrackSpec, mod: ModuleSpec, moduleTest: ModuleTestSpec) {
  const moduleSlug = mod.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const jsonOut = moduleTestTemplate(moduleTest);
  const jsonPath = path.join(MODULE_TESTS, `${moduleSlug}.json`);

  fs.writeFileSync(jsonPath, jsonOut, "utf8");
  return jsonPath;
}

(async () => {
  const manifestPath = path.join(ROOT, "curriculum", "codecademy-manifest.yml");
  const doc = yaml.load(fs.readFileSync(manifestPath, "utf8")) as Manifest;

  ensureDir(LESSONS);
  ensureDir(CHALLENGES);
  ensureDir(MODULE_TESTS);

  const index = [] as Array<{
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
  }>;

  for (const track of doc.tracks) {
    for (let modIndex = 0; modIndex < track.modules.length; modIndex++) {
      const mod = track.modules[modIndex];

      // Write lessons
      mod.lessons.forEach((lesson, lessonIndex) => {
        const { mdxPath, jsonPath } = writeInteractiveLesson(track, mod, lessonIndex, lesson);
        index.push({
          track_slug: track.slug,
          track_title: track.title,
          is_premium: !!track.is_premium,
          module_title: mod.title,
          module_index: modIndex,
          lesson_slug: lesson.slug,
          lesson_title: lesson.title,
          lesson_index: lessonIndex,
          mdx_path: `/content/lessons/${path.basename(mdxPath)}`,
          challenge_json_path: `/content/challenges/${path.basename(jsonPath)}`,
        });
      });

      // Write module test if present
      if (mod.module_test) {
        const moduleTestPath = writeModuleTest(track, mod, mod.module_test);
        // Add module test path to the last lesson of this module
        const lastLessonIndex = index.findIndex(
          (item) =>
            item.track_slug === track.slug &&
            item.module_title === mod.title &&
            item.lesson_index === mod.lessons.length - 1
        );
        if (lastLessonIndex !== -1) {
          index[lastLessonIndex].module_test_path = `/content/module-tests/${path.basename(moduleTestPath)}`;
        }
      }
    }
  }

  // Emit index JSON for debugging
  fs.writeFileSync(path.join(ROOT, "curriculum", "codecademy-index.json"), JSON.stringify(index, null, 2));

  console.log("✅ Generated Codecademy-style lessons & challenges:", index.length);
  console.log("➡️  See /content/lessons, /content/challenges, and /content/module-tests");

  // Optionally hand off to Supabase indexer
  try {
    const idx = await import("./index-to-supabase");
    await idx.syncToSupabase(index);
  } catch {
    console.log("ℹ️ Supabase not configured; skipping DB index. See SQL below:");
    // Print portable SQL for manual insertion
    console.log("-- INSERT tracks/modules/lessons with your existing schema.");
  }
})();
