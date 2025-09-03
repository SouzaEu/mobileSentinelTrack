export const APP_CONFIG = {
  name: "SentinelTrack",
  version: "1.0.0",
  description: "Sistema de monitoramento inteligente de motos",
  author: "Equipe SentinelTrack",
  repository: "https://github.com/sentineltrack/mobile",
  supportEmail: "suporte@sentineltrack.com",
}

export const API_CONFIG = {
  // Placeholder de endpoint: troque assim que a API estiver pronta
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || "https://api.placeholder.local/v1",
  timeout: 10000,
  retryAttempts: 3,
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DATA: "userData",
  THEME: "theme",
  MOTORCYCLES_CACHE: "motorcycles_cache",
}

export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  plate: /^[A-Z]{3}-\d{4}$/,
  password: {
    minLength: 6,
    requireUppercase: false,
    requireNumbers: false,
    requireSpecialChars: false,
  },
}

export const CACHE_CONFIG = {
  motorcyclesExpiry: 5 * 60 * 1000, // 5 minutos
  alertsExpiry: 2 * 60 * 1000, // 2 minutos
}

// Flag única de mocks para todo o app. Configure via .env: EXPO_PUBLIC_USE_MOCKS=true
export const USE_MOCKS = (process.env.EXPO_PUBLIC_USE_MOCKS || "true").toLowerCase() === "true"

// Endpoints centralizados para fácil mapeamento quando a API real estiver disponível
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  motorcycles: {
    base: "/motorcycles",
    byId: (id: string) => `/motorcycles/${id}`,
  },
  alerts: {
    base: "/alerts",
  },
} as const
