"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
  colors: typeof lightColors
  typography: typeof typography
  spacing: typeof spacing
  shadows: typeof shadows
}

const lightColors = {
  background: "#ffffff",
  foreground: "#1f2937",
  card: "#f8fafc",
  cardForeground: "#1f2937",
  primary: "#059669",
  primaryForeground: "#ffffff",
  secondary: "#475569",
  secondaryForeground: "#ffffff",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#10b981",
  accentForeground: "#ffffff",
  destructive: "#dc2626",
  destructiveForeground: "#ffffff",
  warning: "#f59e0b",
  warningForeground: "#ffffff",
  success: "#10b981",
  successForeground: "#ffffff",
  info: "#3b82f6",
  infoForeground: "#ffffff",
  border: "#e2e8f0",
  input: "#ffffff",
  ring: "rgba(5, 150, 105, 0.3)",
  overlay: "rgba(0, 0, 0, 0.5)",
  gradientStart: "#059669",
  gradientEnd: "#10b981",
}

const darkColors = {
  background: "#0f172a",
  foreground: "#f1f5f9",
  card: "#1e293b",
  cardForeground: "#f1f5f9",
  primary: "#10b981",
  primaryForeground: "#0f172a",
  secondary: "#334155",
  secondaryForeground: "#f1f5f9",
  muted: "#334155",
  mutedForeground: "#94a3b8",
  accent: "#34d399",
  accentForeground: "#0f172a",
  destructive: "#ef4444",
  destructiveForeground: "#f1f5f9",
  warning: "#fbbf24",
  warningForeground: "#0f172a",
  success: "#34d399",
  successForeground: "#0f172a",
  info: "#60a5fa",
  infoForeground: "#0f172a",
  border: "#334155",
  input: "#1e293b",
  ring: "rgba(16, 185, 129, 0.3)",
  overlay: "rgba(0, 0, 0, 0.7)",
  gradientStart: "#10b981",
  gradientEnd: "#34d399",
}

const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  fontWeights: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
}

const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 8,
  },
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const systemColorScheme = useColorScheme()

  const isDark = theme === "dark" || (theme === "system" && systemColorScheme === "dark")
  const colors = isDark ? darkColors : lightColors

  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme")
      if (savedTheme) {
        setTheme(savedTheme as Theme)
      }
    } catch (error) {
      console.log("Error loading theme:", error)
    }
  }

  const handleSetTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem("theme", newTheme)
      setTheme(newTheme)
    } catch (error) {
      console.log("Error saving theme:", error)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme: handleSetTheme, colors, typography, spacing, shadows }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
