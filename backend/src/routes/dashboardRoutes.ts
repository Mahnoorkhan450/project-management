import { Router } from "express";

import {
  getDashboard,
} from "../controllers/dashboardController.js";

import {
  authenticate,
} from "../middleware/authMiddleware.js";

const router = Router();

/*
 * All dashboard routes require authentication.
 */

router.use(authenticate);

/*
 * GET /api/dashboard
 */

router.get("/", getDashboard);

export default router;