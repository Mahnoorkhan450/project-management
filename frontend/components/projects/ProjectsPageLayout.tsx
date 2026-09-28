
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import ProjectsHeader from "./ProjectsHeader";
import ProjectFilters from "./ProjectFilters";
import ProjectList from "./ProjectList";

import useProjects from "@/hooks/useProjects";

import type { ProjectStatus } from "@/types/project";

export default function ProjectsPageLayout() {
  const searchParams =
    useSearchParams();

  const {
    projects,
    loading,
    error,
    loadProjects,
    removeProject,
  } = useProjects();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<ProjectStatus | "ALL">(
      "ALL"
    );

  // ==========================================
  // READ STATUS FROM SIDEBAR URL
  // ==========================================

  useEffect(() => {
    const urlStatus =
      searchParams.get("status");

    if (
      urlStatus === "ACTIVE" ||
      urlStatus === "COMPLETED" ||
      urlStatus === "ARCHIVED"
    ) {
      setStatus(
        urlStatus as ProjectStatus
      );

      return;
    }

    setStatus("ALL");
  }, [searchParams]);

  // ==========================================
  // LOAD PROJECTS
  // ==========================================

  useEffect(() => {
    loadProjects().catch(() => {});
  }, [loadProjects]);

  // ==========================================
  // FILTER PROJECTS
  // ==========================================

  const filteredProjects =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return projects.filter(
        (project) => {
          // ------------------------------
          // SEARCH
          // ------------------------------

          const matchesSearch =
            !searchValue ||
            project.name
              .toLowerCase()
              .includes(searchValue) ||
            (
              project.description ??
              ""
            )
              .toLowerCase()
              .includes(searchValue);

          // ------------------------------
          // STATUS
          // ------------------------------

          const matchesStatus =
            status === "ALL" ||
            project.status === status;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      projects,
      search,
      status,
    ]);

  // ==========================================
  // DELETE PROJECT
  // ==========================================

  const handleDelete = async (
    projectId: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await removeProject(
        projectId
      );
    } catch {
      // Error is already handled
      // by useProjects
    }
  };

  // ==========================================
  // RETRY
  // ==========================================

  const handleRetry = () => {
    loadProjects().catch(() => {});
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[#F7F8F7]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-5
          py-6
          sm:px-6
          lg:px-8
        "
      >
        {/* ======================================
            HEADER
            ====================================== */}

        <ProjectsHeader />

        {/* ======================================
            FILTERS
            ====================================== */}

        <div className="mt-6">
          <ProjectFilters
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
          />
        </div>

        {/* ======================================
            PROJECTS
            ====================================== */}

        <div className="mt-6">
          <ProjectList
            projects={filteredProjects}
            loading={loading}
            error={error}
            onRetry={handleRetry}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  );
}
