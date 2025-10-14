// Utility functions
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate XP from completed lessons
 */
export function calculateXP(completedLessons: number): number {
  return completedLessons * 10;
}

/**
 * Calculate streak from progress updates
 */
export function calculateStreak(progressDates: Date[]): number {
  if (progressDates.length === 0) return 0;

  const sortedDates = progressDates
    .map((d) => new Date(d).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);

  let streak = 1;
  const today = new Date().setHours(0, 0, 0, 0);
  
  // Check if most recent activity was today or yesterday
  const mostRecent = sortedDates[0];
  const dayDiff = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24));
  
  if (dayDiff > 1) return 0; // Streak broken
  
  // Count consecutive days
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24);
    if (diff <= 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Format duration in minutes to readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

/**
 * Get badge information based on achievements
 */
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export function getBadges(stats: {
  completedLessons: number;
  streak: number;
  xp: number;
}): Badge[] {
  return [
    {
      id: 'first-lesson',
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      earned: stats.completedLessons >= 1,
    },
    {
      id: 'streak-3',
      name: 'On Fire',
      description: 'Maintain a 3-day streak',
      icon: '🔥',
      earned: stats.streak >= 3,
    },
    {
      id: 'lessons-10',
      name: 'Dedicated Learner',
      description: 'Complete 10 lessons',
      icon: '📚',
      earned: stats.completedLessons >= 10,
    },
    {
      id: 'lessons-25',
      name: 'Master Student',
      description: 'Complete 25 lessons',
      icon: '🎓',
      earned: stats.completedLessons >= 25,
    },
    {
      id: 'streak-7',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '⚡',
      earned: stats.streak >= 7,
    },
    {
      id: 'xp-500',
      name: 'XP Hunter',
      description: 'Earn 500 XP',
      icon: '⭐',
      earned: stats.xp >= 500,
    },
  ];
}

