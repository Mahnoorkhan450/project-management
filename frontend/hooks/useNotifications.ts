
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearNotifications,
  type Notification,
} from "@/services/notificationService";

export default function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // Load notifications
  const loadNotifications =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getNotifications();

        setNotifications(data);

        return data;
      } catch (err: any) {
        console.error(
          "Failed to load notifications:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to load notifications.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    }, []);

  // Initial load
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Mark one as read
  const markAsRead = useCallback(
    async (id: number) => {
      try {
        setActionLoading(true);
        setError("");

        await markNotificationAsRead(id);

        setNotifications(
          (previous) =>
            previous.map((notification) =>
              notification.id === id
                ? {
                    ...notification,
                    isRead: true,
                  }
                : notification
            )
        );
      } catch (err: any) {
        console.error(
          "Failed to mark notification as read:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to update notification.";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    []
  );

  // Mark all as read
  const markAllAsRead =
    useCallback(async () => {
      try {
        setActionLoading(true);
        setError("");

        await markAllNotificationsAsRead();

        setNotifications(
          (previous) =>
            previous.map(
              (notification) => ({
                ...notification,
                isRead: true,
              })
            )
        );
      } catch (err: any) {
        console.error(
          "Failed to mark all notifications as read:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to update notifications.";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    }, []);

  // Delete one notification
  const removeNotification =
    useCallback(async (id: number) => {
      try {
        setActionLoading(true);
        setError("");

        await deleteNotification(id);

        setNotifications(
          (previous) =>
            previous.filter(
              (notification) =>
                notification.id !== id
            )
        );
      } catch (err: any) {
        console.error(
          "Failed to delete notification:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to delete notification.";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    }, []);

  // Clear all notifications
  const clearAll =
    useCallback(async () => {
      try {
        setActionLoading(true);
        setError("");

        await clearNotifications();

        setNotifications([]);
      } catch (err: any) {
        console.error(
          "Failed to clear notifications:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to clear notifications.";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    }, []);

  // Unread count
  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;

  // Clear error
  const clearError =
    useCallback(() => {
      setError("");
    }, []);

  return {
    notifications,

    unreadCount,

    loading,
    actionLoading,
    error,

    loadNotifications,

    markAsRead,
    markAllAsRead,

    removeNotification,
    clearAll,

    clearError,
  };
}
