import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import type { JwtPayload } from "../types/auth.js";

export const generateToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
};