
import prisma from "../lib/prisma.js";

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
};

const teamInclude = {
  department: {
    select: {
      id: true,
      name: true,
    },
  },

  members: {
    include: {
      user: {
        select: userSelect,
      },
    },

    orderBy: {
      createdAt: "asc" as const,
    },
  },

  _count: {
    select: {
      members: true,
      projects: true,
    },
  },
};

// ==========================================
// GET ALL TEAMS
// ==========================================

export const getTeams = async () => {
  return prisma.team.findMany({
    include: teamInclude,

    orderBy: {
      name: "asc",
    },
  });
};

// ==========================================
// GET TEAM BY ID
// ==========================================

export const getTeamById = async (id: number) => {
  const team = await prisma.team.findUnique({
    where: { id },
    include: teamInclude,
  });

  if (!team) {
    const error = new Error("Team not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return team;
};

// ==========================================
// CREATE TEAM
// ==========================================

export const createTeam = async (
  name: string,
  description: string | undefined,
  departmentId: number
) => {
  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!department) {
    const error = new Error("Department not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return prisma.team.create({
    data: {
      name,
      description: description || null,
      departmentId,
    },

    include: teamInclude,
  });
};

// ==========================================
// UPDATE TEAM
// ==========================================

export const updateTeam = async (
  id: number,
  name: string,
  description: string | undefined,
  departmentId: number
) => {
  const team = await prisma.team.findUnique({
    where: { id },
  });

  if (!team) {
    const error = new Error("Team not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!department) {
    const error = new Error("Department not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return prisma.team.update({
    where: { id },

    data: {
      name,
      description: description || null,
      departmentId,
    },

    include: teamInclude,
  });
};

// ==========================================
// DELETE TEAM
// ==========================================

export const deleteTeam = async (id: number) => {
  const team = await prisma.team.findUnique({
    where: { id },
  });

  if (!team) {
    const error = new Error("Team not found");

    (
      error as Error & {
        statusCode?: number;
      }
    ).statusCode = 404;

    throw error;
  }

  return prisma.$transaction(async (tx) => {
    // Remove all members from this team
    await tx.teamMember.deleteMany({
      where: {
        teamId: id,
      },
    });

    // Keep projects, but remove their team assignment
    await tx.project.updateMany({
      where: {
        teamId: id,
      },
      data: {
        teamId: null,
      },
    });

    // Delete the team
    return tx.team.delete({
      where: {
        id,
      },
    });
  });
};

// ==========================================
// ADD TEAM MEMBER
// ==========================================

export const addTeamMember = async (
  teamId: number,
  userId: number,
  role: "MEMBER" | "TEAM_LEAD" | "MANAGER"
) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
  });

  if (!team) {
    const error = new Error("Team not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    const error = new Error("User not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  const existing = await prisma.teamMember.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });

  if (existing) {
    const error = new Error(
      "User is already a member of this team"
    );

    (error as Error & { statusCode?: number }).statusCode = 409;

    throw error;
  }

  return prisma.teamMember.create({
    data: {
      userId,
      teamId,
      role,
    },

    include: {
      user: {
        select: userSelect,
      },

      team: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

// ==========================================
// UPDATE TEAM MEMBER ROLE
// ==========================================

export const updateTeamMemberRole = async (
  teamId: number,
  userId: number,
  role: "MEMBER" | "TEAM_LEAD" | "MANAGER"
) => {
  const member = await prisma.teamMember.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });

  if (!member) {
    const error = new Error("Team member not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return prisma.teamMember.update({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },

    data: {
      role,
    },

    include: {
      user: {
        select: userSelect,
      },

      team: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

// ==========================================
// REMOVE TEAM MEMBER
// ==========================================

export const removeTeamMember = async (
  teamId: number,
  userId: number
) => {
  const member = await prisma.teamMember.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });

  if (!member) {
    const error = new Error("Team member not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return prisma.teamMember.delete({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });
};

// ==========================================
// GET TEAM MEMBER DETAILS
// ==========================================

export const getTeamMemberDetails = async (
  teamId: number,
  userId: number
) => {
  const member = await prisma.teamMember.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },

      team: {
        select: {
          id: true,
          name: true,
          description: true,
          department: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!member) {
    const error = new Error("Team member not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  const [
    assignedTasks,
    completedTasks,
    pendingTasks,
    projects,
  ] = await Promise.all([
    prisma.task.count({
      where: {
        assignedToId: userId,
      },
    }),

    prisma.task.count({
      where: {
        assignedToId: userId,
        status: "COMPLETED",
      },
    }),

    prisma.task.count({
      where: {
        assignedToId: userId,
        status: {
          not: "COMPLETED",
        },
      },
    }),

    prisma.project.findMany({
      where: {
        teamId,
        tasks: {
          some: {
            assignedToId: userId,
          },
        },
      },

      select: {
        id: true,
        name: true,
        status: true,
      },

      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return {
    id: member.id,
    userId: member.userId,
    teamId: member.teamId,
    teamRole: member.role,
    joinedAt: member.createdAt,

    user: member.user,
    team: member.team,

    statistics: {
      assignedTasks,
      completedTasks,
      pendingTasks,
    },

    projects,
  };
};
// ==========================================
// GET CURRENT USER TEAM MEMBERSHIPS
// ==========================================

export const getMyTeamMemberships = async (
  userId: number
) => {
  return prisma.teamMember.findMany({
    where: {
      userId,
    },

    include: {
      team: {
        select: {
          id: true,
          name: true,
          description: true,

          department: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};