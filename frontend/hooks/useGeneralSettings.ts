
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

interface UseGeneralSettingsProps {
  settings: Settings;

  onSave: (
    data: UpdateSettingsData
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export default function useGeneralSettings({
  settings,
  onSave,
}: UseGeneralSettingsProps) {
  const [language, setLanguage] =
    useState(settings.language);

  const [timeZone, setTimeZone] =
    useState(settings.timeZone);

  const [dateFormat, setDateFormat] =
    useState(settings.dateFormat);

  useEffect(() => {
    setLanguage(settings.language);
    setTimeZone(settings.timeZone);
    setDateFormat(settings.dateFormat);
  }, [
    settings.language,
    settings.timeZone,
    settings.dateFormat,
  ]);

  const handleSave = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await onSave({
      language,
      timeZone,
      dateFormat,

      taskNotifications:
        settings.taskNotifications,

      projectUpdates:
        settings.projectUpdates,

      teamActivity:
        settings.teamActivity,

      theme: settings.theme,

      defaultTaskPriority:
        settings.defaultTaskPriority,

      defaultTaskStatus:
        settings.defaultTaskStatus,
    });
  };

  return {
    language,
    setLanguage,

    timeZone,
    setTimeZone,

    dateFormat,
    setDateFormat,

    handleSave,
  };
}
