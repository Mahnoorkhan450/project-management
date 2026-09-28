import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Task title must be at least 2 characters")
    .max(150, "Task title must not exceed 150 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  status: z
    .enum(["TODO", "IN_PROGRESS", "COMPLETED"])
    .optional(),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),

  projectId: z
    .number()
    .int()
    .positive("Project ID must be a positive number"),

  assignedToId: z
    .number()
    .int()
    .positive("Assigned user ID must be a positive number")
    .optional(),

  dueDate: z
    .string()
    .datetime("Due date must be a valid ISO date")
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Task title must be at least 2 characters")
    .max(150, "Task title must not exceed 150 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .nullable()
    .optional(),

  status: z
    .enum(["TODO", "IN_PROGRESS", "COMPLETED"])
    .optional(),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),

  projectId: z
    .number()
    .int()
    .positive("Project ID must be a positive number")
    .optional(),

  assignedToId: z
    .number()
    .int()
    .positive("Assigned user ID must be a positive number")
    .nullable()
    .optional(),

  dueDate: z
    .string()
    .datetime("Due date must be a valid ISO date")
    .nullable()
    .optional(),
});

export type CreateTaskInput = z.infer<
  typeof createTaskSchema
>;

export type UpdateTaskInput = z.infer<
  typeof updateTaskSchema
>;