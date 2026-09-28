import api from "@/lib/axios";

import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/types/task";

interface TasksResponse {
  success: boolean;
  count: number;

  filters: {
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
  };

  tasks: Task[];
}

interface TaskResponse {
  success: boolean;
  task: Task;
}

interface TaskMutationResponse {
  success: boolean;
  message: string;
  task: Task;
}

/* =========================================
   GET TASKS
========================================= */

export const getTasks = async (
  params?: {
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
  }
): Promise<Task[]> => {
  const response =
    await api.get<TasksResponse>(
      "/tasks",
      {
        params,
      }
    );

  return response.data.tasks;
};

/* =========================================
   GET TASK
========================================= */

export const getTask = async (
  id: number
): Promise<Task> => {
  const response =
    await api.get<TaskResponse>(
      `/tasks/${id}`
    );

  return response.data.task;
};

/* =========================================
   CREATE TASK
========================================= */

export const createTask = async (
  data: CreateTaskInput
): Promise<Task> => {
  const response =
    await api.post<TaskMutationResponse>(
      "/tasks",
      data
    );

  return response.data.task;
};

/* =========================================
   UPDATE TASK
========================================= */

export const updateTask = async (
  id: number,
  data: UpdateTaskInput
): Promise<Task> => {
  const response =
    await api.put<TaskMutationResponse>(
      `/tasks/${id}`,
      data
    );

  return response.data.task;
};

/* =========================================
   DELETE TASK
========================================= */

export const deleteTask = async (
  id: number
): Promise<void> => {
  await api.delete(
    `/tasks/${id}`
  );
};