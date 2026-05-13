import { createContext, useState } from "react"

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
    id: string
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

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [missions, setMissions] = useState<Mission[]>([])
    const [matches, setMatches] = useState<Match[]>([])
    const [pendingSwipes, setPendingSwipes] = useState<Swipe[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    //Get all missions
    const fetchMissions = async () => {
        try {
            setIsLoading(true)
            const data = await missionsService.getAll()
            setMissions(data)
        } catch (error) {
            setError("Error loading missions")
        } finally {
            setIsLoading(false)
        }
    }

    //create mission
    const createMission = async (data: CreateMissionData) => {
        try {
            setIsLoading(true)
            const newMission = await missionsService.create(data)
            setMissions((prev) => [...prev, newMission])
        } catch (error) {
            setError("Error loading missions")
        } finally {
            setIsLoading(false)
        }
    }


    //update Mission

    const updateMission = async (id: string, data: UpdateMissionData) => {
        try {
            setIsLoading(true)
            const updated = await missionsService.update(id, data)
            setMissions((prev) => prev.map((m) => m.id === id ? updated : m))
        } catch (error) {
            setError("error updating missions")
        } finally {
            setIsLoading(false)
        }
    }


    //delete Mission
    const deleteMission = async (id: string) => {
        try {
            setIsLoading(true)
            await missionsService.delete(id)
            setMissions((prev) => prev.filter((m) => m.id !== id))
        } catch (error) {
            setError("Error deleting mission")
        } finally {
            setIsLoading(false)
        }
    }

}

