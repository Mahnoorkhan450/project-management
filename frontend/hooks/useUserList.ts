
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getUsers,
  type User,
} from "@/services/userService";

export default function useUserList(
  enabled = true
) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data);

      return data;
    } catch (err: any) {
      console.error("Failed to load users:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to load users."
      );

      setUsers([]);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      loadUsers();
    }
  }, [enabled, loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
  };
}
