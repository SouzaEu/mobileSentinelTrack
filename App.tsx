"use client"

import React from "react"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "./src/contexts/ThemeContext"
import { AuthProvider } from "./src/contexts/AuthContext"
import { AppNavigator } from "./src/navigation/AppNavigator"
import { ErrorBoundary } from "./src/components/ErrorBoundary"

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <AppNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
