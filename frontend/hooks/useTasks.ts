
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/taskService";

import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/types/task";

type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED";

type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId?: number;
  assignedToId?: number;
}

export default function useTasks(
  initialFilters?: TaskFilters
) {
  const searchParams =
    useSearchParams();

  // ==========================================
  // URL STATUS
  // ==========================================

  const urlStatus =
    searchParams.get("status");

  const validStatus =
    urlStatus === "TODO" ||
    urlStatus === "IN_PROGRESS" ||
    urlStatus === "COMPLETED"
      ? urlStatus
      : undefined;

  // ==========================================
  // TASK STATE
  // ==========================================

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [
    selectedTask,
    setSelectedTask,
  ] =
    useState<Task | null>(null);

  const [filters, setFilters] =
    useState<TaskFilters>({
      ...initialFilters,
      status:
        validStatus ??
        initialFilters?.status,
    });

  const [loading, setLoading] =
    useState(true);

  const [
    actionLoading,
    setActionLoading,
  ] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // SYNC URL STATUS WITH FILTER STATE
  // ==========================================

  useEffect(() => {
    setFilters((previous) => ({
      ...previous,
      status: validStatus,
    }));
  }, [validStatus]);

  // ==========================================
  // LOAD TASKS
  // ==========================================

  const loadTasks =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getTasks(filters);

        setTasks(data);
      } catch (err: any) {
        console.error(
          "Failed to load tasks:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load tasks."
        );
      } finally {
        setLoading(false);
      }
    }, [filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ==========================================
  // LOAD SINGLE TASK
  // ==========================================

  const loadTask = async (
    id: number
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const task =
        await getTask(id);

      setSelectedTask(task);

      return task;
    } catch (err: any) {
      console.error(
        "Failed to load task:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load task."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // CREATE TASK
  // ==========================================

  const addTask = async (
    data: CreateTaskInput
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const task =
        await createTask(data);

      setTasks((previous) => [
        task,
        ...previous,
      ]);

      return task;
    } catch (err: any) {
      console.error(
        "Failed to create task:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to create task."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // UPDATE TASK
  // ==========================================

  const editTask = async (
    id: number,
    data: UpdateTaskInput
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const updatedTask =
        await updateTask(
          id,
          data
        );

      setTasks((previous) =>
        previous.map((task) =>
          task.id === id
            ? updatedTask
            : task
        )
      );

      setSelectedTask(
        updatedTask
      );

      return updatedTask;
    } catch (err: any) {
      console.error(
        "Failed to update task:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to update task."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const removeTask = async (
    id: number
  ) => {
    try {
      setActionLoading(true);
      setError("");

      await deleteTask(id);

      setTasks((previous) =>
        previous.filter(
          (task) => task.id !== id
        )
      );

      if (
        selectedTask?.id === id
      ) {
        setSelectedTask(null);
      }
    } catch (err: any) {
      console.error(
        "Failed to delete task:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to delete task."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // FILTER ACTIONS
  // ==========================================

  const updateFilters = (
    newFilters: TaskFilters
  ) => {
    setFilters(newFilters);
  };

  const setStatusFilter = (
    status:
      | TaskStatus
      | "ALL"
  ) => {
    setFilters((previous) => ({
      ...previous,
      status:
        status === "ALL"
          ? undefined
          : status,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  // ==========================================
  // SELECTION
  // ==========================================

  const selectTask = (
    task: Task | null
  ) => {
    setSelectedTask(task);
  };

  // ==========================================
  // ERROR
  // ==========================================

  const clearError = () => {
    setError("");
  };

  return {
    tasks,
    selectedTask,

    filters,

    loading,
    actionLoading,
    error,

    loadTasks,
    loadTask,

    addTask,
    editTask,
    removeTask,

    updateFilters,
    setStatusFilter,
    clearFilters,

    selectTask,

    clearError,
  };
}
