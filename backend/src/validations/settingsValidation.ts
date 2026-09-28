import { z } from "zod";

export const updateSettingsSchema = z.object({
  language: z.string().min(1, "Language is required"),

  timeZone: z.string().min(1, "Time zone is required"),

  dateFormat: z.string().min(1, "Date format is required"),

  taskNotifications: z.boolean(),

  projectUpdates: z.boolean(),

  teamActivity: z.boolean(),

  theme: z.enum(["light", "dark"]),

  defaultTaskPriority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),

  defaultTaskStatus: z.enum([
    "TODO",
    "IN_PROGRESS",
  ]),
});

export type UpdateSettingsInput = z.infer<
  typeof updateSettingsSchema
>;