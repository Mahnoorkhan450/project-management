import prisma from "../lib/prisma.js";

import type {
  UpdateSettingsInput,
} from "../validations/settingsValidation.js";

const defaultSettings = {
  language: "English",
  timeZone: "Asia/Karachi",
  dateFormat: "DD/MM/YYYY",

  taskNotifications: true,
  projectUpdates: true,
  teamActivity: false,

  theme: "light",

  defaultTaskPriority: "MEDIUM" as const,
  defaultTaskStatus: "TODO" as const,
};

export const getUserSettings = async (
  userId: number
) => {
  let settings =
    await prisma.userSettings.findUnique({
      where: {
        userId,
      },
    });

  if (!settings) {
    settings =
      await prisma.userSettings.create({
        data: {
          userId,
          ...defaultSettings,
        },
      });
  }

  return settings;
};

export const updateUserSettings = async (
  userId: number,
  data: UpdateSettingsInput
) => {
  const settings =
    await prisma.userSettings.upsert({
      where: {
        userId,
      },

      create: {
        userId,
        ...data,
      },

      update: {
        ...data,
      },
    });

  return settings;
};