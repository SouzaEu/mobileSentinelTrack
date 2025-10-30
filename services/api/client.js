import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Pega a URL base do ambiente ou usa um fallback
const getBaseURL = () => {
  // Primeiro tenta pegar das variáveis de ambiente
  const envBaseUrl =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_API_BASE_URL ||
    process.env.EXPO_PUBLIC_API_BASE_URL;

  if (envBaseUrl) {
    return `${envBaseUrl}/api`;
  }

  // Fallback para desenvolvimento local
  const PORT =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_API_PORT ||
    process.env.EXPO_PUBLIC_API_PORT ||
    5167;

  if (Platform.OS === 'web') {
    return `http://localhost:${PORT}/api`;
  }

  if (Platform.OS === 'android') {
    // Emulador Android usa 10.0.2.2 para mapear localhost do PC
    return `http://10.0.2.2:${PORT}/api`;
  }

  if (Platform.OS === 'ios') {
    // Simulador iOS entende localhost
    return `http://localhost:${PORT}/api`;
  }

  // Fallback final
  return `http://localhost:${PORT}/api`;
};

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
});

// Interceptors para monitorar requests/responses
api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.message || 'Erro na API',
        status: error.response.status,
      });
    }

    if (error.request) {
      return Promise.reject({
        message: 'Sem resposta do servidor. Verifique se a API está rodando.',
        status: 0,
      });
    }

    return Promise.reject({ message: error.message, status: 0 });
  }
);
