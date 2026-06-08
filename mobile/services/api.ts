import { storage } from "../utils/storage" 

const API_URL = "http://localhost:3000"

export const request = async (endpoint: string, options?: RequestInit) => {
  // Get JWT token from storage (web: localStorage, mobile: SecureStore)
  const token = await storage.getItem("token")  

  console.log("📡 Request:", endpoint, options?.method ?? "GET")

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })

  console.log("📡 Response status:", response.status)

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  return response.json()
}