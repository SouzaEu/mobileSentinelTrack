// src/config/environment.ts
export const config = {
  environment: process.env.EXPO_PUBLIC_ENVIRONMENT || 'development',
  useMocks: process.env.EXPO_PUBLIC_USE_MOCKS === 'true',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.sentineltrack.com/v1',
  isDevelopment: process.env.EXPO_PUBLIC_ENVIRONMENT === 'development',
  isStaging: process.env.EXPO_PUBLIC_ENVIRONMENT === 'staging',
  isProduction: process.env.EXPO_PUBLIC_ENVIRONMENT === 'production',
}

// Debug info em desenvolvimento
if (__DEV__) {
  console.log('=== CONFIGURAÇÃO DO AMBIENTE ===')
  console.log('Environment:', config.environment)
  console.log('Use Mocks:', config.useMocks)
  console.log('API Base URL:', config.apiBaseUrl)
  console.log('================================')
}
