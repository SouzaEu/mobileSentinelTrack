"use client"

import type React from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

interface CardProps {
  children: React.ReactNode
  variant?: "default" | "elevated" | "outlined"
  padding?: "none" | "sm" | "md" | "lg"
  style?: ViewStyle
}

export function Card({ children, variant = "default", padding = "md", style }: CardProps) {
  const { colors, spacing, shadows } = useTheme()

  const getVariantStyles = () => {
    switch (variant) {
      case "elevated":
        return {
          backgroundColor: colors.card,
          ...shadows.md,
        }
      case "outlined":
        return {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        }
      default:
        return {
          backgroundColor: colors.card,
          ...shadows.sm,
        }
    }
  }

  const getPaddingStyles = () => {
    switch (padding) {
      case "none":
        return { padding: 0 }
      case "sm":
        return { padding: spacing.sm }
      case "md":
        return { padding: spacing.md }
      case "lg":
        return { padding: spacing.lg }
      default:
        return { padding: spacing.md }
    }
  }

  const styles = StyleSheet.create({
    card: {
      borderRadius: 12,
      ...getVariantStyles(),
      ...getPaddingStyles(),
      ...style,
    },
  })

  return <View style={styles.card}>{children}</View>
}
