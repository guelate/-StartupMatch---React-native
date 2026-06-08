import { Redirect } from "expo-router"

// Redirect to login
export default function Index() {
  return <Redirect href="/(auth)/login" />
}