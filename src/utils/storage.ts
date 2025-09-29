import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * Wrapper para armazenamento que funciona em todas as plataformas
 * Usa apenas AsyncStorage para evitar problemas de compatibilidade
 */
class PlatformStorage {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.log(`Error setting ${key}:`, error)
      // Não falha silenciosamente para evitar quebrar a app
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key)
    } catch (error) {
      console.log(`Error getting ${key}:`, error)
      return null
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.log(`Error removing ${key}:`, error)
      // Não falha silenciosamente para evitar quebrar a app
    }
  }
}

export const platformStorage = new PlatformStorage()
