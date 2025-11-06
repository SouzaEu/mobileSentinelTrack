import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID || '799efadb-83d3-4996-b8f5-2ff2aad87007',
      },
      EXPO_PUBLIC_FIREBASE_API_KEY:
        process.env.EXPO_PUBLIC_FIREBASE_API_KEY ||
        process.env.EXPO_FIREBASE_API_KEY ||
        '',
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN:
        process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
      EXPO_PUBLIC_FIREBASE_PROJECT_ID:
        process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET:
        process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      EXPO_PUBLIC_FIREBASE_APP_ID:
        process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
      EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID:
        process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
      EXPO_PUBLIC_API_BASE_URL:
        process.env.EXPO_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '',
      // Backend VisionMoto local (para integração IoT + Mobile)
      EXPO_PUBLIC_BACKEND_BASE_URL:
        process.env.EXPO_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5001',
      EXPO_PUBLIC_API_PORT:
        process.env.EXPO_PUBLIC_API_PORT || process.env.API_PORT || 5167,
    },
  };
};
