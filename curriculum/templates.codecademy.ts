export const lessonOverviewMDX = ({
  title,
  slug,
  summary,
  duration_min,
  objectives = []
}: {
  title: string;
  slug: string;
  summary: string;
  duration_min: number;
  objectives: string[];
}) => `---
title: "${title}"
slug: "${slug}"
summary: "${summary}"
duration_min: ${duration_min}
objectives: [${objectives.map(o => `"${o}"`).join(', ')}]
---

# ${title}

${summary}

## Objectives
${objectives.map(o => `- ${o}`).join('\n')}

> Work through the steps in the left panel. Complete checkpoint steps to unlock the next step.

## Estimated Time
⏱️ ${duration_min} minutes
`;

export const stepCodeTaskJSON = ({
  starterCode,
  tests,
  hints,
  checkpoint = true
}: {
  starterCode: string;
  tests: Array<{
    type: "runtime" | "static" | "regex";
    assert: string;
    value: string;
    description?: string;
  }>;
  hints: string[];
  checkpoint?: boolean;
}) => JSON.stringify({
  type: "codeTask",
  starterCode,
  tests,
  hints,
  checkpoint
}, null, 2);

export const stepReadMDX = (mdx: string) => mdx;

export const stepQuizJSON = ({
  questions,
  checkpoint = false
}: {
  questions: Array<{
    type: "mc";
    prompt: string;
    choices: string[];
    answerIndex: number;
    explanation?: string;
  }>;
  checkpoint?: boolean;
}) => JSON.stringify({
  type: "quiz",
  questions,
  checkpoint
}, null, 2);

export const moduleTestJSON = ({
  title,
  questions = [],
  codeTasks = []
}: {
  title: string;
  questions: Array<{
    type: "mc";
    prompt: string;
    choices: string[];
    answerIndex: number;
    explanation?: string;
  }>;
  codeTasks: Array<{
    starterCode: string;
    tests: Array<{
      type: "runtime" | "static" | "regex";
      assert: string;
      value: string;
    }>;
  }>;
}) => JSON.stringify({
  title,
  questions,
  codeTasks
}, null, 2);
