import type {
  Request,
  Response,
  NextFunction,
} from "express";
import jwt, { type JwtPayload as JsonWebTokenPayload } from "jsonwebtoken";

import { JWT_SECRET } from "../config/env.js";
import prisma from "../lib/prisma.js";

import type { JwtPayload } from "../types/auth.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });

      return;
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication format",
      });

      return;
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    // jwt.verify can return string | JwtPayload.
    // We need to verify that it contains our custom fields.
    if (
      typeof decoded === "string" ||
      !("id" in decoded) ||
      !("email" in decoded) ||
      !("role" in decoded)
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });

      return;
    }

    const payload: JwtPayload = {
      id: Number(decoded.id),
      email: String(decoded.email),
      role: decoded.role as JwtPayload["role"],
    };

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User no longer exists",
      });

      return;
    }

    // Attach authenticated user to request
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    next();
  } catch (error) {
    console.error("Authentication Error:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }

  if (req.user.role !== "ADMIN") {
    res.status(403).json({
      success: false,
      message: "Admin access required",
    });

    return;
  }

  next();
};

