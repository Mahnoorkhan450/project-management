"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Edit3,
  FolderKanban,
  Loader2,
  Trash2,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import ErrorState from "@/components/ui/ErrorState";
import Modal from "@/components/ui/Modal";

import useProjects from "@/hooks/useProjects";

import type { Project } from "@/services/projectService";

interface ProjectDetailsProps {
  projectId: number;
}

interface ProjectWithPermissions extends Project {
  canEdit?: boolean;
  canDelete?: boolean;
}

const statusConfig = {
  ACTIVE: {
    label: "Active",
    variant: "info" as const,
  },

  COMPLETED: {
    label: "Completed",
    variant: "success" as const,
  },

  ARCHIVED: {
    label: "Archived",
    variant: "default" as const,
  },
};

export default function ProjectDetails({
  projectId,
}: ProjectDetailsProps) {
  const router = useRouter();

  const {
    selectedProject,
    loading,
    actionLoading,
    error,
    loadProject,
    removeProject,
    clearError,
  } = useProjects();

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const project =
    selectedProject as ProjectWithPermissions | null;

  useEffect(() => {
    if (
      !Number.isFinite(projectId) ||
      projectId <= 0
    ) {
      return;
    }

    loadProject(projectId).catch(() => {});
  }, [
    projectId,
    loadProject,
  ]);

  const handleDelete = async () => {
    if (
      !Number.isFinite(projectId) ||
      !project?.canDelete
    ) {
      return;
    }

    try {
      clearError();

      await removeProject(projectId);

      setDeleteOpen(false);

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error
      );

      setDeleteOpen(false);
    }
  };

  if (
    !Number.isFinite(projectId) ||
    projectId <= 0
  ) {
    return (
      <div className="min-h-screen bg-[#F7F8F7]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-7 lg:px-9">

          <div className="rounded-2xl border border-[#DDE3E3] bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE9E9] text-[#064B52]">
              <FolderKanban className="h-6 w-6" />
            </div>

            <h1 className="mt-5 text-xl font-semibold text-[#182124]">
              Invalid Project
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6E7B7D]">
              The project ID in the URL is not valid.
            </p>

            <Link
              href="/projects"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#064B52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B626A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>

          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8F7]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-7 lg:px-9">

          <div className="h-5 w-32 animate-pulse rounded bg-[#DDE3E3]" />

          <div className="mt-7 overflow-hidden rounded-2xl border border-[#DDE3E3] bg-white shadow-sm">

            <div className="border-b border-[#DDE3E3] p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                <div className="flex gap-4">
                  <div className="h-12 w-12 animate-pulse rounded-xl bg-[#DDE3E3]" />

                  <div>
                    <div className="h-8 w-64 animate-pulse rounded bg-[#DDE3E3]" />

                    <div className="mt-3 h-4 w-28 animate-pulse rounded bg-[#DDE3E3]" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="h-10 w-20 animate-pulse rounded-xl bg-[#DDE3E3]" />
                  <div className="h-10 w-24 animate-pulse rounded-xl bg-[#DDE3E3]" />
                </div>

              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="h-4 w-28 animate-pulse rounded bg-[#DDE3E3]" />

              <div className="mt-4 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-[#F2F6F6]" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-[#F2F6F6]" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-[#F2F6F6]" />
              </div>

              <div className="mt-8 grid gap-4 border-t border-[#DDE3E3] pt-6 sm:grid-cols-3">
                <div className="h-24 animate-pulse rounded-xl bg-[#F2F6F6]" />
                <div className="h-24 animate-pulse rounded-xl bg-[#F2F6F6]" />
                <div className="h-24 animate-pulse rounded-xl bg-[#F2F6F6]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="min-h-screen bg-[#F7F8F7]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-7 lg:px-9">
          <ErrorState
            title="Unable to load project"
            message={error}
            onRetry={() =>
              loadProject(projectId)
            }
          />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F8F7]">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-7 lg:px-9">

          <div className="rounded-2xl border border-[#DDE3E3] bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE9E9] text-[#064B52]">
              <FolderKanban className="h-6 w-6" />
            </div>

            <h1 className="mt-5 text-xl font-semibold text-[#182124]">
              Project not found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6E7B7D]">
              The project you are looking for does not
              exist or may have been removed.
            </p>

            <Link
              href="/projects"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#064B52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B626A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>

          </div>
        </div>
      </div>
    );
  }

  const canEdit =
    project.canEdit === true;

  const canDelete =
    project.canDelete === true;

  const status =
    statusConfig[project.status];

  const createdDate = new Date(
    project.createdAt
  ).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const updatedDate = new Date(
    project.updatedAt
  ).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F7F8F7]">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-7 lg:px-9">

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6E7B7D] transition hover:text-[#064B52]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <article className="mt-7 overflow-hidden rounded-2xl border border-[#DDE3E3] bg-white shadow-sm">

          <div className="border-b border-[#DDE3E3] p-6 sm:p-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex min-w-0 gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DCE9E9] text-[#064B52]">
                  <FolderKanban className="h-6 w-6" />
                </div>

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="break-words text-2xl font-semibold tracking-tight text-[#182124] sm:text-3xl">
                      {project.name}
                    </h1>

                    <Badge variant={status.variant}>
                      {status.label}
                    </Badge>

                  </div>

                  <p className="mt-2 text-sm text-[#8A9697]">
                    Project #{project.id}
                  </p>

                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">

                {canEdit && (
                  <Link
                    href={`/projects/${project.id}/edit`}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#DDE3E3] bg-white px-4 py-2.5 text-sm font-semibold text-[#182124] transition hover:border-[#C8D3D3] hover:bg-[#F2F6F6]"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Link>
                )}

                {canDelete && (
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteOpen(true)
                    }
                    disabled={actionLoading}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                )}

              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#182124]">
                Description
              </h2>

              <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-[#6E7B7D]">
                {project.description ||
                  "No description has been added to this project yet."}
              </p>
            </div>

            <div className="mt-8 grid gap-4 border-t border-[#DDE3E3] pt-6 sm:grid-cols-3">

              <div className="rounded-xl bg-[#F7F8F7] p-4 transition hover:bg-[#F2F6F6]">
                <div className="flex items-center gap-2 text-[#8A9697]">
                  <CalendarDays className="h-4 w-4" />

                  <span className="text-xs font-medium uppercase tracking-wide">
                    Created
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-[#182124]">
                  {createdDate}
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F8F7] p-4 transition hover:bg-[#F2F6F6]">
                <div className="flex items-center gap-2 text-[#8A9697]">
                  <Clock3 className="h-4 w-4" />

                  <span className="text-xs font-medium uppercase tracking-wide">
                    Last updated
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-[#182124]">
                  {updatedDate}
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F8F7] p-4 transition hover:bg-[#F2F6F6]">
                <div className="flex items-center gap-2 text-[#8A9697]">
                  <FolderKanban className="h-4 w-4" />

                  <span className="text-xs font-medium uppercase tracking-wide">
                    Status
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-[#182124]">
                  {status.label}
                </p>
              </div>

            </div>
          </div>
        </article>

        {error && project && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {canDelete && (
          <Modal
            open={deleteOpen}
            onClose={() => {
              if (!actionLoading) {
                setDeleteOpen(false);
              }
            }}
            title="Delete project?"
          >
            <div className="space-y-5">

              <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4">

                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <Trash2 className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#182124]">
                    This action cannot be undone
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#6E7B7D]">
                    You are about to permanently delete{" "}
                    <span className="font-semibold text-[#182124]">
                      {project.name}
                    </span>.
                  </p>
                </div>

              </div>

              <p className="text-sm leading-6 text-[#6E7B7D]">
                Are you sure you want to continue?
              </p>

              <div className="flex flex-col-reverse gap-3 border-t border-[#DDE3E3] pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() =>
                    setDeleteOpen(false)
                  }
                  className="rounded-xl border border-[#DDE3E3] bg-white px-4 py-2.5 text-sm font-semibold text-[#6E7B7D] transition hover:bg-[#F2F6F6] hover:text-[#182124] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete Project
                    </>
                  )}
                </button>

              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}