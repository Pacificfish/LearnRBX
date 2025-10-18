// Lesson Content Map
// This file contains all lesson content for the LearnRBX platform

export interface LessonSection {
  title: string;
  content: string;
  codeExample: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface LessonTest {
  description: string;
  type: 'static' | 'runtime' | 'regex';
  assert?: string;
  value: string;
}

export interface LessonChallenge {
  tests: LessonTest[];
  hints: string[];
  successMessage: string;
}

export interface LessonLearningTask {
  title: string;
  description: string;
  instructions: string[];
  starterCode: string;
  tests: LessonTest[];
  hints: string[];
  successMessage: string;
}

export interface LessonContent {
  title: string;
  description: string;
  sections: LessonSection[];
  learningTask?: LessonLearningTask;
  challenge?: LessonChallenge;
  defaultCode?: string;
}

// Empty lesson content map - all lessons have been removed
const lessonContentMap: Record<string, LessonContent> = {};

/**
 * Get lesson content by slug
 * Returns a default lesson structure if the lesson doesn't exist
 */
export function getLessonContent(lessonSlug: string): LessonContent {
  const content = lessonContentMap[lessonSlug];
  
  if (!content) {
    // Return a default lesson structure for non-existent lessons
    return {
      title: 'Lesson Not Found',
      description: 'This lesson does not exist or has been removed.',
      sections: [
        {
          title: 'No Content Available',
          content: 'This lesson is not available. Please check back later or contact support.',
          codeExample: '-- No code example available',
          color: 'red'
        }
      ],
      challenge: {
        tests: [],
        hints: ['This lesson is not available.'],
        successMessage: 'Lesson not found.'
      }
    };
  }
  
  return content;
}