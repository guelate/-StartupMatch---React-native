import { Slot, useRouter, useSegments } from "expo-router"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider, useAuth } from "@/context/auth"
import { AppProvider } from "@/context/app"

const queryClient = new QueryClient()

//handles redirections based on auth state
function RootLayoutNav() {

  // Get authentication state from context
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const segments = useSegments()


  // Prevent navigation before the root layout is mounted
  const [isReady, setIsReady] = useState(false)

  // Mark layout as ready after first render
  useEffect(() => {
    console.log("✅ Layout is ready")
    setIsReady(true)
  }, [])

  // Handle navigation based on authentication state
  useEffect(() => {
    console.log("🔄 Navigation effect triggered", {
      isReady,
      isAuthenticated,
      segments,
    })

    // Wait for layout to be mounted before navigating
    if (!isReady) {
      console.log("⏳ Not ready yet — skipping navigation")
      return
    }

    const inAuthGroup = segments[0] === "(auth)"
    const inAppGroup = segments[0] === "(app)"

    console.log("📍 Current position", {
      inAuthGroup,
      inAppGroup,
      segment: segments[0],
    })

    // Not authenticated and trying to access app → redirect to login
    if (!isAuthenticated && inAppGroup) {
      console.log("🔒 Not authenticated in app group → redirect to login")
      router.replace("/(auth)/login")
    }

    // Not authenticated and not in any group → redirect to login
    if (!isAuthenticated && !inAuthGroup) {
      console.log("🔒 Not authenticated and not in auth group → redirect to login")
      router.replace("/(auth)/login")
    }

    // Authenticated and still on auth screens → redirect to app
    if (isAuthenticated && inAuthGroup) {
      console.log("✅ Authenticated in auth group → redirect to discover")
      router.replace("/(app)/discover")
    }

  }, [isAuthenticated, segments, isReady])

  
  return <Slot /> // Render the active child route
}


export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Auth provider — manages user authentication state */}
      <AuthProvider>
        {/* App provider — manages global matches and swipes state */}
        <AppProvider>
          <RootLayoutNav />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}