import type { Request, Response } from "express";

import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  addTeamMember,
  updateTeamMemberRole,
  removeTeamMember,
  getTeamMemberDetails,
  getMyTeamMemberships,
} from "../services/teamService.js";

// ==========================================
// GET ALL TEAMS
// ==========================================

export const getAllTeams = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const teams = await getTeams();

  res.status(200).json({
    success: true,
    data: teams,
  });
};

// ==========================================
// GET MY TEAM MEMBERSHIPS
// ==========================================

export const getMyMemberships = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user!.id;

  const memberships =
    await getMyTeamMemberships(userId);

  res.status(200).json({
    success: true,
    data: memberships,
  });
};

// ==========================================
// GET TEAM
// ==========================================

export const getTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  const team = await getTeamById(id);

  res.status(200).json({
    success: true,
    data: team,
  });
};

// ==========================================
// CREATE TEAM
// ==========================================

export const create = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    name,
    description,
    departmentId,
  } = req.body;

  const team = await createTeam(
    name,
    description,
    departmentId
  );

  res.status(201).json({
    success: true,
    message: "Team created successfully",
    data: team,
  });
};

// ==========================================
// UPDATE TEAM
// ==========================================

export const update = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  const {
    name,
    description,
    departmentId,
  } = req.body;

  const team = await updateTeam(
    id,
    name,
    description,
    departmentId
  );

  res.status(200).json({
    success: true,
    message: "Team updated successfully",
    data: team,
  });
};

// ==========================================
// DELETE TEAM
// ==========================================

export const remove = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = Number(req.params.id);

  await deleteTeam(id);

  res.status(200).json({
    success: true,
    message: "Team deleted successfully",
  });
};

// ==========================================
// ADD MEMBER
// ==========================================

export const addMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  const teamId = Number(req.params.id);

  const {
    userId,
    role,
  } = req.body;

  const member = await addTeamMember(
    teamId,
    userId,
    role
  );

  res.status(201).json({
    success: true,
    message:
      "Member added to team successfully",
    data: member,
  });
};

// ==========================================
// UPDATE MEMBER ROLE
// ==========================================

export const updateMemberRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  const teamId = Number(req.params.id);

  const userId = Number(
    req.params.userId
  );

  const { role } = req.body;

  const member =
    await updateTeamMemberRole(
      teamId,
      userId,
      role
    );

  res.status(200).json({
    success: true,
    message:
      "Team member role updated successfully",
    data: member,
  });
};

// ==========================================
// REMOVE MEMBER
// ==========================================

export const removeMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  const teamId = Number(req.params.id);

  const userId = Number(
    req.params.userId
  );

  await removeTeamMember(
    teamId,
    userId
  );

  res.status(200).json({
    success: true,
    message:
      "Member removed from team successfully",
  });
};

// ==========================================
// GET MEMBER DETAILS
// ==========================================

export const getMemberDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const teamId = Number(req.params.id);

  const userId = Number(
    req.params.userId
  );

  const member =
    await getTeamMemberDetails(
      teamId,
      userId
    );

  res.status(200).json({
    success: true,
    data: member,
  });
};