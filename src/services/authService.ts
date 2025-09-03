import { apiClient } from "./api"
import { API_ENDPOINTS, USE_MOCKS, STORAGE_KEYS } from "../constants"
import * as SecureStore from "expo-secure-store"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  token: string
  refreshToken: string
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Flag para simular resposta da API
      if (USE_MOCKS) {
        return this.mockLogin(credentials)
      }

      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.auth.login, credentials)

      if (response.success && response.data) {
        await this.storeTokens(response.data.token, response.data.refreshToken)
        await this.storeUserData(response.data.user)
        return response.data
      }

      throw new Error(response.message || "Erro no login")
    } catch (error) {
      console.log("Login error:", error)
      throw error
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Flag para simular resposta da API
      if (USE_MOCKS) {
        return this.mockRegister(userData)
      }

      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.auth.register, userData)

      if (response.success && response.data) {
        await this.storeTokens(response.data.token, response.data.refreshToken)
        await this.storeUserData(response.data.user)
        return response.data
      }

      throw new Error(response.message || "Erro no cadastro")
    } catch (error) {
      console.log("Register error:", error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      if (!USE_MOCKS) {
        await apiClient.post(API_ENDPOINTS.auth.logout)
      }
    } catch (error) {
      console.log("Logout API error:", error)
    } finally {
      await this.clearStoredData()
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN)
      if (!refreshToken) return null

      const response = await apiClient.post<{ token: string }>(API_ENDPOINTS.auth.refresh, {
        refreshToken,
      })

      if (response.success && response.data) {
        await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, response.data.token)
        return response.data.token
      }

      return null
    } catch (error) {
      console.log("Refresh token error:", error)
      return null
    }
  }

  private async storeTokens(token: string, refreshToken: string): Promise<void> {
    await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token)
    await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  }

  private async storeUserData(user: any): Promise<void> {
    await SecureStore.setItemAsync(STORAGE_KEYS.USER_DATA, JSON.stringify(user))
  }

  private async clearStoredData(): Promise<void> {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN)
    await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN)
    await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA)
  }

  // Mock functions para desenvolvimento
  private async mockLogin(credentials: LoginRequest): Promise<AuthResponse> {
    // Simular delay da API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (credentials.email === "admin@test.com" && credentials.password === "123456") {
      const mockResponse: AuthResponse = {
        user: {
          id: "1",
          name: "Administrador",
          email: credentials.email,
          role: "admin",
        },
        token: "mock-jwt-token-" + Date.now(),
        refreshToken: "mock-refresh-token-" + Date.now(),
      }

      await this.storeTokens(mockResponse.token, mockResponse.refreshToken)
      await this.storeUserData(mockResponse.user)

      return mockResponse
    }

    throw new Error("Email ou senha incorretos")
  }

  private async mockRegister(userData: RegisterRequest): Promise<AuthResponse> {
    // Simular delay da API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockResponse: AuthResponse = {
      user: {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: "user",
      },
      token: "mock-jwt-token-" + Date.now(),
      refreshToken: "mock-refresh-token-" + Date.now(),
    }

    await this.storeTokens(mockResponse.token, mockResponse.refreshToken)
    await this.storeUserData(mockResponse.user)

    return mockResponse
  }
}

export const authService = new AuthService()
