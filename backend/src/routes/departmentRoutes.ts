
import { Router } from "express";

import {
  getAllDepartments,
  getDepartment,
  create,
  update,
  remove,
} from "../controllers/departmentController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

// All department routes require authentication
router.use(authenticate);

// GET /api/departments
router.get("/", getAllDepartments);

// GET /api/departments/:id
router.get("/:id", getDepartment);

// POST /api/departments
router.post("/", create);

// PUT /api/departments/:id
router.put("/:id", update);

// DELETE /api/departments/:id
router.delete("/:id", remove);

export default router;
