import { z } from "zod";

export const createTeamValidation = z.object({
name: z
.string()
.trim()
.min(2, "Team name must be at least 2 characters")
.max(100, "Team name must not exceed 100 characters"),

description: z
.string()
.trim()
.max(500, "Description must not exceed 500 characters")
.optional(),

departmentId: z.coerce
.number()
.int()
.positive("Department ID must be a positive number"),
});

export const updateTeamValidation = z.object({
name: z
.string()
.trim()
.min(2, "Team name must be at least 2 characters")
.max(100, "Team name must not exceed 100 characters"),

description: z
.string()
.trim()
.max(500, "Description must not exceed 500 characters")
.optional(),

departmentId: z.coerce
.number()
.int()
.positive("Department ID must be a positive number"),
});

export const addTeamMemberValidation = z.object({
userId: z.coerce
.number()
.int()
.positive("User ID must be a positive number"),

role: z
.enum(["MEMBER", "TEAM_LEAD", "MANAGER"])
.default("MEMBER"),
});

export const updateTeamMemberRoleValidation = z.object({
role: z.enum([
"MEMBER",
"TEAM_LEAD",
"MANAGER",
]),
});
