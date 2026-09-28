import api from "@/lib/axios";

export type Theme =
  | "light"
  | "dark";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS";

export interface Settings {
  language: string;
  timeZone: string;
  dateFormat: string;

  taskNotifications: boolean;
  projectUpdates: boolean;
  teamActivity: boolean;

  theme: Theme;

  defaultTaskPriority: TaskPriority;
  defaultTaskStatus: TaskStatus;
}

export interface UpdateSettingsData {
  language: string;
  timeZone: string;
  dateFormat: string;

  taskNotifications: boolean;
  projectUpdates: boolean;
  teamActivity: boolean;

  theme: Theme;

  defaultTaskPriority: TaskPriority;
  defaultTaskStatus: TaskStatus;
}

interface SettingsResponse {
  success: boolean;
  message?: string;
  data: Settings;
}

/* =========================================
   GET SETTINGS
========================================= */

export const getSettings = async (): Promise<Settings> => {
  const response =
    await api.get<SettingsResponse>(
      "/settings"
    );

  return response.data.data;
};

/* =========================================
   UPDATE SETTINGS
========================================= */

export const updateSettings = async (
  data: UpdateSettingsData
): Promise<Settings> => {
  const response =
    await api.put<SettingsResponse>(
      "/settings",
      data
    );

  return response.data.data;
};