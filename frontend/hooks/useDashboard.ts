"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDashboard,
  type DashboardData,
} from "@/services/dashboardService";

export default function useDashboard() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboard();

        setDashboard(data);

        return data;
      } catch (err: any) {
        console.error(
          "Failed to load dashboard:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load dashboard."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const clearError = () => {
    setError("");
  };

  return {
    dashboard,
    loading,
    error,

    loadDashboard,
    clearError,
  };
}