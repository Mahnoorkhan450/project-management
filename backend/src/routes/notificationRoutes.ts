import { Router } from "express";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearNotifications,
} from "../controllers/notificationController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.get("/", getNotifications);

router.patch("/read-all", markAllAsRead);

router.patch("/:id/read", markAsRead);

router.delete("/:id", removeNotification);

router.delete("/", clearNotifications);

export default router;