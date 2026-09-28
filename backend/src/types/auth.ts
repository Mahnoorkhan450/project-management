import type { Role } from "../generated/prisma/enums.js";

export interface JwtPayload {
  id: number;
  email: string;
  role: Role;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}