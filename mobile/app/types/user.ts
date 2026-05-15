export interface User {
    id: string
    email: string
    name: string
    role: 'FOUNDER' | 'DEVELOPER'
    bio?: string
    createdAt: string
    updatedAt: string
  }
  
  export interface LoginData {
    email: string
    password: string
  }
  
  export interface RegisterData {
    name: string
    email: string
    password: string
    role: 'FOUNDER' | 'DEVELOPER'
  }
  
  export interface AuthResponse {
    token: string
    user: User
  }