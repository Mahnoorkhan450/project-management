
"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  createTask,
  getTask,
  updateTask,
} from "@/services/taskService";

import {
  getProjects,
} from "@/services/projectService";

import {
  getUsers,
} from "@/services/userService";

import type {
  TaskStatus,
  TaskPriority,
  CreateTaskInput,
  UpdateTaskInput,
} from "@/types/task";

import { useAuth } from "@/context/AuthContext";

interface Project {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface UseTaskFormProps {
  mode: "create" | "edit";
  taskId?: number;
}

type ToastType =
  | "success"
  | "error"
  | "warning";

export default function useTaskForm({
  mode,
  taskId,
}: UseTaskFormProps) {
  const router = useRouter();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  // ==========================================
  // DATA
  // ==========================================

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [users, setUsers] =
    useState<User[]>([]);

  const [loadingData, setLoadingData] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // ==========================================
  // FORM STATE
  // ==========================================

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [projectId, setProjectId] =
    useState("");

  const [assignedToId, setAssignedToId] =
    useState("");

  const [status, setStatus] =
    useState<TaskStatus>("TODO");

  const [priority, setPriority] =
    useState<TaskPriority>("MEDIUM");

  const [dueDate, setDueDate] =
    useState("");

  // ==========================================
  // TOAST
  // ==========================================

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<ToastType>("success");

  const closeToast = () => {
    setToastMessage("");
  };

  const showToast = (
    message: string,
    type: ToastType = "success"
  ) => {
    setToastMessage(message);
    setToastType(type);
  };

  // ==========================================
  // LOAD PROJECTS + USERS + TASK
  // ==========================================

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const loadData = async () => {
      try {
        setLoadingData(true);

        // ======================================
        // LOAD PROJECTS
        // ======================================

        const projectData =
          await getProjects();

        setProjects(projectData);

        // ======================================
        // LOAD USERS
        // ======================================

        try {
          const userData =
            await getUsers();

          setUsers(userData);
        } catch (userError) {
          console.error(
            "Failed to load users:",
            userError
          );

          setUsers([]);
        }

        // ======================================
        // LOAD TASK FOR EDIT MODE
        // ======================================

        if (
          mode === "edit" &&
          taskId
        ) {
          const task =
            await getTask(taskId);

          setTitle(
            task.title
          );

          setDescription(
            task.description || ""
          );

          setProjectId(
            String(task.projectId)
          );

          setAssignedToId(
            task.assignedToId
              ? String(
                  task.assignedToId
                )
              : ""
          );

          setStatus(
            task.status
          );

          setPriority(
            task.priority
          );

          setDueDate(
            task.dueDate
              ? task.dueDate.slice(
                  0,
                  10
                )
              : ""
          );
        }
      } catch (error: any) {
        console.error(
          "Failed to load task form data:",
          error
        );

        showToast(
          error?.response?.data?.message ||
            "Unable to load task data.",
          "error"
        );
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [
    authLoading,
    mode,
    taskId,
  ]);

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // ========================================
    // VALIDATION
    // ========================================

    if (!title.trim()) {
      showToast(
        "Task title is required.",
        "warning"
      );

      return;
    }

    if (!projectId) {
      showToast(
        "Please select a project.",
        "warning"
      );

      return;
    }

    // ========================================
    // CREATE
    // ========================================

    if (mode === "create") {
      const data: CreateTaskInput = {
        title: title.trim(),

        description:
          description.trim() || undefined,

        projectId:
          Number(projectId),

        status,

        priority,

        assignedToId:
          assignedToId
            ? Number(assignedToId)
            : undefined,

        dueDate:
          dueDate || undefined,
      };

      try {
        setSaving(true);

        await createTask(data);

        showToast(
          "Task created successfully.",
          "success"
        );

        setTimeout(() => {
          router.push("/tasks");
        }, 700);
      } catch (error: any) {
        console.error(
          "Failed to create task:",
          error
        );

        showToast(
          error?.response?.data?.message ||
            "Unable to create task.",
          "error"
        );
      } finally {
        setSaving(false);
      }

      return;
    }

    // ========================================
    // UPDATE
    // ========================================

    if (
      mode === "edit" &&
      taskId
    ) {
      const data: UpdateTaskInput = {
        title: title.trim(),

        description:
          description.trim() || null,

        status,

        priority,

        dueDate:
          dueDate || null,
      };

      if (projectId) {
        data.projectId =
          Number(projectId);
      }

      data.assignedToId =
        assignedToId
          ? Number(assignedToId)
          : null;

      try {
        setSaving(true);

        await updateTask(
          taskId,
          data
        );

        showToast(
          "Task updated successfully.",
          "success"
        );

        setTimeout(() => {
          router.push("/tasks");
        }, 700);
      } catch (error: any) {
        console.error(
          "Failed to update task:",
          error
        );

        showToast(
          error?.response?.data?.message ||
            "Unable to update task.",
          "error"
        );
      } finally {
        setSaving(false);
      }
    }
  };

  // ==========================================
  // RETURN
  // ==========================================

  return {
    // ----------------------------------------
    // DATA
    // ----------------------------------------

    projects,
    users,

    // ----------------------------------------
    // LOADING
    // ----------------------------------------

    loadingData,
    saving,

    // ----------------------------------------
    // FORM
    // ----------------------------------------

    title,
    setTitle,

    description,
    setDescription,

    projectId,
    setProjectId,

    assignedToId,
    setAssignedToId,

    status,
    setStatus,

    priority,
    setPriority,

    dueDate,
    setDueDate,

    // ----------------------------------------
    // TOAST
    // ----------------------------------------

    toastMessage,
    toastType,
    closeToast,

    // ----------------------------------------
    // SUBMIT
    // ----------------------------------------

    handleSubmit,
  };
}
