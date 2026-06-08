import { API_URL } from "@/constants/constants"
import * as SecureStore from "expo-secure-store"

//function to make authenticated API requests using the stored JWT token
export const request = async (endpoint: string, options?: RequestInit) => {
  // Get JWT token from SecureStore
  const token = await SecureStore.getItemAsync("token")

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // Add Authorization header if token exists
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response.json()
}