"use client"

import type React from "react"
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "destructive" | "info"
  size?: "sm" | "md"
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Badge({ children, variant = "default", size = "md", style, textStyle }: BadgeProps) {
  const { colors, typography, spacing } = useTheme()

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          backgroundColor: colors.success,
          color: colors.successForeground,
        }
      case "warning":
        return {
          backgroundColor: colors.warning,
          color: colors.warningForeground,
        }
      case "destructive":
        return {
          backgroundColor: colors.destructive,
          color: colors.destructiveForeground,
        }
      case "info":
        return {
          backgroundColor: colors.info,
          color: colors.infoForeground,
        }
      default:
        return {
          backgroundColor: colors.muted,
          color: colors.mutedForeground,
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingHorizontal: spacing.xs,
          paddingVertical: 2,
          fontSize: typography.fontSizes.xs,
        }
      case "md":
        return {
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs / 2,
          fontSize: typography.fontSizes.sm,
        }
      default:
        return {
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs / 2,
          fontSize: typography.fontSizes.sm,
        }
    }
  }

  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  const styles = StyleSheet.create({
    badge: {
      backgroundColor: variantStyles.backgroundColor,
      borderRadius: 20,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      paddingVertical: sizeStyles.paddingVertical,
      alignSelf: "flex-start",
      ...style,
    },
    text: {
      color: variantStyles.color,
      fontSize: sizeStyles.fontSize,
      fontWeight: typography.fontWeights.medium,
      textAlign: "center",
      ...textStyle,
    },
  })

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}
