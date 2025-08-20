export const APP_CONFIG = {
  name: "SentinelTrack",
  version: "1.0.0",
  description: "Sistema de monitoramento inteligente de motos",
  author: "Equipe SentinelTrack",
  repository: "https://github.com/sentineltrack/mobile",
  supportEmail: "suporte@sentineltrack.com",
}

export const API_CONFIG = {
  baseURL: "https://api.sentineltrack.com/v1",
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
