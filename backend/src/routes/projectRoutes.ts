
import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/projectController.js";

import {
  authenticate,
  requireAdmin,
} from "../middleware/authMiddleware.js";

import { validate } from "../middleware/validationMiddleware.js";

import {
  createProjectValidation,
  updateProjectValidation,
} from "../validations/projectValidation.js";

const router = Router();

router.use(authenticate);

// ==========================================
// VIEW PROJECTS
// USER + ADMIN
// ==========================================

router.get("/", getAll);

router.get("/:id", getOne);

// ==========================================
// CREATE PROJECT
// ADMIN ONLY
// ==========================================

router.post(
  "/",
  requireAdmin,
  validate(createProjectValidation),
  create
);

// ==========================================
// UPDATE PROJECT
// ADMIN + ASSIGNED USER
// ==========================================

router.put(
  "/:id",
  validate(updateProjectValidation),
  update
);

// ==========================================
// DELETE PROJECT
// ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  requireAdmin,
  remove
);

export default router;
