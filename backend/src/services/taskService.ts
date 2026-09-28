
import prisma from "../lib/prisma.js";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "../validations/taskValidation.js";
import { createNotification } from "./notificationService.js";

type UserRole = "USER" | "ADMIN";

interface TaskFilters {
  status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  projectId?: number;
  assignedToId?: number;
}

const taskInclude = {
  project: {
    select: {
      id: true,
      name: true,
      status: true,
    },
  },

  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },

  assignedTo: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};

// ==========================================
// ADD TASK PERMISSIONS
// ==========================================

const addTaskPermissions = <
  T extends {
    assignedToId: number | null;
  }
>(
  task: T,
  userId: number,
  role: UserRole
) => {
  return {
    ...task,
    canEdit:
      role === "ADMIN" ||
      task.assignedToId === userId,
    canDelete: role === "ADMIN",
  };
};

// ==========================================
// CREATE TASK
// ADMIN ONLY
// ==========================================

export const createTask = async (
  data: CreateTaskInput,
  userId: number
) => {
  // ========================================
  // CHECK PROJECT
  // ========================================

  const project = await prisma.project.findUnique({
    where: {
      id: data.projectId,
    },
  });

  if (!project) {
    const error = new Error(
      "Project not found"
    ) as Error & {
      statusCode?: number;
    };

    error.statusCode = 404;
    throw error;
  }

  // ========================================
  // CHECK ASSIGNED USER
  // ========================================

  if (data.assignedToId !== undefined) {
    const assignedUser =
      await prisma.user.findUnique({
        where: {
          id: data.assignedToId,
        },
      });

    if (!assignedUser) {
      const error = new Error(
        "Assigned user not found"
      ) as Error & {
        statusCode?: number;
      };

      error.statusCode = 404;
      throw error;
    }
  }

  // ========================================
  // CREATE TASK
  // ========================================

  const task = await prisma.task.create({
    data: {
      title: data.title,
      createdById: userId,
      projectId: data.projectId,

      ...(data.description !== undefined && {
        description: data.description,
      }),

      ...(data.status !== undefined && {
        status: data.status,
      }),

      ...(data.priority !== undefined && {
        priority: data.priority,
      }),

      ...(data.assignedToId !== undefined && {
        assignedToId: data.assignedToId,
      }),

      ...(data.dueDate !== undefined && {
        dueDate: data.dueDate,
      }),
    },

    include: taskInclude,
  });

  // ========================================
  // NOTIFICATION
  // ========================================

  if (
    data.assignedToId !== undefined &&
    data.assignedToId !== userId
  ) {
    await createNotification({
      userId: data.assignedToId,
      title: "New task assigned",
      message: `You have been assigned a new task: ${task.title}`,
      type: "TASK_ASSIGNED",
    });
  }

  return addTaskPermissions(
    task,
    userId,
    "ADMIN"
  );
};

// ==========================================
// GET ALL TASKS
// ADMIN = ALL
// USER = ASSIGNED TASKS ONLY
// ==========================================

