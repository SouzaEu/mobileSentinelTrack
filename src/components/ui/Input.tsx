"use client"

import { useState } from "react"
import { View, TextInput, Text, StyleSheet, type TextInputProps, type ViewStyle } from "react-native"
import { useTheme } from "../../contexts/ThemeContext"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerStyle?: ViewStyle
}

export function Input({ label, error, containerStyle, style, ...props }: InputProps) {
  const { colors, typography, spacing } = useTheme()
  const [isFocused, setIsFocused] = useState(false)

  const styles = StyleSheet.create({
    container: {
      ...containerStyle,
    },
    label: {
      fontSize: typography.fontSizes.sm,
      fontWeight: typography.fontWeights.medium,
      color: colors.foreground,
      marginBottom: spacing.xs,
    },
    input: {
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: error ? colors.destructive : isFocused ? colors.primary : colors.border,
      borderRadius: 12,
      padding: spacing.md,
      fontSize: typography.fontSizes.base,
      color: colors.foreground,
      ...style,
    },
    error: {
      fontSize: typography.fontSizes.xs,
      color: colors.destructive,
      marginTop: spacing.xs,
    },
  })

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.mutedForeground}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}
