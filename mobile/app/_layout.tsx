import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider, useAuth } from "@/context/auth"
import { AppProvider } from "@/context/app"

const queryClient = new QueryClient()

function RootLayoutNav() {
  // Get authentication state from context
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  // Prevent navigation before the root layout is mounted
  const [isReady, setIsReady] = useState(false)

  // Mark layout as ready after first render
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Handle navigation based on authentication state
  useEffect(() => {
    if (!isReady) return

    const inAuthGroup = segments[0] === "(auth)"
    const inAppGroup = segments[0] === "(app)"

    // Not authenticated and trying to access app → redirect to login
    if (!isAuthenticated && inAppGroup) {
      router.replace("/(auth)/login")
    }

    // Not authenticated and not in any group → redirect to login
    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login")
    }

    // Authenticated and still on auth screens → redirect to app
    if (isAuthenticated && inAuthGroup) {
      router.replace("/(app)/discover")
    }

  }, [isAuthenticated, segments, isReady])

  // Render the active child route
  return <Slot />
}

// Root layout it wraps the entire app with global providers
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Auth provider — manages user authentication state */}
      <AuthProvider>
        {/* App provider — manages global app state */}
        <AppProvider>
          <RootLayoutNav />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}