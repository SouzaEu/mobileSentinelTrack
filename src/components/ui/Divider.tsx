"use client"
import { View, StyleSheet, type ViewStyle } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

interface DividerProps {
  orientation?: "horizontal" | "vertical"
  style?: ViewStyle
}

export function Divider({ orientation = "horizontal", style }: DividerProps) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    horizontal: {
      height: 1,
      backgroundColor: colors.border,
      width: "100%",
      ...style,
    },
    vertical: {
      width: 1,
      backgroundColor: colors.border,
      height: "100%",
      ...style,
    },
  })

  return <View style={orientation === "horizontal" ? styles.horizontal : styles.vertical} />
}
