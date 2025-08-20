"use client"

import { useRef } from "react"
import { Animated } from "react-native"

export function useAnimatedValue(initialValue = 0) {
  const animatedValue = useRef(new Animated.Value(initialValue)).current

  const animateTo = (toValue: number, duration = 300, useNativeDriver = true) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver,
    })
  }

  const fadeIn = (duration = 300) => {
    return animateTo(1, duration)
  }

  const fadeOut = (duration = 300) => {
    return animateTo(0, duration)
  }

  const slideIn = (duration = 300) => {
    return animateTo(0, duration)
  }

  const slideOut = (toValue = 100, duration = 300) => {
    return animateTo(toValue, duration)
  }

  return {
    animatedValue,
    animateTo,
    fadeIn,
    fadeOut,
    slideIn,
    slideOut,
  }
}
