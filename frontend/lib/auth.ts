import type { User } from "@/types/auth";
// ==========================================
// SAVE AUTH DATA
// ==========================================

export const saveAuthData = (
  token: string,
  user: User
): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// ==========================================
// GET TOKEN
// ==========================================

export const getToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
};

// ==========================================
// GET USER
// ==========================================

export const getUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
};

// ==========================================
// CHECK LOGIN
// ==========================================

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// ==========================================
// CHECK ADMIN
// ==========================================

export const isAdmin = (): boolean => {
  const user = getUser();

  return user?.role === "ADMIN";
};

// ==========================================
// LOGOUT
// ==========================================

export const clearAuthData = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};