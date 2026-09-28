import api from "@/lib/axios";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type?: string | null;
  isRead: boolean;
  userId: number;
  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
}

export const getNotifications = async (): Promise<Notification[]> => {
  const response =
    await api.get<NotificationsResponse>(
      "/notifications"
    );

  return response.data.notifications;
};

export const markNotificationAsRead = async (
  id: number
): Promise<void> => {
  await api.patch(
    `/notifications/${id}/read`
  );
};

export const markAllNotificationsAsRead =
  async (): Promise<void> => {
    await api.patch(
      "/notifications/read-all"
    );
  };

export const deleteNotification = async (
  id: number
): Promise<void> => {
  await api.delete(
    `/notifications/${id}`
  );
};

export const clearNotifications =
  async (): Promise<void> => {
    await api.delete("/notifications");
  };