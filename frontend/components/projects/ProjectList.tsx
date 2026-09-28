"use client";

import Link from "next/link";

import {
  FolderKanban,
  Plus,
} from "lucide-react";

import ProjectCard from "./ProjectCard";

import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Skeleton from "@/components/ui/Skeleton";

import type { Project } from "@/types/project";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  error: string;
  onRetry: () => void;
  onDelete: (projectId: number) => void;
}

export default function ProjectList({
  projects,
  loading,
  error,
  onRetry,
  onDelete,
}: ProjectListProps) {
  if (loading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[235px] rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load projects"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={
          <FolderKanban className="h-7 w-7" />
        }
        title="No projects found"
        description="Create your first project to start organizing your work."
        action={
          <Link
            href="/projects/create"
            className="inline-flex items-center gap-2 rounded-xl bg-[#064B52] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B626A]"
          >
            <Plus className="h-4 w-4" />
            Create Project
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}