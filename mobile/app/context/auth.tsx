import { createContext, useContext, useState, useEffect } from "react"
import * as SecureStore from "expo-secure-store"
import { User } from "../types/user"

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

  // Load token 
  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedToken = await SecureStore.getItemAsync("token")
      const storedUser = await SecureStore.getItemAsync("user")

      if (storedToken && storedUser) {
        setTokenState(storedToken)
        setUserState(JSON.parse(storedUser))
      }
    }
    loadStoredAuth()
  }, [])

  // Save token 
  const setToken = async (token: string) => {
    await SecureStore.setItemAsync("token", token)
    setTokenState(token)
  }

  // Save user
  const setUser = async (user: User) => {
    await SecureStore.setItemAsync("user", JSON.stringify(user))
    setUserState(user)
  }

  // Clear SecureStore on logout
  const logout = async () => {
    await SecureStore.deleteItemAsync("token")
    await SecureStore.deleteItemAsync("user")
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