import { Platform } from "react-native"
import * as SecureStore from "expo-secure-store"

// Storage utility that works on both web and mobile
export const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === "web") {
      return localStorage.getItem(key)  // for web, use localStorage
    }
    return SecureStore.getItemAsync(key)  // for mobile, use SecureStore
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value)  
    } else {
      await SecureStore.setItemAsync(key, value) 
    }
  },

  deleteItem: async (key: string): Promise<void> => {
    if (Platform.OS === "web") {
      localStorage.removeItem(key) 
    } else {
      await SecureStore.deleteItemAsync(key)  
    }
  },
}