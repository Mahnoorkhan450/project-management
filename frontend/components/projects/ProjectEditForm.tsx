"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  FolderPen,
  Loader2,
  Users,
} from "lucide-react";

import useProjects from "@/hooks/useProjects";
import useTeams from "@/hooks/useTeams";

import { useAuth } from "@/context/AuthContext";

import Toast from "@/components/ui/Toast";

import type {
  Project,
  ProjectStatus,
} from "@/types/project";

interface ProjectWithPermissions extends Project {
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function ProjectEditForm() {
  const params = useParams();
  const router = useRouter();

  const { isAdmin, loading: authLoading } = useAuth();

  const {
    selectedProject,
    loadProject,
    editProject,
    loading,
    actionLoading,
    error: projectError,
    clearError,
  } = useProjects();

  const {
    teams,
    loading: teamsLoading,
    loadTeams,
  } = useTeams();

  const projectId = Number(params.id);

  const [project, setProject] =
    useState<ProjectWithPermissions | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] =
    useState<ProjectStatus>("ACTIVE");

  const [teamId, setTeamId] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  /*
   * Toast helper
   */
  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
  };

  const closeToast = () => {
    setToastMessage("");
  };

  /*
   * Auto close toast
   */
  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  /*
   * Load project
   */
  useEffect(() => {
    if (authLoading) return;

    if (!Number.isFinite(projectId)) {
      showToast("Invalid project ID.", "error");
      return;
    }

    clearError();

    loadProject(projectId).catch(() => {});
  }, [
    projectId,
    authLoading,
    loadProject,
    clearError,
  ]);

  /*
   * Set form values when project loads
   */
  useEffect(() => {
    if (!selectedProject) return;

    const projectData =
      selectedProject as ProjectWithPermissions;

    setProject(projectData);

    setName(projectData.name);
    setDescription(projectData.description ?? "");
    setStatus(projectData.status);

    setTeamId(
      projectData.team
        ? String(projectData.team.id)
        : ""
    );
  }, [selectedProject]);

  /*
   * Load teams for admin
   */
  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadTeams().catch(() => {});
    }
  }, [
    isAdmin,
    authLoading,
    loadTeams,
  ]);

  /*
   * Show project API errors through Toast
   */
  useEffect(() => {
    if (projectError) {
      showToast(projectError, "error");
    }
  }, [projectError]);

  /*
   * Submit
   */
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    clearError();
    closeToast();

    if (!project) {
      showToast(
        "Project could not be loaded.",
        "error"
      );
      return;
    }

    if (!project.canEdit) {
      showToast(
        "You do not have permission to edit this project.",
        "error"
      );
      return;
    }

    if (!Number.isFinite(projectId)) {
      showToast("Invalid project ID.", "error");
      return;
    }

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (trimmedName.length < 2) {
      showToast(
        "Project name must be at least 2 characters.",
        "warning"
      );
      return;
    }

    if (trimmedName.length > 100) {
      showToast(
        "Project name cannot exceed 100 characters.",
        "warning"
      );
      return;
    }

    if (trimmedDescription.length > 1000) {
      showToast(
        "Description cannot exceed 1000 characters.",
        "warning"
      );
      return;
    }

    try {
      const updateData = {
        name: trimmedName,
        description:
          trimmedDescription || undefined,
        status,
      };

      if (isAdmin) {
        await editProject(projectId, {
          ...updateData,
          ...(teamId
            ? {
                teamId: Number(teamId),
              }
            : {
                teamId: undefined,
              }),
        });
      } else {
        await editProject(
          projectId,
          updateData
        );
      }

      showToast(
        "Project updated successfully.",
        "success"
      );

      setTimeout(() => {
        router.push(`/projects/${projectId}`);
        router.refresh();
      }, 700);
    } catch (err) {
      console.error(
        "Failed to update project:",
        err
      );

      showToast(
        "Unable to update project. Please try again.",
        "error"
      );
    }
  };

  const saving = actionLoading;

  /*
   * Loading state
   */
  if (authLoading || loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <div className="flex items-center gap-2.5 text-xs text-[#6E7B7D]">
          <Loader2 className="h-4 w-4 animate-spin text-[#064B52]" />
          <span>Loading project...</span>
        </div>
      </div>
    );
  }

  /*
   * Project not available
   */
  if (!project && projectError) {
    return (
      <>
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={closeToast}
        />

        <div className="mx-auto w-full max-w-2xl px-5 py-6">
          <Link
            href="/projects"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#6E7B7D] transition hover:text-[#064B52]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Projects
          </Link>

          <div className="rounded-2xl border border-[#DDE3E3] bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F6F6] text-[#064B52]">
              <FolderPen className="h-4 w-4" />
            </div>

            <h1 className="mt-3 text-base font-semibold text-[#182124]">
              Project unavailable
            </h1>

            <p className="mx-auto mt-1.5 max-w-md text-xs leading-5 text-[#6E7B7D]">
              {projectError}
            </p>
          </div>
        </div>
      </>
    );
  }

  /*
   * Permission denied
   */
  if (project && !project.canEdit) {
    return (
      <>
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={closeToast}
        />

        <div className="mx-auto w-full max-w-2xl px-5 py-6">
          <Link
            href={`/projects/${projectId}`}
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#6E7B7D] transition hover:text-[#064B52]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Project
          </Link>

          <div className="rounded-2xl border border-[#DDE3E3] bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F6F6] text-[#064B52]">
              <FolderPen className="h-4 w-4" />
            </div>

            <h1 className="mt-3 text-base font-semibold text-[#182124]">
              Edit access restricted
            </h1>

            <p className="mx-auto mt-1.5 max-w-md text-xs leading-5 text-[#6E7B7D]">
              You can view this project, but you are
              not assigned to its team and cannot edit it.
            </p>

            <Link
              href={`/projects/${projectId}`}
              className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-[#064B52] px-4 text-xs font-semibold text-white transition hover:bg-[#04383E]"
            >
              View Project
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={closeToast}
      />

      <main className="min-h-screen overflow-hidden bg-[#F7F8F7]">
        <div className="mx-auto w-full max-w-3xl px-5 py-5 sm:px-6">

          {/* Back */}
          <Link
            href={`/projects/${projectId}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E7B7D] transition hover:text-[#064B52]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Project
          </Link>

          {/* Header */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52]">
              <FolderPen className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight text-[#182124]">
                Edit Project
              </h1>

              <p className="mt-0.5 text-xs text-[#6E7B7D]">
                Update project details and settings.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-4 overflow-hidden rounded-2xl border border-[#DDE3E3] bg-white shadow-[0_3px_16px_rgba(24,33,36,0.05)]"
          >
            <div className="p-4 sm:p-5">
              <div className="space-y-3.5">

                {/* Name */}
                <div>
                  <label
                    htmlFor="project-name"
                    className="mb-1.5 block text-xs font-semibold text-[#182124]"
                  >
                    Project name
                  </label>

                  <input
                    id="project-name"
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter project name"
                    disabled={saving}
                    className="h-10 w-full rounded-lg border border-[#DDE3E3] bg-[#FCFDFD] px-3.5 text-sm text-[#182124] outline-none transition placeholder:text-[#A3ADAE] hover:border-[#C9D3D3] focus:border-[#064B52] focus:bg-white focus:ring-3 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="project-description"
                    className="mb-1.5 block text-xs font-semibold text-[#182124]"
                  >
                    Description
                  </label>

                  <textarea
                    id="project-description"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Describe the project..."
                    rows={3}
                    maxLength={1000}
                    disabled={saving}
                    className="w-full resize-none rounded-lg border border-[#DDE3E3] bg-[#FCFDFD] px-3.5 py-2.5 text-sm leading-5 text-[#182124] outline-none transition placeholder:text-[#A3ADAE] hover:border-[#C9D3D3] focus:border-[#064B52] focus:bg-white focus:ring-3 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
                  />

                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] text-[#8A9697]">
                      {description.length}/1000
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="project-status"
                    className="mb-1.5 block text-xs font-semibold text-[#182124]"
                  >
                    Status
                  </label>

                  <select
                    id="project-status"
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as ProjectStatus
                      )
                    }
                    disabled={saving}
                    className="h-10 w-full rounded-lg border border-[#DDE3E3] bg-[#FCFDFD] px-3.5 text-sm text-[#182124] outline-none transition hover:border-[#C9D3D3] focus:border-[#064B52] focus:bg-white focus:ring-3 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
                  >
                    <option value="ACTIVE">
                      Active
                    </option>

                    <option value="COMPLETED">
                      Completed
                    </option>

                    <option value="ARCHIVED">
                      Archived
                    </option>
                  </select>
                </div>

                {/* Team */}
                {isAdmin ? (
                  <div>
                    <label
                      htmlFor="project-team"
                      className="mb-1.5 block text-xs font-semibold text-[#182124]"
                    >
                      Team
                    </label>

                    {teamsLoading ? (
                      <div className="flex h-10 items-center gap-2 rounded-lg border border-[#DDE3E3] bg-[#F7F8F7] px-3.5 text-xs text-[#6E7B7D]">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-[#064B52]" />
                        Loading teams...
                      </div>
                    ) : (
                      <select
                        id="project-team"
                        value={teamId}
                        onChange={(e) =>
                          setTeamId(e.target.value)
                        }
                        disabled={saving}
                        className="h-10 w-full rounded-lg border border-[#DDE3E3] bg-[#FCFDFD] px-3.5 text-sm text-[#182124] outline-none transition hover:border-[#C9D3D3] focus:border-[#064B52] focus:bg-white focus:ring-3 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
                      >
                        <option value="">
                          No team assigned
                        </option>

                        {teams.map((team) => (
                          <option
                            key={team.id}
                            value={team.id}
                          >
                            {team.name}
                            {team.department
                              ? ` — ${team.department.name}`
                              : ""}
                          </option>
                        ))}
                      </select>
                    )}

                    <p className="mt-1 text-[10px] text-[#8A9697]">
                      Admins can change the assigned team.
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#182124]">
                      Assigned team
                    </label>

                    <div className="flex items-center gap-2.5 rounded-lg border border-[#DDE3E3] bg-[#F7F8F7] px-3.5 py-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52]">
                        <Users className="h-3.5 w-3.5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-[#182124]">
                          {project?.team?.name ||
                            "No team assigned"}
                        </p>

                        {project?.team?.department && (
                          <p className="mt-0.5 text-[10px] text-[#8A9697]">
                            {project.team.department.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="mt-1 text-[10px] text-[#8A9697]">
                      Team assignment can only be changed by an administrator.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2.5 border-t border-[#EEF1F1] bg-[#FAFBFB] px-4 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-5">

              <Link
                href={`/projects/${projectId}`}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[#DDE3E3] bg-white px-4 text-xs font-semibold text-[#536164] transition hover:border-[#C9D3D3] hover:bg-[#F1F4F4] hover:text-[#182124]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#064B52] px-5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#04383E] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FolderPen className="h-3.5 w-3.5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}