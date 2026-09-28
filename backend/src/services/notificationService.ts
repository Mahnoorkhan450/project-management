import prisma from "../lib/prisma.js";

interface CreateNotificationData {
  userId: number;
  title: string;
  message: string;
  type?: string;
}

// ==========================================
// CREATE NOTIFICATION
// ==========================================

export const createNotification = async (
  data: CreateNotificationData
) => {
  return prisma.notification.create({
    data: {
      userId: data.userId,
      title: data.title,
      message: data.message,

      ...(data.type !== undefined
        ? { type: data.type }
        : {}),
    },
  });
};

// ==========================================
// GET USER NOTIFICATIONS
// ==========================================

export const getUserNotifications = async (
  userId: number
) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 30,
  });
};

// ==========================================
// MARK ONE NOTIFICATION AS READ
// ==========================================

export const markNotificationAsRead = async (
  notificationId: number,
  userId: number
) => {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      userId,
    },

    data: {
      isRead: true,
    },
  });
};

// ==========================================
// MARK ALL NOTIFICATIONS AS READ
// ==========================================

export const markAllNotificationsAsRead = async (
  userId: number
) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },

    data: {
      isRead: true,
    },
  });
};

// ==========================================
// DELETE ONE NOTIFICATION
// ==========================================

export const deleteNotification = async (
  notificationId: number,
  userId: number
) => {
  return prisma.notification.deleteMany({
    where: {
      id: notificationId,
      userId,
    },
  });
};

// ==========================================
// CLEAR ALL USER NOTIFICATIONS
// ==========================================

export const clearUserNotifications = async (
  userId: number
) => {
  return prisma.notification.deleteMany({
    where: {
      userId,
    },
  });
};