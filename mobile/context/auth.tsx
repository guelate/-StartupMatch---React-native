import { createContext, useContext, useState, useEffect } from "react"
import { User } from "../types/user"
import { storage } from "../utils/storage"

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isFounder: boolean
  isDeveloper: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [token, setTokenState] = useState<string | null>(null)

  // Load stored auth on app start
  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedToken = await storage.getItem("token")
      const storedUser = await storage.getItem("user")

      if (storedToken && storedUser) {
        setTokenState(storedToken)
        setUserState(JSON.parse(storedUser))
      }
    }
    loadStoredAuth()
  }, [])

  // Save token to storage
  const setToken = async (token: string) => {
    await storage.setItem("token", token)
    setTokenState(token)
  }

  // Save user to storage
  const setUser = async (user: User) => {
    await storage.setItem("user", JSON.stringify(user))
    setUserState(user)
  }

  // Clear storage on logout
  const logout = async () => {
    await storage.deleteItem("token")
    await storage.deleteItem("user")
    setTokenState(null)
    setUserState(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isFounder: user?.role === "FOUNDER",
      isDeveloper: user?.role === "DEVELOPER",
      setUser,
      setToken,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}