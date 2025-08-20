"use client"

import { useState, useEffect, useCallback } from "react"
import type { ApiError } from "../services/api"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: ApiError) => void
}

export function useApi<T>(apiFunction: () => Promise<T>, options: UseApiOptions = {}) {
  const { immediate = true, onSuccess, onError } = options

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  })

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const result = await apiFunction()
      setState({ data: result, loading: false, error: null })
      onSuccess?.(result)
      return result
    } catch (error) {
      const apiError = error as ApiError
      setState({ data: null, loading: false, error: apiError })
      onError?.(apiError)
      throw error
    }
  }, [apiFunction, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
    refetch: execute,
  }
}

export function useMutation<T, P = any>(apiFunction: (params: P) => Promise<T>, options: UseApiOptions = {}) {
  const { onSuccess, onError } = options

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(
    async (params: P) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const result = await apiFunction(params)
        setState({ data: result, loading: false, error: null })
        onSuccess?.(result)
        return result
      } catch (error) {
        const apiError = error as ApiError
        setState((prev) => ({ ...prev, loading: false, error: apiError }))
        onError?.(apiError)
        throw error
      }
    },
    [apiFunction, onSuccess, onError],
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    mutate,
    reset,
  }
}
