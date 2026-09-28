import type {
  Request,
  Response,
  NextFunction,
} from "express";

interface AppError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", error);

  const statusCode =
    error.statusCode || 500;

  const message =
    statusCode === 500
      ? "Internal server error"
      : error.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
};