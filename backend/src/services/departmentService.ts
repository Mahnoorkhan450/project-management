import prisma from "../lib/prisma.js";

export const getDepartments = async () => {
  return prisma.department.findMany({
    include: {
      _count: {
        select: {
          members: true,
          teams: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getDepartmentById = async (id: number) => {
  const department = await prisma.department.findUnique({
    where: { id },
    include: {
      members: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      teams: {
        include: {
          _count: {
            select: {
              members: true,
            },
          },
        },
      },
    },
  });

  if (!department) {
    const error = new Error("Department not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  return department;
};

export const createDepartment = async (
  name: string,
  description?: string
) => {
  const existing = await prisma.department.findUnique({
    where: { name },
  });

  if (existing) {
    const error = new Error(
      "Department with this name already exists"
    );

    (error as Error & { statusCode?: number }).statusCode = 409;

    throw error;
  }

  return prisma.department.create({
    data: {
      name,
      description: description || null,
    },
  });
};

export const updateDepartment = async (
  id: number,
  name: string,
  description?: string
) => {
  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    const error = new Error("Department not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  const duplicate = await prisma.department.findFirst({
    where: {
      name,
      NOT: {
        id,
      },
    },
  });

  if (duplicate) {
    const error = new Error(
      "Department with this name already exists"
    );

    (error as Error & { statusCode?: number }).statusCode = 409;

    throw error;
  }

  return prisma.department.update({
    where: { id },
    data: {
      name,
      description: description || null,
    },
  });
};

export const deleteDepartment = async (id: number) => {
  const department = await prisma.department.findUnique({
    where: { id },
    include: {
      teams: true,
      members: true,
    },
  });

  if (!department) {
    const error = new Error("Department not found");
    (error as Error & { statusCode?: number }).statusCode = 404;
    throw error;
  }

  if (department.teams.length > 0) {
    const error = new Error(
      "Cannot delete department while teams exist"
    );

    (error as Error & { statusCode?: number }).statusCode = 400;

    throw error;
  }

  if (department.members.length > 0) {
    const error = new Error(
      "Cannot delete department while members are assigned to it"
    );

    (error as Error & { statusCode?: number }).statusCode = 400;

    throw error;
  }

  return prisma.department.delete({
    where: { id },
  });
};