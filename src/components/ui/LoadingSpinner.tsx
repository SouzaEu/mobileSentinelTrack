"use client"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

interface LoadingSpinnerProps {
  size?: "small" | "large"
  color?: string
  fullScreen?: boolean
}

export function LoadingSpinner({ size = "large", color, fullScreen = false }: LoadingSpinnerProps) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      ...(fullScreen && {
        flex: 1,
        backgroundColor: colors.background,
      }),
    },
  })

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color || colors.primary} />
    </View>
  )
}
