
export const TOKEN_KEY = "token";
export const USER_KEY = "user";

export const getToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
};

export const getStoredUser = <T>(): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as T;
  } catch {
    return null;
  }
};

export const setStoredUser = <T>(user: T): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const removeStoredUser = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(USER_KEY);
};

export const clearAuthStorage = (): void => {
  removeToken();
  removeStoredUser();
};

