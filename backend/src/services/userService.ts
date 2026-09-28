import prisma from "../lib/prisma.js";

import bcrypt from "bcryptjs";

import type { Role } from "../generated/prisma/enums.js";

// ==========================================
// PROFILE USER TYPE
// ==========================================

const profileSelect = {
  id: true,
  name: true,
  email: true,
  role: true,

  departmentId: true,

  department: {
    select: {
      id: true,
      name: true,
    },
  },

  teamMemberships: {
    select: {
      id: true,
      role: true,

      team: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },

  createdAt: true,
  updatedAt: true,
};

// ==========================================
// GET ALL USERS
// ==========================================

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};

// ==========================================
// GET SINGLE USER
// ==========================================

export const getUserById = async (
  userId: number
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    const error = new Error("User not found");

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  return user;
};

// ==========================================
// GET USER DETAILS
// ==========================================

export const getUserDetails = async (
  userId: number
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,

      // --------------------------------------
      // USER DEPARTMENT
      // --------------------------------------

      department: {
        select: {
          id: true,
          name: true,
        },
      },

      // --------------------------------------
      // TEAM MEMBERSHIPS
      // --------------------------------------

      teamMemberships: {
        select: {
          id: true,
          role: true,

          team: {
            select: {
              id: true,
              name: true,

              department: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },

      // --------------------------------------
      // ASSIGNED TASKS
      // --------------------------------------

      assignedTasks: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          dueDate: true,

          project: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  // ----------------------------------------
  // USER NOT FOUND
  // ----------------------------------------

  if (!user) {
    const error = new Error("User not found");

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  // ----------------------------------------
  // TASK STATISTICS
  // ----------------------------------------

  const assigned = user.assignedTasks.length;

  const completed = user.assignedTasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const pending = user.assignedTasks.filter(
    (task) => task.status !== "COMPLETED"
  ).length;

  // ----------------------------------------
  // USER TEAM IDS
  // ----------------------------------------

  const teamIds = user.teamMemberships.map(
    (membership) => membership.team.id
  );

  // ----------------------------------------
  // PROJECTS ASSIGNED THROUGH TEAM
  // ----------------------------------------

  const assignedProjects =
    teamIds.length > 0
      ? await prisma.project.findMany({
          where: {
            teamId: {
              in: teamIds,
            },
          },

          orderBy: {
            createdAt: "desc",
          },

          select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        })
      : [];

  // ----------------------------------------
  // PRIMARY TEAM
  // ----------------------------------------

  const primaryMembership =
    user.teamMemberships[0];

  const teamName =
    primaryMembership?.team?.name ??
    "No team";

  // ----------------------------------------
  // DEPARTMENT
  // ----------------------------------------

  const departmentName =
    primaryMembership?.team?.department?.name ??
    user.department?.name ??
    "No department";

  // ----------------------------------------
  // FINAL RESPONSE
  // ----------------------------------------

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,

    teamName,
    departmentName,

    joinedAt: user.createdAt,

    statistics: {
      assigned,
      completed,
      pending,
    },

    assignedProjects,

    assignedTasks: user.assignedTasks,
  };
};

// ==========================================
// GET OWN PROFILE
// ==========================================

export const getMyProfile = async (
  userId: number
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: profileSelect,
  });

  if (!user) {
    const error = new Error("User not found");

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  return user;
};

// ==========================================
// UPDATE OWN PROFILE
// ==========================================

export const updateMyProfile = async (
  userId: number,
  data: {
    name?: string;
    email?: string;
  }
) => {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!existingUser) {
    const error = new Error("User not found");

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  // Check duplicate email
  if (
    data.email !== undefined &&
    data.email !== existingUser.email
  ) {
    const emailExists =
      await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (emailExists) {
      const error = new Error(
        "Email is already registered"
      );

      (
        error as Error & {
          statusCode?: number;
        }
      ).statusCode = 409;

      throw error;
    }
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      ...(data.name !== undefined && {
        name: data.name,
      }),

      ...(data.email !== undefined && {
        email: data.email,
      }),
    },

    select: profileSelect,
  });

  return user;
};

// ==========================================
// CHANGE OWN PASSWORD
// ==========================================

export const changeMyPassword = async (
  userId: number,
  data: {
    currentPassword: string;
    newPassword: string;
  }
) => {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        password: true,
      },
    });

  if (!existingUser) {
    const error = new Error("User not found");

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  // Verify current password
  const passwordMatches =
    await bcrypt.compare(
      data.currentPassword,
      existingUser.password
    );

  if (!passwordMatches) {
    const error = new Error(
      "Current password is incorrect"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 400;

    throw error;
  }

  // Hash new password
  const hashedPassword =
    await bcrypt.hash(data.newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

// ==========================================
// ADMIN UPDATE USER
// ==========================================

export const updateUser = async (
  userId: number,
  data: {
    name?: string;
    email?: string;
    role?: Role;
  }
) => {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!existingUser) {
    const error = new Error("User not found");

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  // Check duplicate email
  if (
    data.email !== undefined &&
    data.email !== existingUser.email
  ) {
    const emailExists =
      await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (emailExists) {
      const error = new Error(
        "Email is already registered"
      );

      (
        error as Error & {
          statusCode?: number;
        }
      ).statusCode = 409;

      throw error;
    }
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      ...(data.name !== undefined && {
        name: data.name,
      }),

      ...(data.email !== undefined && {
        email: data.email,
      }),

      ...(data.role !== undefined && {
        role: data.role,
      }),
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

// ==========================================
// DELETE USER
// ==========================================

export const deleteUser = async (
  userId: number,
  currentUserId: number
) => {
  // Prevent admin from deleting themselves
  if (userId === currentUserId) {
    const error = new Error(
      "You cannot delete your own account"
    );

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 400;

    throw error;
  }

  const existingUser =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!existingUser) {
    const error = new Error("User not found");

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return {
    message: "User deleted successfully",
  };
};