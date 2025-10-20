import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import {
  lessonOverviewMDX,
  stepCodeTaskJSON,
  stepQuizJSON,
  stepReadMDX,
  moduleTestJSON
} from "./templates.codecademy";

type Step =
  | { type: "read"; title: string; mdx: string }
  | { type: "codeTask"; title: string; starterCode: string; tests: any[]; hints: string[]; checkpoint?: boolean }
  | { type: "quiz"; title: string; questions: any[]; checkpoint?: boolean };

type Lesson = {
  slug: string;
  title: string;
  summary: string;
  duration_min: number;
  objectives?: string[];
  steps: Step[];
  index_in_module: number;
};

type Module = {
  slug: string;
  title: string;
  index_in_track: number;
  lessons: Lesson[];
  module_test?: any;
};

type Track = {
  slug: string;
  title: string;
  description: string;
  is_premium: boolean;
  modules: Module[];
};

type Manifest = {
  brand: string;
  version: number;
  tracks: Track[];
};

const ROOT = process.cwd();
const LESSONS = path.join(ROOT, "content", "lessons");
const STEPS = path.join(ROOT, "content", "steps");
const MODTESTS = path.join(ROOT, "content", "module-tests");

function ensure(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

(async () => {
  try {
    const manifest = yaml.load(
      fs.readFileSync(path.join(ROOT, "curriculum", "learnrbx.codecademy.yml"), "utf8")
    ) as Manifest;

    ensure(LESSONS);
    ensure(STEPS);
    ensure(MODTESTS);

    const index: any[] = [];

    for (const track of manifest.tracks) {
      for (const mod of track.modules) {
        for (const lesson of mod.lessons) {
          // Write lesson overview MDX
          const mdx = lessonOverviewMDX({
            title: lesson.title,
            slug: lesson.slug,
            summary: lesson.summary ?? "",
            duration_min: lesson.duration_min ?? 10,
            objectives: lesson.objectives ?? []
          });
          fs.writeFileSync(path.join(LESSONS, `${lesson.slug}.mdx`), mdx, "utf8");

          // Write steps
          const stepDir = path.join(STEPS, lesson.slug);
          ensure(stepDir);
          lesson.steps.forEach((step, i) => {
            const stepNum = String(i + 1).padStart(2, "0");
            const fileName = `${stepNum}-${step.type}`;
            
            if (step.type === "read") {
              fs.writeFileSync(
                path.join(stepDir, `${fileName}.mdx`),
                stepReadMDX(step.mdx),
                "utf8"
              );
            } else if (step.type === "codeTask") {
              fs.writeFileSync(
                path.join(stepDir, `${fileName}.json`),
                stepCodeTaskJSON({
                  starterCode: step.starterCode,
                  tests: step.tests,
                  hints: step.hints,
                  checkpoint: step.checkpoint ?? true
                }),
                "utf8"
              );
            } else if (step.type === "quiz") {
              fs.writeFileSync(
                path.join(stepDir, `${fileName}.json`),
                stepQuizJSON({
                  questions: step.questions,
                  checkpoint: step.checkpoint ?? false
                }),
                "utf8"
              );
            }
          });

          index.push({
            track_slug: track.slug,
            track_title: track.title,
            track_is_premium: track.is_premium,
            module_slug: mod.slug,
            module_title: mod.title,
            module_index_in_track: mod.index_in_track,
            lesson_slug: lesson.slug,
            lesson_title: lesson.title,
            lesson_index_in_module: lesson.index_in_module,
            step_count: lesson.steps.length,
            duration_min: lesson.duration_min,
            objectives: lesson.objectives || []
          });
        }

        // Module test (optional)
        if (mod.module_test) {
          fs.writeFileSync(
            path.join(MODTESTS, `${mod.slug}.json`),
            moduleTestJSON(mod.module_test),
            "utf8"
          );
        }
      }
    }

    fs.writeFileSync(
      path.join(ROOT, "curriculum", "codecademy-index.json"),
      JSON.stringify(index, null, 2)
    );

    console.log(`✅ Generated ${index.length} lessons with Codecademy-style steps.`);
    console.log(`📁 Content generated in:`);
    console.log(`   - ${LESSONS}`);
    console.log(`   - ${STEPS}`);
    console.log(`   - ${MODTESTS}`);
    console.log(`📊 Index saved to: ${path.join(ROOT, "curriculum", "codecademy-index.json")}`);
  } catch (error) {
    console.error("❌ Error generating content:", error);
    process.exit(1);
  }
})();
