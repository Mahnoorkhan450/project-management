
import { z } from "zod";

// ==========================================
// ADMIN / USER UPDATE SCHEMA
// ==========================================

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .optional(),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address")
      .optional(),

    role: z
      .enum(["USER", "ADMIN"], {
        message: "Role must be either USER or ADMIN",
      })
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required for update",
    }
  );

export type UpdateUserInput = z.infer<
  typeof updateUserSchema
>;

// ==========================================
// OWN PROFILE UPDATE
// ==========================================

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .optional(),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required",
    }
  );

export type UpdateProfileInput = z.infer<
  typeof updateProfileSchema
>;

// ==========================================
// CHANGE PASSWORD
// ==========================================

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .max(100, "New password must not exceed 100 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine(
    (data) =>
      data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type ChangePasswordInput = z.infer<
  typeof changePasswordSchema
>;
