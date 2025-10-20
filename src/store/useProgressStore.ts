import { create } from 'zustand';
import { User, Profile, Subscription } from '@/types/user';
import { UserProgress, UserStepState } from '@/types/curriculum';

interface ProgressState {
  // User data
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
  
  // Progress data
  progress: UserProgress[];
  stepStates: UserStepState[];
  
  // UI state
  isLoading: boolean;
  currentLessonId: string | null;
  currentStepIndex: number;
  
  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setSubscription: (subscription: Subscription | null) => void;
  setProgress: (progress: UserProgress[]) => void;
  setStepStates: (stepStates: UserStepState[]) => void;
  setCurrentLesson: (lessonId: string, stepIndex: number) => void;
  setLoading: (loading: boolean) => void;
  
  // Computed values
  getLessonProgress: (lessonId: string) => UserProgress | undefined;
  getStepState: (lessonId: string, stepIndex: number) => UserStepState | undefined;
  isStepPassed: (lessonId: string, stepIndex: number) => boolean;
  getCompletionPercentage: () => number;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  // Initial state
  user: null,
  profile: null,
  subscription: null,
  progress: [],
  stepStates: [],
  isLoading: false,
  currentLessonId: null,
  currentStepIndex: 0,

  // Actions
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setSubscription: (subscription) => set({ subscription }),
  setProgress: (progress) => set({ progress }),
  setStepStates: (stepStates) => set({ stepStates }),
  setCurrentLesson: (lessonId, stepIndex) => set({ 
    currentLessonId: lessonId, 
    currentStepIndex: stepIndex 
  }),
  setLoading: (loading) => set({ isLoading: loading }),

  // Computed values
  getLessonProgress: (lessonId) => {
    const { progress } = get();
    return progress.find(p => p.lesson_id === lessonId);
  },

  getStepState: (lessonId, stepIndex) => {
    const { stepStates } = get();
    return stepStates.find(s => s.lesson_id === lessonId && s.step_index === stepIndex);
  },

  isStepPassed: (lessonId, stepIndex) => {
    const stepState = get().getStepState(lessonId, stepIndex);
    return stepState?.passed || false;
  },

  getCompletionPercentage: () => {
    const { progress } = get();
    if (progress.length === 0) return 0;
    const completed = progress.filter(p => p.completed).length;
    return Math.round((completed / progress.length) * 100);
  }
}));
