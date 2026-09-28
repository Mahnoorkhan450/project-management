import type { Request, Response } from "express";

import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearUserNotifications,
} from "../services/notificationService.js";

export const getNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const notifications =
    await getUserNotifications(req.user.id);

  res.status(200).json({
    success: true,
    notifications,
  });
};

export const markAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const notificationId = Number(req.params.id);

  if (
    !Number.isInteger(notificationId) ||
    notificationId <= 0
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid notification ID",
    });
    return;
  }

  await markNotificationAsRead(
    notificationId,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
};

export const markAllAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  await markAllNotificationsAsRead(req.user.id);

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });
};

export const removeNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const notificationId = Number(req.params.id);

  if (
    !Number.isInteger(notificationId) ||
    notificationId <= 0
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid notification ID",
    });
    return;
  }

  await deleteNotification(
    notificationId,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Notification deleted",
  });
};

export const clearNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  await clearUserNotifications(req.user.id);

  res.status(200).json({
    success: true,
    message: "Notifications cleared",
  });
};