"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import * as SecureStore from "expo-secure-store"
import { authService, type AuthResponse } from "../services/authService"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const userData = await SecureStore.getItemAsync("userData")
      const token = await SecureStore.getItemAsync("authToken")

      if (token && userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.log("Error checking auth state:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response: AuthResponse = await authService.login({ email, password })
      setUser(response.user)
      return true
    } catch (error) {
      console.log("Login error:", error)
      return false
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response: AuthResponse = await authService.register({ email, password, name })
      setUser(response.user)
      return true
    } catch (error) {
      console.log("Register error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.log("Logout error:", error)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
