import React, { useRef, useEffect } from "react"
import { Animated, TouchableOpacity, ViewStyle } from "react-native"
import { useTheme } from "../contexts/ThemeContext"

interface AnimatedCardProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
  delay?: number
}

export function AnimatedCard({ children, onPress, style, delay = 0 }: AnimatedCardProps) {
  const { colors, shadows } = useTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current
  const translateYAnim = useRef(new Animated.Value(20)).current

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ])

    animation.start()
  }, [fadeAnim, scaleAnim, translateYAnim, delay])

  const handlePressIn = () => {
    if (onPress) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start()
    }
  }

  const handlePressOut = () => {
    if (onPress) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start()
    }
  }

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { scale: scaleAnim },
      { translateY: translateYAnim }
    ],
  }

  const cardStyle = {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
    ...style,
  }

  if (onPress) {
    return (
      <Animated.View style={[animatedStyle]}>
        <TouchableOpacity
          style={cardStyle}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[cardStyle, animatedStyle]}>
      {children}
    </Animated.View>
  )
}
