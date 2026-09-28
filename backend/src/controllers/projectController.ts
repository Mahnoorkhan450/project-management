
import type { Request, Response } from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/projectService.js";

// ==========================================
// CREATE PROJECT
// ADMIN ONLY
// ==========================================

export const create = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const project = await createProject(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    const statusCode =
      (error as Error & {
        statusCode?: number;
      }).statusCode || 500;

    console.error("Create Project Error:", error);

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

// ==========================================
// GET ALL PROJECTS
// USER + ADMIN
// ==========================================

export const getAll = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const projects = await getProjects(
      req.user.id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==========================================
// GET SINGLE PROJECT
// USER + ADMIN
// ==========================================

export const getOne = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const projectId = Number(req.params.id);

    if (Number.isNaN(projectId)) {
      res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });

      return;
    }

    const project = await getProjectById(
      projectId,
      req.user.id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    const statusCode =
      (error as Error & {
        statusCode?: number;
      }).statusCode || 500;

    console.error("Get Project Error:", error);

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

// ==========================================
// UPDATE PROJECT
// ADMIN + USER
// ==========================================

export const update = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const projectId = Number(req.params.id);

    if (Number.isNaN(projectId)) {
      res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });

      return;
    }

    const project = await updateProject(
      projectId,
      req.user.id,
      req.user.role,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    const statusCode =
      (error as Error & {
        statusCode?: number;
      }).statusCode || 500;

    console.error("Update Project Error:", error);

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

// ==========================================
// DELETE PROJECT
// ADMIN ONLY
// ==========================================

export const remove = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const projectId = Number(req.params.id);

    if (Number.isNaN(projectId)) {
      res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });

      return;
    }

    const result = await deleteProject(
      projectId,
      req.user.id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const statusCode =
      (error as Error & {
        statusCode?: number;
      }).statusCode || 500;

    console.error("Delete Project Error:", error);

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};
