export const interactiveLessonTemplate = ({
  title,
  slug,
  summary,
  duration_min,
  objectives = [],
  steps = [],
}: {
  title: string;
  slug: string;
  summary: string;
  duration_min: number;
  objectives: string[];
  steps: Array<{
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
  }>;
}) => `---
title: "${title}"
slug: "${slug}"
summary: "${summary}"
duration_min: ${duration_min}
lesson_type: "interactive"
---

# ${title}

${summary}

## Learning Objectives

${objectives.map(o => `- ${o}`).join('\n')}

## Interactive Lesson

This lesson will guide you through hands-on coding exercises. Complete each step to progress through the lesson.

${steps.map((step, index) => {
  if (step.type === "explanation") {
    return `
### Step ${index + 1}: Explanation

${step.content}

---
`;
  } else if (step.type === "code_exercise") {
    return `
### Step ${index + 1}: Code Exercise

${step.instruction}

**Your Task:**
\`\`\`lua
${step.starter_code || "-- Write your code here"}
\`\`\`

**Expected Output:**
${step.expected_output ? `\`${step.expected_output}\`` : "Complete the exercise above"}

${step.hint ? `**Hint:** ${step.hint}` : ""}

---
`;
  } else if (step.type === "quiz") {
    return `
### Step ${index + 1}: Quick Quiz

${step.content}

---
`;
  } else if (step.type === "hint") {
    return `
### Step ${index + 1}: Hint

${step.content}

---
`;
  }
  return "";
}).join("")}

## Next Steps

Great job completing this lesson! You've learned important concepts that will help you in your Roblox development journey.

- Practice the concepts you learned
- Try modifying the code examples
- Move on to the next lesson when you're ready
`;

export const codecademyChallengeTemplate = ({
  steps,
  successMessage,
}: {
  steps: Array<{
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
  }>;
  successMessage: string;
}) => JSON.stringify(
  {
    lessonType: "interactive",
    steps: steps.map((step, index) => ({
      id: `step-${index + 1}`,
      type: step.type,
      content: step.content,
      instruction: step.instruction,
      starterCode: step.starter_code,
      solution: step.solution,
      testType: step.test_type,
      expectedOutput: step.expected_output,
      expectedVariable: step.expected_variable,
      expectedCondition: step.expected_condition,
      expectedFunction: step.expected_function,
      expectedEvent: step.expected_event,
      expectedInstance: step.expected_instance,
      expectedTable: step.expected_table,
      expectedService: step.expected_service,
      expectedStats: step.expected_stats,
      expectedHandler: step.expected_handler,
      expectedColor: step.expected_color,
      hint: step.hint,
    })),
    successMessage,
  },
  null,
  2
);

export const moduleTestTemplate = ({
  title,
  questions,
  codeTasks,
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
    instruction: string;
    starterCode: string;
    solution: string;
    testType: string;
    expectedOutput: string;
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
      instruction: ct.instruction,
      starterCode: ct.starterCode,
      solution: ct.solution,
      testType: ct.testType,
      expectedOutput: ct.expectedOutput,
      hints: ct.hints,
    })),
  },
  null,
  2
);
