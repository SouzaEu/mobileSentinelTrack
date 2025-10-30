import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_API_KEY ||
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY ||
    process.env.EXPO_FIREBASE_API_KEY ||
    '',
  authDomain:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    '',
  projectId:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ||
    '',
  storageBucket:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    '',
  messagingSenderId:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    '',
  appId:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_APP_ID ||
    process.env.EXPO_PUBLIC_FIREBASE_APP_ID ||
    '',
  measurementId:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    '',
};

// Log minimal info to help debugging in dev
if (typeof console !== 'undefined') {
  console.warn(
    'Firebase config loaded. apiKey present:',
    !!firebaseConfig.apiKey
  );
  console.warn('Firebase projectId:', firebaseConfig.projectId || 'MISSING');
}

// Initialize Firebase app only once (avoid duplicate init on HMR)
let app;
if (getApps().length > 0) {
  app = getApp();
} else {
  if (!firebaseConfig.apiKey) {
    console.warn(
      'Firebase API key is missing. Check your .env and app.config.js'
    );
  }
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
