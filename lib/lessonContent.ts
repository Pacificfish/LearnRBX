// Lesson Content Loading
// This file loads lesson content from generated MDX and JSON files

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

export interface LessonContent {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    content: string;
    codeExample: string;
    color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  }>;
  learningTask?: {
    title: string;
    description: string;
    instructions: string[];
    starterCode: string;
    tests: LessonTest[];
    hints: string[];
    successMessage: string;
  };
  challenge?: LessonChallenge;
  defaultCode?: string;
}

/**
 * Get lesson content by slug from generated files
 * Returns a default lesson structure if the lesson doesn't exist
 */
export async function getLessonContent(lessonSlug: string): Promise<LessonContent> {
  try {
    // Fetch lesson content from generated files
    const [mdxResponse, challengeResponse] = await Promise.all([
      fetch(`/content/lessons/${lessonSlug}.mdx`),
      fetch(`/content/challenges/${lessonSlug}.json`)
    ]);

    if (!mdxResponse.ok || !challengeResponse.ok) {
      throw new Error('Lesson files not found');
    }

    const mdxContent = await mdxResponse.text();
    const challengeData = await challengeResponse.json();

    // Parse MDX frontmatter (simple parsing for now)
    const frontmatterMatch = mdxContent.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
    
    const titleMatch = frontmatter.match(/title:\s*"([^"]*)"/);
    const summaryMatch = frontmatter.match(/summary:\s*"([^"]*)"/);
    
    const title = titleMatch ? titleMatch[1] : 'Untitled Lesson';
    const summary = summaryMatch ? summaryMatch[1] : 'No description available';

    // Convert challenge data to our format
    const challenge: LessonChallenge = {
      tests: challengeData.tests || [],
      hints: challengeData.hints || [],
      successMessage: challengeData.successMessage || 'Well done!'
    };

    return {
      title,
      description: summary,
      sections: [
        {
          title: 'Lesson Content',
          content: mdxContent.replace(/^---\n[\s\S]*?\n---\n/, ''), // Remove frontmatter
          codeExample: challengeData.starterCode || '-- No starter code provided',
          color: 'blue'
        }
      ],
      challenge,
      defaultCode: challengeData.starterCode || ''
    };
  } catch (error) {
    console.error('Error loading lesson content:', error);
    
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
}