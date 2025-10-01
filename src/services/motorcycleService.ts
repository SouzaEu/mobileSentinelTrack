import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Motorcycle {
  id: string;
  model: string;
  plate: string;
  status: "active" | "inactive" | "maintenance";
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  battery: number;
  lastUpdate: string;
  driver?: {
    id: string;
    name: string;
  };
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: "speed" | "location" | "battery" | "maintenance";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
  resolved: boolean;
}

export interface CreateMotorcycleRequest {
  model: string;
  plate: string;
  initialLocation?: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

export interface UpdateMotorcycleRequest {
  model?: string;
  plate?: string;
  status?: "active" | "inactive" | "maintenance";
}

class MotorcycleService {
  private cacheKey = "motorcycles_cache";
  private cacheExpiry = 5 * 60 * 1000; // 5 minutos

  async getMotorcycles(forceRefresh = false): Promise<Motorcycle[]> {
    try {
      // Verificar cache primeiro
      if (!forceRefresh) {
        const cached = await this.getCachedMotorcycles();
        if (cached) return cached;
      }

      const response = await apiClient.get<Motorcycle[]>(
        API_ENDPOINTS.motorcycles.base
      );

      if (response.success && response.data) {
        await this.cacheMotorcycles(response.data);
        return response.data;
      }

      throw new Error(response.message || "Erro ao buscar motos");
    } catch (error) {
      console.log("Get motorcycles error:", error);
      // Tentar retornar dados do cache em caso de erro
      const cached = await this.getCachedMotorcycles();
      if (cached) return cached;
      throw error;
    }
  }

  async getMotorcycleById(id: string): Promise<Motorcycle> {
    try {
      const response = await apiClient.get<Motorcycle>(
        API_ENDPOINTS.motorcycles.byId(id)
      );

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Moto não encontrada");
    } catch (error) {
      console.log("Get motorcycle error:", error);
      throw error;
    }
  }

  async createMotorcycle(data: CreateMotorcycleRequest): Promise<Motorcycle> {
    try {
      const response = await apiClient.post<Motorcycle>(
        API_ENDPOINTS.motorcycles.base,
        data
      );

      if (response.success && response.data) {
        // Invalidar cache
        await this.clearCache();
        return response.data;
      }

      throw new Error(response.message || "Erro ao criar moto");
    } catch (error) {
      console.log("Create motorcycle error:", error);
      throw error;
    }
  }

  async updateMotorcycle(
    id: string,
    data: UpdateMotorcycleRequest
  ): Promise<Motorcycle> {
    try {
      const response = await apiClient.put<Motorcycle>(
        API_ENDPOINTS.motorcycles.byId(id),
        data
      );

      if (response.success && response.data) {
        // Invalidar cache
        await this.clearCache();
        return response.data;
      }

      throw new Error(response.message || "Erro ao atualizar moto");
    } catch (error) {
      console.log("Update motorcycle error:", error);
      throw error;
    }
  }

  async deleteMotorcycle(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(
        API_ENDPOINTS.motorcycles.byId(id)
      );

      if (response.success) {
        // Invalidar cache
        await this.clearCache();
        return;
      }

      throw new Error(response.message || "Erro ao deletar moto");
    } catch (error) {
      console.log("Delete motorcycle error:", error);
      throw error;
    }
  }

  async getAlerts(): Promise<Alert[]> {
    try {
      const response = await apiClient.get<Alert[]>(API_ENDPOINTS.alerts.base);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Erro ao buscar alertas");
    } catch (error) {
      console.log("Get alerts error:", error);
      throw error;
    }
  }

  async resolveAlert(id: string): Promise<void> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.alerts.resolve(id));

      if (response.success) {
        return;
      }

      throw new Error(response.message || "Erro ao resolver alerta");
    } catch (error) {
      console.log("Resolve alert error:", error);
      throw error;
    }
  }

  // Cache methods
  private async getCachedMotorcycles(): Promise<Motorcycle[] | null> {
    try {
      const cached = await AsyncStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      if (now - timestamp > this.cacheExpiry) {
        await AsyncStorage.removeItem(this.cacheKey);
        return null;
      }

      return data;
    } catch (error) {
      console.log("Cache read error:", error);
      return null;
    }
  }

  private async cacheMotorcycles(data: Motorcycle[]): Promise<void> {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.log("Cache write error:", error);
    }
  }

  private async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.cacheKey);
    } catch (error) {
      console.log("Cache clear error:", error);
    }
  }
}

export const motorcycleService = new MotorcycleService();
