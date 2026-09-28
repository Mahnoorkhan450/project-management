
import type { Request, Response } from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/taskService.js";

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

    const task = await createTask(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    const statusCode =
      (error as Error & {
        statusCode?: number;
      }).statusCode || 500;

    console.error("Create Task Error:", error);

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

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

    const statusParam = req.query.status;
    const priorityParam = req.query.priority;
    const projectIdParam = req.query.projectId;
    const assignedToIdParam =
      req.query.assignedToId;

    const validStatuses = [
      "TODO",
      "IN_PROGRESS",
      "COMPLETED",
    ] as const;

    const validPriorities = [
      "LOW",
      "MEDIUM",
      "HIGH",
    ] as const;

    const filters: {
      status?:
        | "TODO"
        | "IN_PROGRESS"
        | "COMPLETED";
      priority?:
        | "LOW"
        | "MEDIUM"
        | "HIGH";
      projectId?: number;
      assignedToId?: number;
    } = {};

    if (statusParam !== undefined) {
      if (
        typeof statusParam !== "string" ||
        !validStatuses.includes(
          statusParam as
            | "TODO"
            | "IN_PROGRESS"
            | "COMPLETED"
        )
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid status. Allowed values: TODO, IN_PROGRESS, COMPLETED",
        });

        return;
      }

      filters.status = statusParam as
        | "TODO"
        | "IN_PROGRESS"
        | "COMPLETED";
    }

    if (priorityParam !== undefined) {
      if (
        typeof priorityParam !== "string" ||
        !validPriorities.includes(
          priorityParam as
            | "LOW"
            | "MEDIUM"
            | "HIGH"
        )
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid priority. Allowed values: LOW, MEDIUM, HIGH",
        });

        return;
      }

      filters.priority = priorityParam as
        | "LOW"
        | "MEDIUM"
        | "HIGH";
    }

    if (projectIdParam !== undefined) {
      if (typeof projectIdParam !== "string") {
        res.status(400).json({
          success: false,
          message: "Invalid project ID",
        });

        return;
      }

      const projectId = Number(projectIdParam);

      if (
        !Number.isInteger(projectId) ||
        projectId <= 0
      ) {
        res.status(400).json({
          success: false,
          message:
            "Project ID must be a positive integer",
        });

        return;
      }

      filters.projectId = projectId;
    }

    if (assignedToIdParam !== undefined) {
      if (
        typeof assignedToIdParam !== "string"
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid assigned user ID",
        });

        return;
      }

      const assignedToId = Number(
        assignedToIdParam
      );

      if (
        !Number.isInteger(assignedToId) ||
        assignedToId <= 0
      ) {
        res.status(400).json({
          success: false,
          message:
            "Assigned user ID must be a positive integer",
        });

        return;
      }

      filters.assignedToId = assignedToId;
    }

    const tasks = await getTasks(
      req.user.id,
      req.user.role,
      filters
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      filters,
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

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

    const taskId = Number(req.params.id);

    if (
      !Number.isInteger(taskId) ||
      taskId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });

      return;
    }

    const task = await getTaskById(
      taskId,
      req.user.id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    const statusCode =
      (error as Error & {
        statusCode?: number;
      }).statusCode || 500;

    console.error("Get Task Error:", error);

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

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

    const taskId = Number(req.params.id);

    if (
      !Number.isInteger(taskId) ||
      taskId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });

      return;
    }

    const task = await updateTask(
      taskId,
      req.user.id,
      req.user.role,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    const statusCode =
      (error as Error & {
        statusCode?: number;
      }).statusCode || 500;

    console.error("Update Task Error:", error);

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};

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

    const taskId = Number(req.params.id);

    if (
      !Number.isInteger(taskId) ||
      taskId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });

      return;
    }

    const result = await deleteTask(
      taskId,
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

    console.error("Delete Task Error:", error);

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Internal server error"
          : (error as Error).message,
    });
  }
};
