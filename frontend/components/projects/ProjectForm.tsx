
"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  FolderPlus,
  Loader2,
  ShieldAlert,
} from "lucide-react";

import useProjects from "@/hooks/useProjects";
import useTeams from "@/hooks/useTeams";

import type { ProjectStatus } from "@/types/project";

import { useAuth } from "@/context/AuthContext";

import Toast from "@/components/ui/Toast";

export default function ProjectForm() {
  const router = useRouter();

  const {
    isAdmin,
    loading: authLoading,
  } = useAuth();

  const {
    addProject,
    actionLoading,
    error: projectError,
    clearError,
  } = useProjects();

  const {
    teams,
    loading: teamsLoading,
    loadTeams,
  } = useTeams();

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState<ProjectStatus>("ACTIVE");

  const [teamId, setTeamId] =
    useState("");

  // Toast state
  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<
      "success" | "error" | "warning" | "info"
    >("info");

  // Load teams for admin
  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadTeams();
    }
  }, [
    authLoading,
    isAdmin,
    loadTeams,
  ]);

  // Show project errors through Toast
  useEffect(() => {
    if (projectError) {
      setToastType("error");
      setToastMessage(projectError);
    }
  }, [projectError]);

  // Automatically close Toast
  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (
    message: string,
    type:
      | "success"
      | "error"
      | "warning"
      | "info"
  ) => {
    setToastMessage(message);
    setToastType(type);
  };

  const closeToast = () => {
    setToastMessage("");
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    clearError();
    closeToast();

    if (!isAdmin) {
      showToast(
        "Only administrators can create projects.",
        "error"
      );

      return;
    }

    const trimmedName =
      name.trim();

    const trimmedDescription =
      description.trim();

    if (trimmedName.length < 2) {
      showToast(
        "Project name must be at least 2 characters.",
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
      await addProject({
        name: trimmedName,

        description:
          trimmedDescription || undefined,

        status,

        teamId: teamId
          ? Number(teamId)
          : undefined,
      });

      showToast(
        "Project created successfully.",
        "success"
      );

      // Give the user a moment to see success toast
      setTimeout(() => {
        router.push("/projects");
        router.refresh();
      }, 700);
    } catch (error: any) {
      console.error(
        "Failed to create project:",
        error
      );

      const message =
        error?.response?.data?.message ||
        projectError ||
        "Unable to create project. Please try again.";

      showToast(
        message,
        "error"
      );
    }
  };

  const loading = actionLoading;

  // ------------------------------------------
  // AUTH LOADING
  // ------------------------------------------

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8F7]">
        <div className="mx-auto flex min-h-[420px] w-full max-w-2xl items-center justify-center px-5">
          <div className="flex items-center gap-3 text-sm text-[#6E7B7D]">
            <Loader2 className="h-5 w-5 animate-spin text-[#064B52]" />

            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // ACCESS RESTRICTED
  // ------------------------------------------

  if (!isAdmin) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-[#F7F8F7]">
        <div className="mx-auto w-full max-w-2xl px-5 py-6 sm:px-7 lg:px-8">

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6E7B7D] transition hover:text-[#064B52]"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Projects
          </Link>

          <div className="mt-8 rounded-2xl border border-[#DDE3E3] bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE9E9] text-[#064B52]">
              <ShieldAlert className="h-5 w-5" />
            </div>

            <h1 className="mt-5 text-xl font-semibold text-[#182124]">
              Access Restricted
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6E7B7D]">
              Only administrators can create new
              projects. You can view projects that
              are assigned to your team.
            </p>

            <Link
              href="/projects"
              className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-[#064B52] px-5 text-sm font-semibold text-white transition hover:bg-[#04383E]"
            >
              Back to Projects
            </Link>

          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // CREATE PROJECT FORM
  // ------------------------------------------

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F8F7]">

      {/* TOAST */}

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={closeToast}
      />

      <div className="mx-auto w-full max-w-2xl px-5 py-6 sm:px-7 lg:px-8">

        {/* BACK */}

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6E7B7D] transition hover:text-[#064B52]"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Projects
        </Link>

        {/* HEADER */}

        <div className="mt-6 flex items-center gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCE9E9] text-[#064B52]">
            <FolderPlus className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#182124]">
              Create Project
            </h1>

            <p className="mt-1 text-sm text-[#6E7B7D]">
              Create a project to organize your work
              and keep everything in one place.
            </p>
          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-[#DDE3E3] bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-5">

            {/* NAME + STATUS */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_190px]">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#182124]"
                >
                  Project name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter project name"
                  maxLength={150}
                  disabled={loading}
                  className="h-11 w-full rounded-xl border border-[#DDE3E3] bg-white px-4 text-sm text-[#182124] outline-none transition placeholder:text-[#9AA5A6] focus:border-[#064B52] focus:ring-4 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F2F6F6]"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-semibold text-[#182124]"
                >
                  Project status
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as ProjectStatus
                    )
                  }
                  disabled={loading}
                  className="h-11 w-full rounded-xl border border-[#DDE3E3] bg-white px-4 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-4 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F2F6F6]"
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

            </div>

            {/* DESCRIPTION */}

            <div>
              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-[#182124]"
                >
                  Description

                  <span className="ml-1 font-normal text-[#9AA5A6]">
                    (optional)
                  </span>
                </label>

                <span className="text-xs text-[#8A9697]">
                  {description.length}/1000
                </span>

              </div>

              <textarea
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Briefly describe what this project is about..."
                maxLength={1000}
                rows={4}
                disabled={loading}
                className="w-full resize-none rounded-xl border border-[#DDE3E3] bg-white px-4 py-3 text-sm leading-6 text-[#182124] outline-none transition placeholder:text-[#9AA5A6] focus:border-[#064B52] focus:ring-4 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F2F6F6]"
              />
            </div>

            {/* TEAM */}

            <div>
              <label
                htmlFor="team"
                className="mb-2 block text-sm font-semibold text-[#182124]"
              >
                Team

                <span className="ml-1 font-normal text-[#9AA5A6]">
                  (optional)
                </span>
              </label>

              <select
                id="team"
                value={teamId}
                onChange={(e) =>
                  setTeamId(e.target.value)
                }
                disabled={
                  loading ||
                  teamsLoading
                }
                className="h-11 w-full rounded-xl border border-[#DDE3E3] bg-white px-4 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-4 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F2F6F6]"
              >
                <option value="">
                  {teamsLoading
                    ? "Loading teams..."
                    : "Select a team"}
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
            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#DDE3E3] pt-5 sm:flex-row sm:justify-end">

            <Link
              href="/projects"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[#DDE3E3] bg-white px-5 text-sm font-semibold text-[#6E7B7D] transition hover:bg-[#F2F6F6] hover:text-[#182124]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#064B52] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B626A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />

                  Creating...
                </>
              ) : (
                <>
                  <FolderPlus className="h-4 w-4" />

                  Create Project
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
