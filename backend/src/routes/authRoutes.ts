import { Router } from "express";

import {
  register,
  login,
  me,
  changePassword,
} from "../controllers/authController.js";

import {
  validate,
} from "../middleware/validationMiddleware.js";

import {
  authenticate,
} from "../middleware/authMiddleware.js";

import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../validations/authValidation.js";

const router = Router();

// ==========================================
// REGISTER
// POST /api/auth/register
// ==========================================

router.post(
  "/register",
  validate(registerSchema),
  register
);

// ==========================================
// LOGIN
// POST /api/auth/login
// ==========================================

router.post(
  "/login",
  validate(loginSchema),
  login
);

// ==========================================
// CURRENT USER
// GET /api/auth/me
// ==========================================

router.get(
  "/me",
  authenticate,
  me
);

// ==========================================
// CHANGE PASSWORD
// PUT /api/auth/change-password
// ==========================================

router.put(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  changePassword
);

export default router;