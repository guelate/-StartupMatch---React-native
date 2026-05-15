import { API_URL } from "@/constants"

//utility function to make requests 
export const request = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    return response.json()

}