export const mdxLessonTemplate = ({
  title,
  slug,
  summary,
  duration_min,
  objectives = [],
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
---

# ${title}

${summary}

## Objectives

${objectives.map(o => `- ${o}`).join('\n')}

## Explanation

> This lesson introduces concepts with short examples and guidance. In Roblox Studio, you'd place Scripts/LocalScripts under Services like **Workspace**, **StarterPlayer**, or **ReplicatedStorage**. In LearnRBX we **simulate** logic where Studio APIs aren't available, and verify understanding with static/runtime tests.

### Key Concepts

This lesson covers fundamental concepts that you'll use throughout your Roblox development journey. Pay attention to the patterns and techniques shown here.

### Example

\`\`\`lua
-- Add a small, runnable example here tailored to the lesson.
-- This helps demonstrate the concept before the challenge.
\`\`\`

## Learning Task

Complete the challenge in the **Challenge** tab to unlock the next lesson. Use the hints if you get stuck, and don't worry if it takes a few attempts!

## Next Steps

- Attempt the challenge in the **Challenge** tab
- Use hints if needed; peek at the solution after 2 failed attempts
- Once you pass all tests, you'll unlock the next lesson
`;

export const challengeTemplate = ({
  starterCode,
  tests,
  hints,
  successMessage,
}: {
  starterCode: string;
  tests: Array<{
    id?: string;
    description?: string;
    type: "runtime" | "static" | "regex";
    assert: string;
    value: string;
  }>;
  hints: string[];
  successMessage: string;
}) => JSON.stringify(
  {
    starterCode,
    tests: tests.map((t, i) => ({
      id: t.id ?? `t-${i + 1}`,
      description: t.description ?? "",
      type: t.type,
      assert: t.assert,
      value: t.value,
    })),
    hints,
    successMessage,
  },
  null,
  2
);

export const moduleTestTemplate = ({
  title,
  questions = [],
  codeTasks = [],
}: {
  title: string;
  questions?: Array<{
    type: "mc";
    prompt: string;
    choices: string[];
    answerIndex: number;
    explanation?: string;
  }>;
  codeTasks?: Array<{
    starterCode: string;
    tests: Array<{
      type: "runtime" | "static" | "regex";
      assert: string;
      value: string;
    }>;
    hints: string[];
  }>;
}) => JSON.stringify(
  {
    title,
    questions: questions.map((q, i) => ({
      id: `q-${i + 1}`,
      type: q.type,
      prompt: q.prompt,
      choices: q.choices,
      answerIndex: q.answerIndex,
      explanation: q.explanation ?? "",
    })),
    codeTasks: codeTasks.map((ct, i) => ({
      id: `ct-${i + 1}`,
      starterCode: ct.starterCode,
      tests: ct.tests.map((t, j) => ({
        id: `ct-${i + 1}-t-${j + 1}`,
        type: t.type,
        assert: t.assert,
        value: t.value,
      })),
      hints: ct.hints,
    })),
  },
  null,
  2
);
