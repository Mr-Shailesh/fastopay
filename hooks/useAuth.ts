"use client";

import { useCallback, useEffect, useState } from "react";
import { RegisterPayload, User } from "@/types/index";
import { tokenManager } from "@/lib/auth/tokenManager";
import {
  findRegisteredUserByEmail,
  generateTokens,
  generateUserId,
  getStoredUser,
  hashPassword,
  storeRegisteredUser,
  storeUser,
  updateUser,
} from "@/lib/auth/authUtils";

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser && tokenManager.hasTokens()) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const storedUser = findRegisteredUserByEmail(email);

      if (!storedUser) {
        throw new Error("User not found");
      }

      const passwordHash = await hashPassword(password);

      if (storedUser.passwordHash !== passwordHash) {
        throw new Error("Invalid credentials");
      }

      const { passwordHash: _passwordHash, ...publicUser } = storedUser;

      const tokens = generateTokens();
      tokenManager.setTokens(tokens);
      storeUser(publicUser);

      setUser(publicUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterPayload) => {
    setIsLoading(true);
    try {
      const user: User = {
        id: generateUserId(),
        email: data.email.trim().toLowerCase(),
        fullName: data.fullName,
        mobile: data.mobile,
        projects: data.projects || [],
        budgets: data.budgets || [],
      };

      await storeRegisteredUser(user, data.password);
      storeUser(user);

      const tokens = generateTokens();
      tokenManager.setTokens(tokens);

      setUser(user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    tokenManager.clearTokens();
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    const updated = updateUser(data);
    if (updated) {
      setUser(updated);
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user && tokenManager.hasTokens(),
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };
}
