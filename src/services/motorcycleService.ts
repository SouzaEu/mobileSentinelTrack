import { apiClient } from "./api"
import { API_ENDPOINTS, USE_MOCKS } from "../constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface Motorcycle {
  id: string
  model: string
  plate: string
  status: "active" | "inactive" | "maintenance"
  location: {
    address: string
    latitude: number
    longitude: number
  }
  battery: number
  lastUpdate: string
  driver?: {
    id: string
    name: string
  }
  alerts: Alert[]
}

export interface Alert {
  id: string
  type: "speed" | "location" | "battery" | "maintenance"
  title: string
  description: string
  severity: "low" | "medium" | "high"
  timestamp: string
  resolved: boolean
}

export interface CreateMotorcycleRequest {
  model: string
  plate: string
  initialLocation: {
    address: string
    latitude: number
    longitude: number
  }
}

export interface UpdateMotorcycleRequest {
  model?: string
  plate?: string
  status?: "active" | "inactive" | "maintenance"
}

class MotorcycleService {
  private cacheKey = "motorcycles_cache"
  private cacheExpiry = 5 * 60 * 1000 // 5 minutos

  async getMotorcycles(forceRefresh = false): Promise<Motorcycle[]> {
    try {
      // Verificar cache primeiro
      if (!forceRefresh) {
        const cached = await this.getCachedMotorcycles()
        if (cached) return cached
      }

      // Flag para usar dados mock
      if (USE_MOCKS) {
        const mockData = await this.getMockMotorcycles()
        await this.cacheMotorcycles(mockData)
        return mockData
      }

      const response = await apiClient.get<Motorcycle[]>(API_ENDPOINTS.motorcycles.base)

      if (response.success && response.data) {
        await this.cacheMotorcycles(response.data)
        return response.data
      }

      throw new Error(response.message || "Erro ao buscar motos")
    } catch (error) {
      console.log("Get motorcycles error:", error)
      // Tentar retornar dados do cache em caso de erro
      const cached = await this.getCachedMotorcycles()
      if (cached) return cached
      throw error
    }
  }

  async getMotorcycleById(id: string): Promise<Motorcycle> {
    try {
      if (USE_MOCKS) {
        const motorcycles = await this.getMockMotorcycles()
        const motorcycle = motorcycles.find((m) => m.id === id)
        if (!motorcycle) throw new Error("Moto não encontrada")
        return motorcycle
      }

      const response = await apiClient.get<Motorcycle>(API_ENDPOINTS.motorcycles.byId(id))

      if (response.success && response.data) {
        return response.data
      }

      throw new Error(response.message || "Erro ao buscar moto")
    } catch (error) {
      console.log("Get motorcycle error:", error)
      throw error
    }
  }

  async createMotorcycle(data: CreateMotorcycleRequest): Promise<Motorcycle> {
    try {
      if (USE_MOCKS) {
        return this.mockCreateMotorcycle(data)
      }

      const response = await apiClient.post<Motorcycle>(API_ENDPOINTS.motorcycles.base, data)

      if (response.success && response.data) {
        // Invalidar cache
        await this.clearCache()
        return response.data
      }

      throw new Error(response.message || "Erro ao criar moto")
    } catch (error) {
      console.log("Create motorcycle error:", error)
      throw error
    }
  }

  async updateMotorcycle(id: string, data: UpdateMotorcycleRequest): Promise<Motorcycle> {
    try {
      if (USE_MOCKS) {
        return this.mockUpdateMotorcycle(id, data)
      }

      const response = await apiClient.put<Motorcycle>(API_ENDPOINTS.motorcycles.byId(id), data)

      if (response.success && response.data) {
        // Invalidar cache
        await this.clearCache()
        return response.data
      }

      throw new Error(response.message || "Erro ao atualizar moto")
    } catch (error) {
      console.log("Update motorcycle error:", error)
      throw error
    }
  }

  async deleteMotorcycle(id: string): Promise<void> {
    try {
      if (USE_MOCKS) {
        await this.mockDeleteMotorcycle(id)
        return
      }

      const response = await apiClient.delete(API_ENDPOINTS.motorcycles.byId(id))

      if (response.success) {
        // Invalidar cache
        await this.clearCache()
        return
      }

      throw new Error(response.message || "Erro ao deletar moto")
    } catch (error) {
      console.log("Delete motorcycle error:", error)
      throw error
    }
  }

