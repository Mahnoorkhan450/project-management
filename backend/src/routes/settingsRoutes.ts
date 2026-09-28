import { Router } from "express";

import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";

import { authenticate } from "../middleware/authMiddleware.js";

import { validate } from "../middleware/validationMiddleware.js";

import {
  updateSettingsSchema,
} from "../validations/settingsValidation.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  getSettings
);

router.put(
  "/",
  validate(updateSettingsSchema),
  updateSettings
);

export default router;