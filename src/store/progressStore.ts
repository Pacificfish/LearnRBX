import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { useAuthStore } from './authStore'

export interface LessonProgress {
  lessonId: string
  completed: boolean
  code?: string
  completedAt?: string
}

export interface CourseProgress {
  courseId: string
  lessons: Record<string, LessonProgress>
  startedAt: string
  lastAccessedAt: string
}

interface ProgressState {
  progress: Record<string, CourseProgress>
  loading: boolean
  initialized: boolean
  initialize: () => Promise<void>
  updateLessonProgress: (courseId: string, lessonId: string, completed: boolean, code?: string) => Promise<void>
  getLessonProgress: (courseId: string, lessonId: string) => LessonProgress | undefined
  getCourseCompletion: (courseId: string) => number // percentage
}

export const useProgressStore = create<ProgressState>()((set, get) => ({
  progress: {},
  loading: false,
  initialized: false,
  initialize: async () => {
    const { user } = useAuthStore.getState()
    if (!user || get().initialized) return

    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        console.error('Error loading progress:', error)
        set({ loading: false, initialized: true })
        return
      }

      // Transform database records into progress structure
      const progress: Record<string, CourseProgress> = {}
      
      data?.forEach((record) => {
        if (!progress[record.course_id]) {
          progress[record.course_id] = {
            courseId: record.course_id,
            lessons: {},
            startedAt: record.started_at || new Date().toISOString(),
            lastAccessedAt: record.last_accessed_at || new Date().toISOString(),
          }
        }

        progress[record.course_id].lessons[record.lesson_id] = {
          lessonId: record.lesson_id,
          completed: record.completed,
          code: record.code || undefined,
          completedAt: record.completed_at || undefined,
        }
      })

      set({ progress, loading: false, initialized: true })
    } catch (error) {
      console.error('Error initializing progress:', error)
      set({ loading: false, initialized: true })
    }
  },
  updateLessonProgress: async (courseId: string, lessonId: string, completed: boolean, code?: string) => {
    const { user } = useAuthStore.getState()
    if (!user) return

    // Optimistically update local state
    set((state) => {
      const courseProgress = state.progress[courseId] || {
        courseId,
        lessons: {},
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
      }

      const lessonProgress: LessonProgress = {
        lessonId,
        completed,
        code,
        completedAt: completed ? new Date().toISOString() : undefined,
      }

      return {
        progress: {
          ...state.progress,
          [courseId]: {
            ...courseProgress,
            lessons: {
              ...courseProgress.lessons,
              [lessonId]: lessonProgress,
            },
            lastAccessedAt: new Date().toISOString(),
          },
        },
      }
    })

    // Sync to database
    try {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          course_id: courseId,
          lesson_id: lessonId,
          completed,
          code: code || null,
          completed_at: completed ? new Date().toISOString() : null,
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,course_id,lesson_id',
          ignoreDuplicates: false,
        })

      if (error) {
        console.error('Error saving progress:', error)
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  },
  getLessonProgress: (courseId: string, lessonId: string) => {
    return get().progress[courseId]?.lessons[lessonId]
  },
  getCourseCompletion: (courseId: string) => {
    const courseProgress = get().progress[courseId]
    if (!courseProgress) return 0

    const lessons = Object.values(courseProgress.lessons)
    if (lessons.length === 0) return 0

    const completed = lessons.filter((l) => l.completed).length
    return Math.round((completed / lessons.length) * 100)
  },
}))

