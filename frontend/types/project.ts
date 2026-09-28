
import api from "@/lib/axios";
// ==========================================
// TYPES
// ==========================================

export type ProjectStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "ARCHIVED";

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
  status: ProjectStatus;
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

  // ==========================================
  // PERMISSIONS
  // ==========================================

  canEdit?: boolean;
  canDelete?: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  status?: ProjectStatus;
  teamId?: number;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  teamId?: number;
}

// ==========================================
// RESPONSE TYPES
// ==========================================

export interface ProjectResponse {
  success: boolean;
  message?: string;
  data: Project;
}

export interface ProjectsResponse {
  success: boolean;
  count?: number;
  data: Project[];
}

export interface DeleteProjectResponse {
  success: boolean;
  message: string;
}

// ==========================================
// GET ALL PROJECTS
// ==========================================

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ProjectsResponse>("/projects");

  return response.data.data;
};

// ==========================================
// GET SINGLE PROJECT
// ==========================================

export const getProjectById = async (
  id: number
): Promise<Project> => {
  const response =
    await api.get<ProjectResponse>(`/projects/${id}`);

  return response.data.data;
};

// ==========================================
// CREATE PROJECT
// ==========================================

export const createProject = async (
  data: CreateProjectData
): Promise<Project> => {
  const response =
    await api.post<ProjectResponse>("/projects", data);

  return response.data.data;
};

// ==========================================
// UPDATE PROJECT
// ==========================================

export const updateProject = async (
  id: number,
  data: UpdateProjectData
): Promise<Project> => {
  const response =
    await api.put<ProjectResponse>(
      `/projects/${id}`,
      data
    );

  return response.data.data;
};

// ==========================================
// DELETE PROJECT
// ==========================================

export const deleteProject = async (
  id: number
): Promise<void> => {
  await api.delete(`/projects/${id}`);
};
