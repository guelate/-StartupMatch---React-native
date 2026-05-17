import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider, useAuth } from "./context/auth"
import { AppProvider } from "./context/app"

const queryClient = new QueryClient()

function RootLayoutNav() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const segments = useSegments()
  const [isReady, setIsReady] = useState(false) 
  useEffect(() => {
    setIsReady(true)  
  }, [])

  useEffect(() => {
    if (!isReady) return 

    const inAuthGroup = segments[0] === "(auth)"
    const inAppGroup = segments[0] === "(app)"

    if (!isAuthenticated && inAppGroup) {
      router.replace("/(auth)/login")
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(app)/discover")
    }

  }, [isAuthenticated, segments, isReady])  

  return <Slot />
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <RootLayoutNav />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

//TODO: comment components for documentation 