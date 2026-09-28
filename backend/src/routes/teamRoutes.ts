import { Router } from "express";

import {
  authenticate,
  requireAdmin,
} from "../middleware/authMiddleware.js";

import { validate } from "../middleware/validationMiddleware.js";

import {
  getAllTeams,
  getTeam,
  create,
  update,
  remove,
  addMember,
  updateMemberRole,
  removeMember,
  getMemberDetails,
  getMyMemberships,
} from "../controllers/teamController.js";

import {
  createTeamValidation,
  updateTeamValidation,
  addTeamMemberValidation,
  updateTeamMemberRoleValidation,
} from "../validations/teamValidation.js";

const router = Router();

router.use(authenticate);

// ==========================================
// CURRENT USER TEAM MEMBERSHIPS
// ==========================================

router.get(
  "/my-memberships",
  getMyMemberships
);

// ==========================================
// TEAMS
// ==========================================

// USER + ADMIN

router.get(
  "/",
  getAllTeams
);

router.get(
  "/:id",
  getTeam
);

// ==========================================
// ADMIN ONLY
// ==========================================

router.post(
  "/",
  requireAdmin,
  validate(createTeamValidation),
  create
);

router.put(
  "/:id",
  requireAdmin,
  validate(updateTeamValidation),
  update
);

router.delete(
  "/:id",
  requireAdmin,
  remove
);

// ==========================================
// TEAM MEMBERS
// ==========================================

// USER + ADMIN

router.get(
  "/:id/members/:userId",
  getMemberDetails
);

// ==========================================
// ADMIN ONLY
// ==========================================

router.post(
  "/:id/members",
  requireAdmin,
  validate(addTeamMemberValidation),
  addMember
);

router.put(
  "/:id/members/:userId",
  requireAdmin,
  validate(
    updateTeamMemberRoleValidation
  ),
  updateMemberRole
);

router.delete(
  "/:id/members/:userId",
  requireAdmin,
  removeMember
);

export default router;