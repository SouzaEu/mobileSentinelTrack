import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getBackendBaseURL = () => {
  const envUrl =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_BASE_URL ||
    process.env.EXPO_PUBLIC_BACKEND_BASE_URL ||
    Constants.expoConfig?.extra?.EXPO_PUBLIC_API_BASE_URL ||
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    process.env.BACKEND_BASE_URL;

  if (envUrl) return envUrl.replace(/\/$/, '');

  const defaultPort = 8080;
  if (Platform.OS === 'android') return `http://10.0.2.2:${defaultPort}`;
  return `http://localhost:${defaultPort}`;
};

export const javaApi = axios.create({
  baseURL: getBackendBaseURL(),
  timeout: 15000,
});

javaApi.interceptors.request.use(async config => {
  try {
    const token =
      (await AsyncStorage.getItem('AUTH_BEARER')) || process.env.AUTH_BEARER;
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`,
      };
    }
    // Correlation Id básico (timestamp-rand)
    const correlationId = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    config.headers['X-Correlation-Id'] =
      config.headers['X-Correlation-Id'] || correlationId;
  } catch {}
  return config;
});

javaApi.interceptors.response.use(
  res => res,
  error => {
    if (error?.response) {
      return Promise.reject({
        message: error.response.data?.message || 'Erro na API Java',
        status: error.response.status,
        data: error.response.data,
      });
    }
    if (error?.request) {
      return Promise.reject({
        message: 'Sem resposta do backend Java',
        status: 0,
      });
    }
    return Promise.reject({
      message: error?.message || 'Erro desconhecido',
      status: 0,
    });
  }
);

export default javaApi;
