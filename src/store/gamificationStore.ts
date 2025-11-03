import { create } from 'zustand'

interface GamificationState {
  xp: number
  streak: number
  lastLessonDate: string | null
  grantXP: (amount: number) => void
  incrementStreak: () => void
  resetStreak: () => void
}

export const useGamificationStore = create<GamificationState>()((set) => ({
  xp: parseInt(localStorage.getItem('gamification-xp') || '0', 10),
  streak: parseInt(localStorage.getItem('gamification-streak') || '0', 10),
  lastLessonDate: localStorage.getItem('gamification-last-date'),
  grantXP: (amount: number) => {
    set((state) => {
      const newXP = state.xp + amount
      localStorage.setItem('gamification-xp', newXP.toString())
      return { xp: newXP }
    })
  },
  incrementStreak: () => {
    set((state) => {
      const today = new Date().toDateString()
      // Reset streak if it's a new day (but not consecutive)
      if (state.lastLessonDate && state.lastLessonDate !== today) {
        const lastDate = new Date(state.lastLessonDate)
        const todayDate = new Date(today)
        const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
        
        // If more than 1 day gap, reset streak
        if (daysDiff > 1) {
          const newStreak = 1
          localStorage.setItem('gamification-streak', newStreak.toString())
          localStorage.setItem('gamification-last-date', today)
          return { streak: newStreak, lastLessonDate: today }
        }
      }
      
      // If same day, don't increment
      if (state.lastLessonDate === today) {
        return state
      }
      
      const newStreak = state.streak + 1
      localStorage.setItem('gamification-streak', newStreak.toString())
      localStorage.setItem('gamification-last-date', today)
      return { streak: newStreak, lastLessonDate: today }
    })
  },
  resetStreak: () => {
    localStorage.removeItem('gamification-streak')
    localStorage.removeItem('gamification-last-date')
    set({ streak: 0, lastLessonDate: null })
  },
}))

