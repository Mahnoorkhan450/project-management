
"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";

import { getTask } from "@/services/taskService";

import type { Task } from "@/types/task";

export default function useTaskDetails() {
  const params = useParams();

  const taskId = Number(params.id);

  const [task, setTask] =
    useState<Task | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadTask = async () => {
    if (
      !Number.isInteger(taskId) ||
      taskId <= 0
    ) {
      setError("Invalid task ID.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data =
        await getTask(taskId);

      setTask(data);
    } catch (err: any) {
      console.error(
        "Failed to load task:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load this task."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const clearError = () => {
    setError("");
  };

  return {
    task,
    taskId,
    loading,
    error,
    loadTask,
    clearError,
  };
}
