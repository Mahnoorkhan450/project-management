import api from "@/lib/axios";

export interface ProjectTeam {
  id: number;
  name: string;
  description?: string | null;

  department?: {
    id: number;
    name: string;
  } | null;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  status:
    | "ACTIVE"
    | "COMPLETED"
    | "ARCHIVED";

  createdById: number;

  createdBy?: {
    id: number;
    name: string;
    email: string;
  };

  team?: ProjectTeam | null;

  _count?: {
    tasks: number;
  };

  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  status?:
    | "ACTIVE"
    | "COMPLETED"
    | "ARCHIVED";
  teamId?: number;
}

export interface UpdateProjectData {
  name: string;
  description?: string;
  status?:
    | "ACTIVE"
    | "COMPLETED"
    | "ARCHIVED";
  teamId?: number;
}

/* =========================================
   CREATE PROJECT
========================================= */

export const createProject = async (
  data: CreateProjectData
): Promise<Project> => {
  const response = await api.post(
    "/projects",
    data
  );

  return response.data.data;
};

/* =========================================
   GET PROJECTS
========================================= */

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get(
    "/projects"
  );

  return response.data.data;
};

/* =========================================
   GET PROJECT BY ID
========================================= */

export const getProjectById = async (
  id: number
): Promise<Project> => {
  const response = await api.get(
    `/projects/${id}`
  );

  return response.data.data;
};

/* =========================================
   UPDATE PROJECT
========================================= */

export const updateProject = async (
  id: number,
  data: UpdateProjectData
): Promise<Project> => {
  const response = await api.put(
    `/projects/${id}`,
    data
  );

  return response.data.data;
};

/* =========================================
   DELETE PROJECT
========================================= */

export const deleteProject = async (
  id: number
): Promise<void> => {
  await api.delete(
    `/projects/${id}`
  );
};