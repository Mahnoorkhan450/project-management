
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "@/services/authService";

import type {
  LoginData,
  RegisterData,
  User,
} from "@/types/auth";

import {
  clearAuthStorage,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "@/lib/storage";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  isAdmin: boolean;
  isUser: boolean;

  login: (
    data: LoginData
  ) => Promise<void>;

  register: (
    data: RegisterData
  ) => Promise<void>;

  logout: () => void;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setAuthToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  // Restore logged-in user when app loads
  useEffect(() => {
    const restoreAuthentication =
      async () => {
        const savedToken =
          getToken();

        const savedUser =
          getStoredUser<User>();

        // No token = user is not logged in
        if (!savedToken) {
          setLoading(false);
          return;
        }

        setAuthToken(savedToken);

        if (savedUser) {
          setUser(savedUser);
        }

        try {
          const currentUser =
            await getCurrentUser();

          setUser(currentUser);

          setStoredUser(
            currentUser
          );
        } catch (error) {
          console.error(
            "Failed to restore authentication:",
            error
          );

          clearAuthStorage();

          setAuthToken(null);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

    restoreAuthentication();
  }, []);

  // LOGIN
  const login = async (
    data: LoginData
  ): Promise<void> => {
    const response =
      await loginUser(data);

    setToken(response.token);

    setStoredUser(
      response.user
    );

    setAuthToken(
      response.token
    );

    setUser(
      response.user
    );
  };

  // REGISTER
  const register = async (
    data: RegisterData
  ): Promise<void> => {
    // Registration only creates the account.
    // User must login separately.
    await registerUser(data);
  };

  // LOGOUT
  const logout = () => {
    clearAuthStorage();

    setAuthToken(null);
    setUser(null);
  };

  const isAuthenticated =
    !!user && !!token;

  const isAdmin =
    user?.role === "ADMIN";

  const isUser =
    user?.role === "USER";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,

        isAdmin,
        isUser,

        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  (): AuthContextType => {
    const context =
      useContext(AuthContext);

    if (!context) {
      throw new Error(
        "useAuth must be used inside AuthProvider"
      );
    }

    return context;
  };
