import prisma from "../lib/prisma.js";
import type {
CreateProjectInput,
UpdateProjectInput,
} from "../validations/projectValidation.js";

type UserRole = "USER" | "ADMIN";

// ==========================================
// CREATE PROJECT
// ADMIN ONLY
// ==========================================

export const createProject = async (
data: CreateProjectInput,
userId: number
) => {
if (data.teamId !== undefined) {
const team = await prisma.team.findUnique({
where: {
id: data.teamId,
},
});

if (!team) {
  const error = new Error(
    "Selected team does not exist"
  ) as Error & { statusCode?: number };

  error.statusCode = 404;
  throw error;
}

}

const project = await prisma.project.create({
data: {
name: data.name,
createdById: userId,

  ...(data.description !== undefined && {
    description: data.description,
  }),

  ...(data.status !== undefined && {
    status: data.status,
  }),

  ...(data.teamId !== undefined && {
    teamId: data.teamId,
  }),
},

include: {
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
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

return {
...project,
canEdit: true,
canDelete: true,
};
};

// ==========================================
// GET ALL PROJECTS
// USER + ADMIN
// ==========================================

export const getProjects = async (
userId: number,
role: UserRole
) => {
const projects = await prisma.project.findMany({
include: {
createdBy: {
select: {
id: true,
name: true,
email: true,
},
},

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

      members: {
        where: {
          userId,
        },

        select: {
          id: true,
        },
      },
    },
  },

  _count: {
    select: {
      tasks: true,
    },
  },
},

orderBy: {
  createdAt: "desc",
},

});

return projects.map((project) => {
const isTeamMember =
(project.team?.members?.length ?? 0) > 0;

return {
  ...project,

  canEdit:
    role === "ADMIN" || isTeamMember,

  canDelete:
    role === "ADMIN",

  team: project.team
    ? {
        id: project.team.id,
        name: project.team.name,
        department: project.team.department,
      }
    : null,
};

});
};

// ==========================================
// GET SINGLE PROJECT
// USER + ADMIN
// ==========================================

export const getProjectById = async (
projectId: number,
userId: number,
role: UserRole
) => {
const project = await prisma.project.findUnique({
where: {
id: projectId,
},

include: {
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
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

      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  },

  tasks:
    role === "ADMIN"
      ? {
          orderBy: {
            createdAt: "desc",
          },
        }
      : {
          where: {
            assignedToId: userId,
          },

          orderBy: {
            createdAt: "desc",
          },
        },

  _count: {
    select: {
      tasks: true,
    },
  },
},

});

if (!project) {
const error = new Error(
"Project not found"
) as Error & { statusCode?: number };

error.statusCode = 404;
throw error;

}

const canEdit =
role === "ADMIN" ||
!!project.team?.members.some(
(member) => member.user.id === userId
);

const canDelete =
role === "ADMIN";

return {
...project,
canEdit,
canDelete,
};
};

// ==========================================
// UPDATE PROJECT
// ADMIN + ASSIGNED USER
// ==========================================

export const updateProject = async (
projectId: number,
userId: number,
role: UserRole,
data: UpdateProjectInput
) => {
// ========================================
// ADMIN
// ========================================

if (role === "ADMIN") {
if (data.teamId !== undefined) {
const team = await prisma.team.findUnique({
where: {
id: data.teamId,
},
});

  if (!team) {
    const error = new Error(
      "Selected team does not exist"
    ) as Error & { statusCode?: number };

    error.statusCode = 404;
    throw error;
  }
}

const existingProject =
  await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

if (!existingProject) {
  const error = new Error(
    "Project not found"
  ) as Error & { statusCode?: number };

  error.statusCode = 404;
  throw error;
}

const project =
  await prisma.project.update({
    where: {
      id: projectId,
    },

    data: {
      ...(data.name !== undefined && {
        name: data.name,
      }),

      ...(data.description !== undefined && {
        description: data.description,
      }),

      ...(data.status !== undefined && {
        status: data.status,
      }),

      ...(data.teamId !== undefined && {
        teamId: data.teamId,
      }),
    },

    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

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

      _count: {
        select: {
          tasks: true,
        },
      },
    },
  });

return {
  ...project,
  canEdit: true,
  canDelete: true,
};

}

// ========================================
// USER
// ========================================

const existingProject =
await prisma.project.findUnique({
where: {
id: projectId,
},

  select: {
    id: true,
    teamId: true,
  },
});

if (!existingProject) {
const error = new Error(
"Project not found"
) as Error & { statusCode?: number };

error.statusCode = 404;
throw error;

}

if (!existingProject.teamId) {
const error = new Error(
"You are not assigned to this project"
) as Error & { statusCode?: number };

error.statusCode = 403;
throw error;

}

const membership =
await prisma.teamMember.findFirst({
where: {
teamId: existingProject.teamId,
userId,
},
});

if (!membership) {
const error = new Error(
"You are not assigned to this project"
) as Error & { statusCode?: number };

error.statusCode = 403;
throw error;

}

// USER CANNOT CHANGE TEAM

if (data.teamId !== undefined) {
const error = new Error(
"You cannot change the project team"
) as Error & { statusCode?: number };

error.statusCode = 403;
throw error;

}

const project =
await prisma.project.update({
where: {
id: projectId,
},

  data: {
    ...(data.name !== undefined && {
      name: data.name,
    }),

    ...(data.description !== undefined && {
      description: data.description,
    }),

    ...(data.status !== undefined && {
      status: data.status,
    }),
  },

  include: {
    createdBy: {
      select: {
        id: true,
        name: true,
        email: true,
      },
    },

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

    _count: {
      select: {
        tasks: true,
      },
    },
  },
});

return {
...project,
canEdit: true,
canDelete: false,
};
};

// ==========================================
// DELETE PROJECT
// ADMIN ONLY
// ==========================================

export const deleteProject = async (
projectId: number,
userId: number,
role: UserRole
) => {
if (role !== "ADMIN") {
const error = new Error(
"Admin access required"
) as Error & { statusCode?: number };

error.statusCode = 403;
throw error;

}

const existingProject =
await prisma.project.findUnique({
where: {
id: projectId,
},
});

if (!existingProject) {
const error = new Error(
"Project not found"
) as Error & { statusCode?: number };

error.statusCode = 404;
throw error;

}

await prisma.project.delete({
where: {
id: projectId,
},
});

return {
message: "Project deleted successfully",
};
};