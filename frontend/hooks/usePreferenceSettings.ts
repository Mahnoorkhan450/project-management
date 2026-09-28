
"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Settings,
  UpdateSettingsData,
  TaskPriority,
  TaskStatus,
} from "@/services/settingsService";

interface UsePreferenceSettingsProps {
  settings: Settings;

  onSave: (
    data: UpdateSettingsData
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export default function usePreferenceSettings({
  settings,
  onSave,
}: UsePreferenceSettingsProps) {
  const [priority, setPriority] =
    useState<TaskPriority>(
      settings.defaultTaskPriority
    );

  const [status, setStatus] =
    useState<TaskStatus>(
      settings.defaultTaskStatus
    );

  useEffect(() => {
    setPriority(
      settings.defaultTaskPriority
    );

    setStatus(
      settings.defaultTaskStatus
    );
  }, [
    settings.defaultTaskPriority,
    settings.defaultTaskStatus,
  ]);

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

      theme: settings.theme,

      defaultTaskPriority: priority,
      defaultTaskStatus: status,
    });
  };

  return {
    priority,
    setPriority,

    status,
    setStatus,

    handleSave,
  };
}
