
import { z } from "zod";

// ==========================================
// CREATE PROJECT VALIDATION
// ==========================================

export const createProjectValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(150, "Project name must not exceed 150 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  status: z
    .enum(["ACTIVE", "COMPLETED", "ARCHIVED"])
    .optional()
    .default("ACTIVE"),

  teamId: z.coerce
    .number()
    .int()
    .positive("Team ID must be a positive number")
    .optional(),
});

// ==========================================
// UPDATE PROJECT VALIDATION
// ==========================================

export const updateProjectValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(150, "Project name must not exceed 150 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  status: z
    .enum(["ACTIVE", "COMPLETED", "ARCHIVED"])
    .optional(),

  teamId: z.coerce
    .number()
    .int()
    .positive("Team ID must be a positive number")
    .optional(),
});

// ==========================================
// TYPES
// ==========================================

export type CreateProjectInput = z.infer<
  typeof createProjectValidation
>;

export type UpdateProjectInput = z.infer<
  typeof updateProjectValidation
>;
