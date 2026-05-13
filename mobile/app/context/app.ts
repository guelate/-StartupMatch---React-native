interface Mission {
    id: string
    title: string
    description: string
    status: "OPEN" | "CLOSED"
    founderId: string
    createdAt: string
}

interface Match {
    id: string
    developerId: string
    founderId: string
    missionId: string
    createdAt: string
}

interface Swipe {
    id:string
    direction: "LIKE" | "DISLIKE"
    status?: "PENDING" | "ACCEPTED" | "REJECTED"
    createdAt: string
}

interface CreateMissionData {
    title: string
    description: string
}

interface UpdateMissionData {
    title?: string
    description?: string
    status?: 'OPEN' | 'CLOSED'
}

interface AppContextType {
    // State
    missions: Mission[]
    matches: Match[]
    pendingSwipes: Swipe[]
    isLoading: boolean
    error: string | null
  
    // Actions missions
    fetchMissions: () => Promise<void>
    createMission: (data: CreateMissionData) => Promise<void>
    updateMission: (id: string, data: UpdateMissionData) => Promise<void>
    deleteMission: (id: string) => Promise<void>
  
    // Actions matches
    setMatches: (matches: Match[]) => void
    removeMatch: (id: string) => void
  
    // Actions swipes
    setPendingSwipes: (swipes: Swipe[]) => void
  }
  
  //TODO: finish