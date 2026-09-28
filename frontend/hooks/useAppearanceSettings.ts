"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Settings,
  UpdateSettingsData,
} from "@/services/settingsService";

import { useTheme } from "@/context/ThemeContext";

type Theme = "light" | "dark";

interface UseAppearanceSettingsProps {
  settings: Settings;

  onSave: (
    data: UpdateSettingsData
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export default function useAppearanceSettings({
  settings,
  onSave,
}: UseAppearanceSettingsProps) {
  const [theme, setTheme] =
    useState<Theme>(settings.theme);

  const {
    setTheme: applyTheme,
  } = useTheme();

  // ==========================================
  // SYNC SETTINGS WITH THEME
  // ==========================================

  useEffect(() => {
    setTheme(settings.theme);
  }, [settings.theme]);

  // ==========================================
  // CHANGE THEME
  // ==========================================

  const handleThemeChange = (
    selectedTheme: Theme
  ) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme);
  };

  // ==========================================
  // SAVE SETTINGS
  // ==========================================

  const handleSave = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await onSave({
      language: settings.language,
      timeZone: settings.timeZone,
      dateFormat: settings.dateFormat,

      taskNotifications:
        settings.taskNotifications,

      projectUpdates:
        settings.projectUpdates,

      teamActivity:
        settings.teamActivity,

      theme,

      defaultTaskPriority:
        settings.defaultTaskPriority,

      defaultTaskStatus:
        settings.defaultTaskStatus,
    });
  };

  return {
    theme,
    handleThemeChange,
    handleSave,
  };
}