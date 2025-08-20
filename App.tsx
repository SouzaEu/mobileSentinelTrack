"use client"

import React from "react"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "./src/contexts/ThemeContext"
import { AuthProvider } from "./src/contexts/AuthContext"
import { AppNavigator } from "./src/navigation/AppNavigator"
// Removido carregamento de fontes locais para evitar travamento da splash em ambientes sem os assets

// Navegação é controlada pelo AppNavigator

export default function App() {
  // Caso queira reativar fontes customizadas, reintroduza expo-font e assets.

  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  )
}
