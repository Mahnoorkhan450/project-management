import type { Request, Response } from "express";

import {
  getUserSettings,
  updateUserSettings,
} from "../services/settingsService.js";

export const getSettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const settings =
      await getUserSettings(req.user.id);

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error(
      "Get Settings Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
};

export const updateSettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const settings =
      await updateUserSettings(
        req.user.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error(
      "Update Settings Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update settings",
    });
  }
};