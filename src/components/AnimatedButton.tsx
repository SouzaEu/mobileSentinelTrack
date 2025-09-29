import React, { useRef } from "react"
import { Animated, TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native"
import { useTheme } from "../contexts/ThemeContext"
import { Ionicons } from "@expo/vector-icons"

interface AnimatedButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "destructive"
  size?: "sm" | "md" | "lg"
  icon?: keyof typeof Ionicons.glyphMap
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
}

export function AnimatedButton({
  title,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  disabled = false,
  loading = false,
  style,
}: AnimatedButtonProps) {
  const { colors } = useTheme()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const glowAnim = useRef(new Animated.Value(0)).current

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const getVariantColors = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.primary,
          color: colors.primaryForeground,
          borderColor: colors.primary,
        }
      case "secondary":
        return {
          backgroundColor: colors.secondary,
          color: colors.secondaryForeground,
          borderColor: colors.border,
        }
      case "destructive":
        return {
          backgroundColor: colors.destructive,
          color: colors.destructiveForeground,
          borderColor: colors.destructive,
        }
      default:
        return {
          backgroundColor: colors.primary,
          color: colors.primaryForeground,
          borderColor: colors.primary,
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { paddingHorizontal: 12, paddingVertical: 8, fontSize: 14 }
      case "lg":
        return { paddingHorizontal: 24, paddingVertical: 16, fontSize: 18 }
      default:
        return { paddingHorizontal: 16, paddingVertical: 12, fontSize: 16 }
    }
  }

  const variantColors = getVariantColors()
  const sizeStyles = getSizeStyles()

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
    shadowColor: variantColors.backgroundColor,
    shadowOpacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.3],
    }),
    shadowRadius: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    }),
    elevation: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 8],
    }),
  }

  const buttonStyle: ViewStyle = {
    backgroundColor: variantColors.backgroundColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: variantColors.borderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled || loading ? 0.6 : 1,
    ...sizeStyles,
    ...style,
  }

  const textStyle: TextStyle = {
    color: variantColors.color,
    fontSize: sizeStyles.fontSize,
    fontWeight: "600",
    marginLeft: icon ? 8 : 0,
  }

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.9}
      >
        {loading ? (
          <Ionicons name="refresh" size={sizeStyles.fontSize} color={variantColors.color} />
        ) : icon ? (
          <Ionicons name={icon} size={sizeStyles.fontSize} color={variantColors.color} />
        ) : null}
        <Text style={textStyle}>{loading ? "Carregando..." : title}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}
