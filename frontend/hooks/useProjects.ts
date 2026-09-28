"use client";

import { useCallback, useState } from "react";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "@/services/projectService";

import type {
  CreateProjectData,
  Project,
  UpdateProjectData,
} from "@/services/projectService";

export default function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] = useState("");

  /*
   * GET ALL PROJECTS
   */
  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      console.log("PROJECTS FROM API:", data);

      setProjects(data);

      return data;
    } catch (err: any) {
      console.error(
        "Failed to load projects:",
        err
      );

      const message =
        err?.response?.data?.message ||
        "Unable to load projects.";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * GET SINGLE PROJECT
   */
  const loadProject = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError("");

        const project =
          await getProjectById(id);

        setSelectedProject(project);

        return project;
      } catch (err: any) {
        console.error(
          "Failed to load project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to load project.";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
   * CREATE PROJECT
   */
  const addProject = useCallback(
    async (data: CreateProjectData) => {
      try {
        setActionLoading(true);
        setError("");

        const project =
          await createProject(data);

        setProjects((current) => [
          project,
          ...current,
        ]);

        return project;
      } catch (err: any) {
        console.error(
          "Failed to create project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to create project.";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    []
  );

  /*
   * UPDATE PROJECT
   */
  const editProject = useCallback(
    async (
      id: number,
      data: UpdateProjectData
    ) => {
      try {
        setActionLoading(true);
        setError("");

        const updatedProject =
          await updateProject(id, data);

        setProjects((current) =>
          current.map((project) =>
            project.id === id
              ? updatedProject
              : project
          )
        );

        setSelectedProject((current) =>
          current?.id === id
            ? updatedProject
            : current
        );

        return updatedProject;
      } catch (err: any) {
        console.error(
          "Failed to update project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to update project.";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    []
  );

  /*
   * DELETE PROJECT
   */
  const removeProject = useCallback(
    async (id: number) => {
      try {
        setActionLoading(true);
        setError("");

        await deleteProject(id);

        setProjects((current) =>
          current.filter(
            (project) => project.id !== id
          )
        );

        setSelectedProject((current) =>
          current?.id === id
            ? null
            : current
        );
      } catch (err: any) {
        console.error(
          "Failed to delete project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          "Unable to delete project.";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    []
  );

  /*
   * SELECT PROJECT
   */
  const selectProject = useCallback(
    (project: Project | null) => {
      setSelectedProject(project);
    },
    []
  );

  /*
   * CLEAR ERROR
   */
  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    projects,
    selectedProject,

    loading,
    actionLoading,
    error,

    loadProjects,
    loadProject,

    addProject,
    editProject,
    removeProject,

    selectProject,
    clearError,
  };
}