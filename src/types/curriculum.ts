export interface Step {
  type: 'read' | 'codeTask' | 'quiz' | 'projectTask';
  title: string;
  checkpoint?: boolean;
}

export interface CodeTaskStep extends Step {
  type: 'codeTask';
  starterCode: string;
  tests: Test[];
  hints: string[];
  checkpoint: boolean;
}

export interface QuizStep extends Step {
  type: 'quiz';
  questions: QuizQuestion[];
  checkpoint?: boolean;
}

export interface ReadStep extends Step {
  type: 'read';
  mdx: string;
}

export interface Test {
  type: 'runtime' | 'static' | 'regex';
  assert: string;
  value: string;
  description?: string;
}

export interface QuizQuestion {
  type: 'mc';
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  summary: string;
  mdx_path: string;
  step_count: number;
  index_in_module: number;
  duration_min: number;
  objectives: string[];
  module_id: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  index_in_track: number;
  track_id: string;
  has_module_test: boolean;
}

export interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  is_premium: boolean;
}

export interface StepState {
  LOCKED: 'locked';
  UNLOCKED: 'unlocked';
  PASSED: 'passed';
}

export type StepStatus = 'locked' | 'unlocked' | 'passed';

export interface UserProgress {
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score: number;
  attempts: number;
  last_code: string;
  updated_at: string;
}

export interface UserStepState {
  user_id: string;
  lesson_id: string;
  step_index: number;
  passed: boolean;
  updated_at: string;
}

export interface ModuleAssessment {
  user_id: string;
  module_id: string;
  score: number;
  details: any;
  submitted_at: string;
}
