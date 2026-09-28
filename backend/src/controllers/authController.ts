import type {
  Request,
  Response,
} from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  changeUserPassword,
} from "../services/authService.js";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result =
      await registerUser(req.body);

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    const statusCode =
      (
        error as Error & {
          statusCode?: number;
        }
      ).statusCode || 500;

    console.error(
      "Register Error:",
      error
    );

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result =
      await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    const statusCode =
      (
        error as Error & {
          statusCode?: number;
        }
      ).statusCode || 500;

    console.error(
      "Login Error:",
      error
    );

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

export const me = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });

      return;
    }

    const user =
      await getCurrentUser(
        req.user.id
      );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    const statusCode =
      (
        error as Error & {
          statusCode?: number;
        }
      ).statusCode || 500;

    console.error(
      "Get Current User Error:",
      error
    );

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });

      return;
    }

    await changeUserPassword(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (error) {
    const statusCode =
      (
        error as Error & {
          statusCode?: number;
        }
      ).statusCode || 500;

    console.error(
      "Change Password Error:",
      error
    );

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};