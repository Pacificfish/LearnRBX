import { useGamificationStore } from '../../store/gamificationStore'

export default function GamificationBar() {
  const { xp, streak } = useGamificationStore()

  return (
    <div className="flex items-center space-x-3 mb-4">
      <div className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
        XP {xp}
      </div>
      {streak > 0 && (
        <div className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-semibold flex items-center space-x-1">
          <span>Streak {streak}</span>
          <span className="text-base">🔥</span>
        </div>
      )}
    </div>
  )
}

