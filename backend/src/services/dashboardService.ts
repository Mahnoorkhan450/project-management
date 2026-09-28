
import prisma from "../lib/prisma.js";

type UserRole = "USER" | "ADMIN";

export const getDashboardStats = async (
  userId: number,
  role: UserRole
) => {
  // USER and ADMIN can view all projects on dashboard.
  // Project edit permissions are handled separately in project services.
  const projectWhere = {};

  // Tasks remain user-specific.
  // USER sees tasks they created or are assigned to.
  // ADMIN sees all tasks.
  const taskWhere =
    role === "ADMIN"
      ? {}
      : {
          OR: [
            {
              createdById: userId,
            },
            {
              assignedToId: userId,
            },
          ],
        };

  const now = new Date();

  const sevenDaysFromNow = new Date(now);

  sevenDaysFromNow.setDate(
    sevenDaysFromNow.getDate() + 7
  );

  const [
    totalProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    highPriorityTasks,
    dueSoonTasks,
    projects,
    myTasks,
    deadlines,
    recentTasks,
    recentProjects,
  ] = await Promise.all([
    // ==========================================
    // TOTAL PROJECTS
    // ==========================================

    prisma.project.count({
      where: projectWhere,
    }),

    // ==========================================
    // TOTAL TASKS
    // ==========================================

    prisma.task.count({
      where: taskWhere,
    }),

    // ==========================================
    // TODO TASKS
    // ==========================================

    prisma.task.count({
      where: {
        AND: [
          taskWhere,
          {
            status: "TODO",
          },
        ],
      },
    }),

    // ==========================================
    // IN PROGRESS TASKS
    // ==========================================

    prisma.task.count({
      where: {
        AND: [
          taskWhere,
          {
            status: "IN_PROGRESS",
          },
        ],
      },
    }),

    // ==========================================
    // COMPLETED TASKS
    // ==========================================

    prisma.task.count({
      where: {
        AND: [
          taskWhere,
          {
            status: "COMPLETED",
          },
        ],
      },
    }),

    // ==========================================
    // HIGH PRIORITY TASKS
    // ==========================================

    prisma.task.count({
      where: {
        AND: [
          taskWhere,
          {
            priority: "HIGH",
          },
          {
            status: {
              not: "COMPLETED",
            },
          },
        ],
      },
    }),

    // ==========================================
    // TASKS DUE SOON
    // ==========================================

    prisma.task.count({
      where: {
        AND: [
          taskWhere,
          {
            status: {
              not: "COMPLETED",
            },
          },
          {
            dueDate: {
              gte: now,
              lte: sevenDaysFromNow,
            },
          },
        ],
      },
    }),

    // ==========================================
    // PROJECTS
    // ==========================================

    prisma.project.findMany({
      where: projectWhere,
      orderBy: {
        updatedAt: "desc",
      },
      take: 6,
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
        updatedAt: true,

        team: {
          select: {
            id: true,
            name: true,

            _count: {
              select: {
                members: true,
              },
            },
          },
        },

        tasks: {
          select: {
            status: true,
          },
        },
      },
    }),

    // ==========================================
    // MY TASKS
    // ==========================================

    prisma.task.findMany({
      where: taskWhere,
      orderBy: [
        {
          dueDate: "asc",
        },
        {
          updatedAt: "desc",
        },
      ],
      take: 6,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        dueDate: true,
        createdAt: true,
        updatedAt: true,

        project: {
          select: {
            id: true,
            name: true,
          },
        },

        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),

    // ==========================================
    // UPCOMING DEADLINES
    // ==========================================

    prisma.task.findMany({
      where: {
        AND: [
          taskWhere,
          {
            status: {
              not: "COMPLETED",
            },
          },
          {
            dueDate: {
              not: null,
            },
          },
        ],
      },
      orderBy: {
        dueDate: "asc",
      },
      take: 6,
      select: {
        id: true,
        title: true,
        priority: true,
        status: true,
        dueDate: true,

        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),

    // ==========================================
    // RECENT TASK ACTIVITY
    // ==========================================

    prisma.task.findMany({
      where: taskWhere,
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,

        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),

    // ==========================================
    // RECENT PROJECT ACTIVITY
    // ==========================================

    prisma.project.findMany({
      where: projectWhere,
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        updatedAt: true,

        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
  ]);

  // ==========================================
  // TEAM MEMBERS
  // ==========================================

  const teamMembers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  // ==========================================
  // COMPLETION PERCENTAGE
  // ==========================================

  const completion =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // ==========================================
  // TASK DISTRIBUTION
  // ==========================================

  const taskDistribution = {
    TODO: todoTasks,
    IN_PROGRESS: inProgressTasks,
    COMPLETED: completedTasks,
  };

  // ==========================================
  // FORMAT PROJECTS
  // ==========================================

  const formattedProjects = projects.map(
    (project) => {
      const totalProjectTasks =
        project.tasks.length;

      const completedProjectTasks =
        project.tasks.filter(
          (task) =>
            task.status === "COMPLETED"
        ).length;

      const progress =
        totalProjectTasks === 0
          ? 0
          : Math.round(
              (completedProjectTasks /
                totalProjectTasks) *
                100
            );

      return {
        id: project.id,
        name: project.name,
        status: project.status,
        progress,
        totalTasks: totalProjectTasks,
        completedTasks:
          completedProjectTasks,
        members:
          project.team?._count.members ?? 0,
        teamName:
          project.team?.name ?? null,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      };
    }
  );

  // ==========================================
  // ACTIVITY
  // ==========================================

  const activity = [
    ...recentTasks.map((task) => ({
      id: `task-${task.id}`,
      type: "TASK" as const,
      title: task.title,
      status: task.status,
      user: task.createdBy,
      date: task.updatedAt,
    })),

    ...recentProjects.map((project) => ({
      id: `project-${project.id}`,
      type: "PROJECT" as const,
      title: project.name,
      status: null,
      user: project.createdBy,
      date: project.updatedAt,
    })),
  ]
    .sort(
      (first, second) =>
        new Date(second.date).getTime() -
        new Date(first.date).getTime()
    )
    .slice(0, 8);

  // ==========================================
  // FINAL DASHBOARD RESPONSE
  // ==========================================

  return {
    stats: {
      projects: totalProjects,
      tasks: totalTasks,
      teamMembers: teamMembers.length,
      members: teamMembers,
      completion,
      highPriority: highPriorityTasks,
      dueSoon: dueSoonTasks,
    },

    taskDistribution,

    projects: formattedProjects,

    myTasks,

    deadlines,

    activity,
  };
};
