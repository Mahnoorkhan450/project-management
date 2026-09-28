"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  changePassword,
  type ChangePasswordData,
} from "@/services/authService";

import type {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
} from "@/types/auth";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err: any) {
      console.error("Failed to load current user:", err);

      setUser(null);

      setError(
        err?.response?.data?.message ||
          "Unable to load current user."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    loadUser();
  }, [loadUser]);

  const login = async (
    data: LoginData
  ): Promise<AuthResponse> => {
    try {
      setActionLoading(true);
      setError("");

      const response = await loginUser(data);

      return response;
    } catch (err: any) {
      console.error("Login failed:", err);

      const message =
        err?.response?.data?.message ||
        "Login failed.";

      setError(message);

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const register = async (
    data: RegisterData
  ): Promise<AuthResponse> => {
    try {
      setActionLoading(true);
      setError("");

      const response = await registerUser(data);

      return response;
    } catch (err: any) {
      console.error("Registration failed:", err);

      const message =
        err?.response?.data?.message ||
        "Registration failed.";

      setError(message);

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const changeUserPassword = async (
    data: ChangePasswordData
  ): Promise<string> => {
    try {
      setActionLoading(true);
      setError("");

      return await changePassword(data);
    } catch (err: any) {
      console.error("Password change failed:", err);

      const message =
        err?.response?.data?.message ||
        "Unable to change password.";

      setError(message);

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const clearError = () => {
    setError("");
  };

  return {
    user,
    loading,
    actionLoading,
    error,

    login,
    register,
    updateUser,
    changeUserPassword,
    refreshUser,
    clearError,
  };
}