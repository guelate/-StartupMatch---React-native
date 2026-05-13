import { createContext, useState } from "react"

interface User {
    id: string
    email: string
    name: string
    role: "Founder" | "developer"
    bio?: string
}

interface AuthContextType {
    user: string | null
    token: string | null
    isAuthenticated: boolean
    setUser: string
    setToken: string
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | string>(null)
    const [token, setToken] = useState<String | null>(null)

    const logout = () => {
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value= {{
        user,
            token,
            isAuthentificated: !!user,
                setUser:
        setToken:
        logout: 
        }
}>
    { children }
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within Authprovider")
    return context
}