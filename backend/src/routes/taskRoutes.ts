
import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/taskController.js";

import {
  authenticate,
  requireAdmin,
} from "../middleware/authMiddleware.js";

import { validate } from "../middleware/validationMiddleware.js";

import {
  createTaskSchema,
  updateTaskSchema,
} from "../validations/taskValidation.js";

const router = Router();

router.use(authenticate);

// ==========================================
// VIEW TASKS
// USER + ADMIN
// ==========================================

router.get("/", getAll);

router.get("/:id", getOne);

// ==========================================
// CREATE TASK
// ADMIN ONLY
// ==========================================

router.post(
  "/",
  requireAdmin,
  validate(createTaskSchema),
  create
);

// ==========================================
// UPDATE TASK
// ADMIN + ASSIGNED USER
// ==========================================

router.put(
  "/:id",
  validate(updateTaskSchema),
  update
);

// ==========================================
// DELETE TASK
// ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  requireAdmin,
  remove
);

export default router;
