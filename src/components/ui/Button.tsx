"use client"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type ViewStyle, type TextStyle } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const { colors, typography, spacing, shadows } = useTheme()

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        }
      case "secondary":
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        }
      case "destructive":
        return {
          backgroundColor: colors.destructive,
          borderColor: colors.destructive,
        }
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: colors.border,
          borderWidth: 1,
        }
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
        }
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        }
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return colors.primaryForeground
      case "secondary":
        return colors.secondaryForeground
      case "destructive":
        return colors.destructiveForeground
      case "outline":
      case "ghost":
        return colors.foreground
      default:
        return colors.primaryForeground
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
          borderRadius: 8,
        }
      case "md":
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderRadius: 12,
        }
      case "lg":
        return {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.md,
          borderRadius: 16,
        }
      default:
        return {
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderRadius: 12,
        }
    }
  }

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return typography.fontSizes.sm
      case "md":
        return typography.fontSizes.base
      case "lg":
        return typography.fontSizes.lg
      default:
        return typography.fontSizes.base
    }
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...shadows.sm,
      opacity: disabled || loading ? 0.6 : 1,
      ...style,
    },
    text: {
      color: getTextColor(),
      fontSize: getFontSize(),
      fontWeight: typography.fontWeights.semibold,
      ...textStyle,
    },
    loading: {
      marginRight: spacing.xs,
    },
  })

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
      {loading && <ActivityIndicator size="small" color={getTextColor()} style={styles.loading} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
