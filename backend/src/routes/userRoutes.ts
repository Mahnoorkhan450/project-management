import { Router } from "express";

import {
  getAll,
  getOne,
  getDetails,
  getProfile,
  updateProfile,
  changePassword,
  update,
  remove,
} from "../controllers/userController.js";

import { authenticate } from "../middleware/authMiddleware.js";

import { authorizeAdmin } from "../middleware/roleMiddleware.js";

import { validate } from "../middleware/validationMiddleware.js";

import {
  updateUserSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../validations/userValidation.js";

const router = Router();

/*
 * All user routes require login.
 */
router.use(authenticate);

// ==========================================
// MY PROFILE
// ==========================================

router.get(
  "/profile",
  getProfile
);

router.put(
  "/profile",
  validate(updateProfileSchema),
  updateProfile
);

router.patch(
  "/profile/password",
  validate(changePasswordSchema),
  changePassword
);

// ==========================================
// ALL USERS
// ==========================================

/*
 * Any logged-in user can view
 * the basic user list.
 *
 * Required for:
 * - Add Member
 * - Team member selection
 */
router.get("/", getAll);

// ==========================================
// ADMIN ONLY
// ==========================================

router.use(authorizeAdmin);

// ==========================================
// GET USER DETAILS
// ==========================================

router.get(
  "/:id/details",
  getDetails
);

// ==========================================
// GET SINGLE USER
// ==========================================

router.get(
  "/:id",
  getOne
);

// ==========================================
// UPDATE USER
// ==========================================

router.put(
  "/:id",
  validate(updateUserSchema),
  update
);

// ==========================================
// DELETE USER
// ==========================================

router.delete(
  "/:id",
  remove
);

export default router;