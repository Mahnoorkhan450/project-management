
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getSettings,
  updateSettings,
  type Settings,
  type UpdateSettingsData,
} from "@/services/settingsService";

export type SettingsToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export interface SettingsToast {
  message: string;
  type: SettingsToastType;
}

export default function useSettings() {
  const [settings, setSettings] =
    useState<Settings | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [toast, setToast] =
    useState<SettingsToast | null>(null);

  // ==========================================
  // SHOW TOAST
  // ==========================================

  const showToast = useCallback(
    (
      message: string,
      type: SettingsToastType
    ) => {
      setToast({
        message,
        type,
      });
    },
    []
  );

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  // ==========================================
  // LOAD SETTINGS
  // ==========================================

  const loadSettings =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getSettings();

        setSettings(data);

        return data;
      } catch (err: any) {
        console.error(
          "Failed to load settings:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to load settings.";

        setError(message);

        return null;
      } finally {
        setLoading(false);
      }
    }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // ==========================================
  // SAVE SETTINGS
  // ==========================================

  const saveSettings = useCallback(
    async (
      data: UpdateSettingsData
    ): Promise<{
      success: boolean;
      message: string;
    }> => {
      try {
        setSaving(true);
        setError("");

        const updatedSettings =
          await updateSettings(data);

        setSettings(
          updatedSettings
        );

        const message =
          "Your settings have been saved successfully.";

        showToast(
          message,
          "success"
        );

        return {
          success: true,
          message,
        };
      } catch (err: any) {
        console.error(
          "Failed to update settings:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Failed to save settings.";

        setError(message);

        showToast(
          message,
          "error"
        );

        return {
          success: false,
          message,
        };
      } finally {
        setSaving(false);
      }
    },
    [showToast]
  );

  // ==========================================
  // UPDATE LOCAL SETTING
  // ==========================================

  const updateLocalSetting = useCallback(
    <K extends keyof Settings>(
      key: K,
      value: Settings[K]
    ) => {
      setSettings((previous) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          [key]: value,
        };
      });
    },
    []
  );

  // ==========================================
  // CLEAR ERROR
  // ==========================================

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    settings,

    loading,
    saving,
    error,

    toast,

    loadSettings,
    saveSettings,
    updateLocalSetting,

    clearError,
    clearToast,
    showToast,
  };
}
