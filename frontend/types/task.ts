
export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface TaskUser {
  id: number;
  name: string;
  email: string;
}

export interface TaskProject {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;

  status: TaskStatus;
  priority: TaskPriority;

  projectId: number;
  createdById: number;
  assignedToId: number | null;

  dueDate: string | null;

  createdAt: string;
  updatedAt: string;

  project?: TaskProject;
  createdBy?: TaskUser;
  assignedTo?: TaskUser | null;

  // Permission flags
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId: number;
  assignedToId?: number;
  dueDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId?: number;
  assignedToId?: number | null;
  dueDate?: string | null;
}
