
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

interface UseNotificationSettingsProps {
  settings: Settings;

  onSave: (
    data: UpdateSettingsData
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export default function useNotificationSettings({
  settings,
  onSave,
}: UseNotificationSettingsProps) {
  const [
    taskNotifications,
    setTaskNotifications,
  ] = useState(
    settings.taskNotifications
  );

  const [
    projectUpdates,
    setProjectUpdates,
  ] = useState(
    settings.projectUpdates
  );

  const [
    teamActivity,
    setTeamActivity,
  ] = useState(
    settings.teamActivity
  );

  useEffect(() => {
    setTaskNotifications(
      settings.taskNotifications
    );

    setProjectUpdates(
      settings.projectUpdates
    );

    setTeamActivity(
      settings.teamActivity
    );
  }, [
    settings.taskNotifications,
    settings.projectUpdates,
    settings.teamActivity,
  ]);

  const toggleTaskNotifications = () => {
    setTaskNotifications(
      (previous) => !previous
    );
  };

  const toggleProjectUpdates = () => {
    setProjectUpdates(
      (previous) => !previous
    );
  };

  const toggleTeamActivity = () => {
    setTeamActivity(
      (previous) => !previous
    );
  };

  const handleSave = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await onSave({
      language: settings.language,
      timeZone: settings.timeZone,
      dateFormat: settings.dateFormat,

      taskNotifications,
      projectUpdates,
      teamActivity,

      theme: settings.theme,

      defaultTaskPriority:
        settings.defaultTaskPriority,

      defaultTaskStatus:
        settings.defaultTaskStatus,
    });
  };

  return {
    taskNotifications,
    projectUpdates,
    teamActivity,

    toggleTaskNotifications,
    toggleProjectUpdates,
    toggleTeamActivity,

    handleSave,
  };
}
