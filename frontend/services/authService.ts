import api from "@/lib/axios";

import type {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
} from "@/types/auth";

export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const registerUser = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<{ user: User }>(
    "/auth/me"
  );

  return response.data.user;
};

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePassword = async (
  data: ChangePasswordData
): Promise<string> => {
  const response = await api.put<{
    success: boolean;
    message: string;
  }>(
    "/auth/change-password",
    data
  );

  return response.data.message;
};