export const getTasks = async (
  userId: number,
  role: UserRole,
  filters: TaskFilters = {}
) => {
  const where: Record<string, unknown> = {};

  // ========================================
  // ROLE ACCESS
  // ========================================

  if (role === "ADMIN") {
    // ADMIN can see all tasks
  } else {
    // USER can only see assigned tasks
    where.assignedToId = userId;
  }

  // ========================================
  // STATUS FILTER
  // ========================================

  if (filters.status !== undefined) {
    where.status = filters.status;
  }

  // ========================================
  // PRIORITY FILTER
  // ========================================

  if (filters.priority !== undefined) {
    where.priority = filters.priority;
  }

  // ========================================
  // PROJECT FILTER
  // ========================================

  if (filters.projectId !== undefined) {
    where.projectId = filters.projectId;
  }

  // ========================================
  // ASSIGNED USER FILTER
  // ADMIN ONLY
  // ========================================

  if (
    role === "ADMIN" &&
    filters.assignedToId !== undefined
  ) {
    where.assignedToId =
      filters.assignedToId;
  }

  // ========================================
  // FETCH TASKS
  // ========================================

  const tasks = await prisma.task.findMany({
    where,
    include: taskInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  // ========================================
  // ADD PERMISSIONS
  // ========================================

  return tasks.map((task) =>
    addTaskPermissions(
      task,
      userId,
      role
    )
  );
};

// ==========================================
// GET SINGLE TASK
// ADMIN = ANY TASK
// USER = ASSIGNED TASK ONLY
// ==========================================

export const getTaskById = async (
  taskId: number,
  userId: number,
  role: UserRole
) => {
  const task =
    role === "ADMIN"
      ? await prisma.task.findUnique({
          where: {
            id: taskId,
          },
          include: taskInclude,
        })
      : await prisma.task.findFirst({
          where: {
            id: taskId,
            assignedToId: userId,
          },
          include: taskInclude,
        });

  if (!task) {
    const error = new Error(
      "Task not found or you do not have access to it"
    ) as Error & {
      statusCode?: number;
    };

    error.statusCode = 404;
    throw error;
  }

  // ========================================
  // ADD PERMISSIONS
  // ========================================

  return addTaskPermissions(
    task,
    userId,
    role
  );
};

// ==========================================
// UPDATE TASK
// ADMIN = ANY TASK
// USER = ASSIGNED TASK ONLY
// ==========================================

export const updateTask = async (
  taskId: number,
  userId: number,
  role: UserRole,
  data: UpdateTaskInput
) => {
  // ========================================
  // GET EXISTING TASK
  // ========================================

  const existingTask =
    role === "ADMIN"
      ? await prisma.task.findUnique({
          where: {
            id: taskId,
          },
        })
      : await prisma.task.findFirst({
          where: {
            id: taskId,
            assignedToId: userId,
          },
        });

  if (!existingTask) {
    const error = new Error(
      "Task not found or you do not have permission to update it"
    ) as Error & {
      statusCode?: number;
    };

    error.statusCode = 404;
    throw error;
  }

  // ========================================
  // USER RESTRICTIONS
  // ========================================

  if (role === "USER") {
    // --------------------------------------
    // USER CANNOT CHANGE PROJECT
    // --------------------------------------

    if (data.projectId !== undefined) {
      const error = new Error(
        "You cannot change the task project"
      ) as Error & {
        statusCode?: number;
      };

      error.statusCode = 403;
      throw error;
    }

    // --------------------------------------
    // USER CANNOT ASSIGN / REASSIGN
    // --------------------------------------

    if (
      Object.prototype.hasOwnProperty.call(
        data,
        "assignedToId"
      )
    ) {
      const error = new Error(
        "You cannot assign or reassign tasks"
      ) as Error & {
        statusCode?: number;
      };

      error.statusCode = 403;
      throw error;
    }
  }

  // ========================================
  // ADMIN VALIDATION
  // ========================================

  if (role === "ADMIN") {
    // --------------------------------------
    // VALIDATE PROJECT
    // --------------------------------------

    if (data.projectId !== undefined) {
      const project =
        await prisma.project.findUnique({
          where: {
            id: data.projectId,
          },
        });

      if (!project) {
        const error = new Error(
          "Project not found"
        ) as Error & {
          statusCode?: number;
        };

        error.statusCode = 404;
        throw error;
      }
    }

    // --------------------------------------
    // VALIDATE ASSIGNED USER
    // --------------------------------------

    if (
      data.assignedToId !== undefined &&
      data.assignedToId !== null
    ) {
      const assignedUser =
        await prisma.user.findUnique({
          where: {
            id: data.assignedToId,
          },
        });

      if (!assignedUser) {
        const error = new Error(
          "Assigned user not found"
        ) as Error & {
          statusCode?: number;
        };

        error.statusCode = 404;
        throw error;
      }
    }
  }

  // ========================================
  // BUILD UPDATE DATA
  // ========================================

  const updateData: {
    title?: string;
    description?: string | null;
    status?:
      | "TODO"
      | "IN_PROGRESS"
      | "COMPLETED";
    priority?:
      | "LOW"
      | "MEDIUM"
      | "HIGH";
    projectId?: number;
    assignedToId?: number | null;
    dueDate?: string | null;
  } = {};

  // ========================================
  // TITLE
  // ========================================

  if (data.title !== undefined) {
    updateData.title = data.title;
  }

  // ========================================
  // DESCRIPTION
  // ========================================

  if (data.description !== undefined) {
    updateData.description =
      data.description;
  }

  // ========================================
  // STATUS
  // ========================================

  if (data.status !== undefined) {
    updateData.status = data.status;
  }

  // ========================================
  // PRIORITY
  // ========================================

  if (data.priority !== undefined) {
    updateData.priority = data.priority;
  }

  // ========================================
  // PROJECT
  // ========================================

  if (data.projectId !== undefined) {
    updateData.projectId =
      data.projectId;
  }

  // ========================================
  // ASSIGNED USER
  // ========================================

  if (
    Object.prototype.hasOwnProperty.call(
      data,
      "assignedToId"
    ) &&
    data.assignedToId !== undefined
  ) {
    updateData.assignedToId =
      data.assignedToId;
  }

  // ========================================
  // DUE DATE
  // ========================================

  if (data.dueDate !== undefined) {
    updateData.dueDate =
      data.dueDate;
  }

  // ========================================
  // UPDATE TASK
  // ========================================

  const task = await prisma.task.update({
    where: {
      id: taskId,
    },

    data: updateData,

    include: taskInclude,
  });

  // ========================================
  // NOTIFICATION ON REASSIGNMENT
  // ========================================

  if (
    role === "ADMIN" &&
    Object.prototype.hasOwnProperty.call(
      data,
      "assignedToId"
    ) &&
    data.assignedToId !==
      existingTask.assignedToId &&
    data.assignedToId !== null &&
    data.assignedToId !== undefined
  ) {
    await createNotification({
      userId: data.assignedToId,
      title: "Task assigned to you",
      message: `You have been assigned a task: ${task.title}`,
      type: "TASK_ASSIGNED",
    });
  }

  // ========================================
  // RETURN WITH PERMISSIONS
  // ========================================

  return addTaskPermissions(
    task,
    userId,
    role
  );
};

// ==========================================
// DELETE TASK
// ADMIN ONLY
// ==========================================

export const deleteTask = async (
  taskId: number,
  userId: number,
  role: UserRole
) => {
  // ========================================
  // ADMIN CHECK
  // ========================================

  if (role !== "ADMIN") {
    const error = new Error(
      "Admin access required"
    ) as Error & {
      statusCode?: number;
    };

    error.statusCode = 403;
    throw error;
  }

  // ========================================
  // CHECK TASK
  // ========================================

  const existingTask =
    await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

  if (!existingTask) {
    const error = new Error(
      "Task not found"
    ) as Error & {
      statusCode?: number;
    };

    error.statusCode = 404;
    throw error;
  }

  // ========================================
  // DELETE TASK
  // ========================================

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return {
    message: "Task deleted successfully",
  };
};
