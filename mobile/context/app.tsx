import { Match, MissionSwipe } from "@/types/match"
import { createContext, useContext, useState } from "react"
interface AppContextType {
  matches: Match[]
  pendingSwipes: MissionSwipe[]
  setMatches: (matches: Match[]) => void
  removeMatch: (id: string) => void
  setPendingSwipes: (swipes: MissionSwipe[]) => void
}

const AppContext = createContext<AppContextType | null>(null)

//provider  manages global matches and pending swipes state
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [matches, setMatches] = useState<Match[]>([])
  const [pendingSwipes, setPendingSwipes] = useState<MissionSwipe[]>([])

  const removeMatch = (id: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <AppContext.Provider value={{
      matches,
      pendingSwipes,
      setMatches,
      removeMatch,
      setPendingSwipes,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}