"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { platformStorage } from "../utils/storage";
import { authService, type AuthResponse } from "../services/authService";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (
    updates: Partial<Pick<User, "name" | "email">>
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await platformStorage.getItem("userData");
      const token = await platformStorage.getItem("authToken");

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (parseError) {
          console.log("Error parsing user data:", parseError);
          // Limpar dados corrompidos
          await platformStorage.removeItem("userData");
          await platformStorage.removeItem("authToken");
        }
      }
    } catch (error) {
      console.log("Error checking auth state:", error);
      // Em caso de erro, garantir que o usuário não fica logado
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response: AuthResponse = await authService.login({
        email,
        password,
      });
      setUser(response.user);
      return true;
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    try {
      const response: AuthResponse = await authService.register({
        email,
        password,
        name,
      });
      setUser(response.user);
      return true;
    } catch (error) {
      console.log("Register error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      await platformStorage.removeItem("authToken");
      await platformStorage.removeItem("refreshToken");
      await platformStorage.removeItem("userData");
    } catch (error) {
      console.log("Logout error:", error);
      // Garantir saída mesmo se API falhar
      setUser(null);
      await platformStorage.removeItem("authToken");
      await platformStorage.removeItem("refreshToken");
      await platformStorage.removeItem("userData");
    }
  };

  const updateProfile = async (
    updates: Partial<Pick<User, "name" | "email">>
  ) => {
    if (!user) return;
    const updated: User = { ...user, ...updates };
    setUser(updated);
    await platformStorage.setItem("userData", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