  async getAlerts(): Promise<Alert[]> {
    try {
      if (__DEV__) {
        return this.getMockAlerts()
      }

      const response = await apiClient.get<Alert[]>(API_ENDPOINTS.alerts.base)

      if (response.success && response.data) {
        return response.data
      }

      throw new Error(response.message || "Erro ao buscar alertas")
    } catch (error) {
      console.log("Get alerts error:", error)
      throw error
    }
  }

  // Cache methods
  private async getCachedMotorcycles(): Promise<Motorcycle[] | null> {
    try {
      const cached = await AsyncStorage.getItem(this.cacheKey)
      if (!cached) return null

      const { data, timestamp } = JSON.parse(cached)
      const now = Date.now()

      if (now - timestamp > this.cacheExpiry) {
        await AsyncStorage.removeItem(this.cacheKey)
        return null
      }

      return data
    } catch (error) {
      console.log("Cache read error:", error)
      return null
    }
  }

  private async cacheMotorcycles(data: Motorcycle[]): Promise<void> {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      }
      await AsyncStorage.setItem(this.cacheKey, JSON.stringify(cacheData))
    } catch (error) {
      console.log("Cache write error:", error)
    }
  }

  private async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.cacheKey)
    } catch (error) {
      console.log("Cache clear error:", error)
    }
  }

  // Mock methods para desenvolvimento
  private async getMockMotorcycles(): Promise<Motorcycle[]> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return [
      {
        id: "MT-001",
        model: "Honda CG 160",
        plate: "ABC-1234",
        status: "active",
        location: {
          address: "Av. Paulista, 1000 - Bela Vista, São Paulo",
          latitude: -23.5613,
          longitude: -46.6565,
        },
        battery: 85,
        lastUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        driver: {
          id: "D001",
          name: "João Silva",
        },
        alerts: [],
      },
      {
        id: "MT-007",
        model: "Yamaha Factor 125",
        plate: "XYZ-5678",
        status: "active",
        location: {
          address: "Rua Augusta, 500 - Consolação, São Paulo",
          latitude: -23.5505,
          longitude: -46.6333,
        },
        battery: 92,
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        alerts: [
          {
            id: "A001",
            type: "speed",
            title: "Velocidade Excessiva",
            description: "Velocidade acima do limite permitido",
            severity: "high",
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            resolved: false,
          },
        ],
      },
      {
        id: "MT-015",
        model: "Honda Biz 125",
        plate: "DEF-9012",
        status: "inactive",
        location: {
          address: "Vila Madalena - São Paulo",
          latitude: -23.5505,
          longitude: -46.6888,
        },
        battery: 45,
        lastUpdate: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        alerts: [],
      },
      {
        id: "MT-023",
        model: "Yamaha XTZ 150",
        plate: "GHI-3456",
        status: "maintenance",
        location: {
          address: "Oficina Central - Mooca, São Paulo",
          latitude: -23.5505,
          longitude: -46.6,
        },
        battery: 0,
        lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        alerts: [],
      },
    ]
  }

  private getMockAlerts(): Alert[] {
    return [
      {
        id: "A001",
        type: "speed",
        title: "Velocidade Excessiva",
        description: "Moto #MT-001 - Av. Paulista",
        severity: "high",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        resolved: false,
      },
      {
        id: "A002",
        type: "location",
        title: "Área Restrita",
        description: "Moto #MT-007 - Centro",
        severity: "medium",
        timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
        resolved: false,
      },
      {
        id: "A003",
        type: "battery",
        title: "Parada Prolongada",
        description: "Moto #MT-015 - Vila Madalena",
        severity: "low",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        resolved: false,
      },
    ]
  }

  private async mockCreateMotorcycle(data: CreateMotorcycleRequest): Promise<Motorcycle> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      id: `MT-${Date.now().toString().slice(-3)}`,
      model: data.model,
      plate: data.plate,
      status: "inactive",
      location: data.initialLocation,
      battery: 100,
      lastUpdate: new Date().toISOString(),
      alerts: [],
    }
  }

  private async mockUpdateMotorcycle(id: string, data: UpdateMotorcycleRequest): Promise<Motorcycle> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const motorcycles = await this.getMockMotorcycles()
    const motorcycle = motorcycles.find((m) => m.id === id)

    if (!motorcycle) throw new Error("Moto não encontrada")

    return {
      ...motorcycle,
      ...data,
      lastUpdate: new Date().toISOString(),
    }
  }

  private async mockDeleteMotorcycle(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Em um app real, isso removeria a moto do backend
  }
}

export const motorcycleService = new MotorcycleService()
