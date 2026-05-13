import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function RootLayoutNav() {

  const { isAuthentificated } = useAuth();
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'
    const inAppGroup = segments[0] === '(app)'

    if (!isAuthentificated && inAppGroup) {
      router.replace('/(auth)/login')
    }

    if (isAuthentificated && inAppGroup) {
      router.replace('/(app)')
    }

  }, [isAuthentificated, segments])

  return <Slot />

}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}