import { createContext, useContext, useState } from "react" 
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
  const [user, setUser] = useState<User | null>(null)  
  const [token, setToken] = useState<string | null>(null) 

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,  
      isFounder: user?.role === 'FOUNDER',      
      isDeveloper: user?.role === 'DEVELOPER',
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