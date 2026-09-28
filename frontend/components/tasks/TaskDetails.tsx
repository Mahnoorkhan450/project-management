
"use client";

import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Clock3,
  FolderKanban,
  UserRound,
  UserRoundPlus,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import useTaskDetails from "@/hooks/useTaskDetails";

const statusConfig = {
  TODO: {
    label: "To Do",
    icon: Circle,
    description:
      "This task has not been started yet.",
  },

  IN_PROGRESS: {
    label: "In Progress",
    icon: Clock3,
    description:
      "This task is currently being worked on.",
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    description:
      "This task has been completed.",
  },
};

const priorityConfig = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const formatDate = (
  value?: string | null
) => {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export default function TaskDetails() {
  const { loading: authLoading } =
    useAuth();

  const {
    task,
    loading,
    error,
  } = useTaskDetails();

  // ==========================================
  // LOADING
  // ==========================================

  if (loading || authLoading) {
    return (
      <main className="bg-[#F7F8F7]">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="h-4 w-24 animate-pulse rounded bg-[#E8EEEE]" />

          <div className="mt-5 h-8 w-72 animate-pulse rounded bg-[#E8EEEE]" />

          <div className="mt-2 h-3 w-80 max-w-full animate-pulse rounded bg-[#E8EEEE]" />

          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">
            <div className="h-[360px] animate-pulse rounded-xl border border-[#DDE3E3] bg-white" />

            <div className="h-[280px] animate-pulse rounded-xl border border-[#DDE3E3] bg-white" />
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !task) {
    return (
      <main className="bg-[#F7F8F7]">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-xl items-center justify-center px-5">
          <div className="w-full rounded-xl border border-[#DDE3E3] bg-white p-7 text-center shadow-sm">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <ClipboardCheck size={20} />
            </div>

            <h1 className="mt-3 text-lg font-semibold text-[#182124]">
              Task unavailable
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-[#6E7B7D]">
              {error ||
                "The requested task could not be found."}
            </p>

            <Link
              href="/tasks"
              className="mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#064B52] px-4 text-xs font-semibold text-white transition hover:bg-[#04383E]"
            >
              <ArrowLeft size={15} />
              Back to tasks
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // TASK DATA
  // ==========================================

  const status =
    statusConfig[task.status];

  const StatusIcon = status.icon;

  const priority =
    priorityConfig[task.priority];

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="bg-[#F7F8F7]">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">

        {/* TOP BAR */}

        <div>
          <Link
            href="/tasks"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E7B7D] transition hover:text-[#064B52]"
          >
            <ArrowLeft size={15} />
            Back to tasks
          </Link>
        </div>

        {/* HEADER */}

        <div className="mt-5">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[#DCE9E9] px-2.5 py-1 text-[11px] font-semibold text-[#064B52]">
            <FolderKanban size={13} />

            {task.project?.name ||
              "Project"}
          </div>

          <h1 className="mt-2 break-words text-2xl font-semibold tracking-tight text-[#182124]">
            {task.title}
          </h1>
        </div>

        {/* MAIN CONTENT */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_290px]">

          {/* LEFT CONTENT */}

          <div className="space-y-4">

            {/* DESCRIPTION */}

            <section className="rounded-xl border border-[#DDE3E3] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1F4F4] text-[#064B52]">
                  <ClipboardCheck size={16} />
                </div>

                <div>
                  <h2 className="text-xs font-semibold text-[#182124]">
                    Description
                  </h2>

                  <p className="text-[11px] text-[#8A9698]">
                    Task details
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-[#EEF1F1] pt-4">
                {task.description ? (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-[#536164]">
                    {task.description}
                  </p>
                ) : (
                  <p className="text-xs italic text-[#9AA5A6]">
                    No description has been added for this task.
                  </p>
                )}
              </div>
            </section>

            {/* TASK DETAILS */}

            <section className="rounded-xl border border-[#DDE3E3] bg-white p-5 shadow-sm">
              <h2 className="text-xs font-semibold text-[#182124]">
                Task details
              </h2>

              <div className="mt-4 grid gap-4 border-t border-[#EEF1F1] pt-4 sm:grid-cols-2">

                {/* Status */}

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9698]">
                    Status
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52]">
                      <StatusIcon size={14} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-[#182124]">
                        {status.label}
                      </p>

                      <p className="text-[10px] text-[#8A9698]">
                        {status.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Priority */}

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9698]">
                    Priority
                  </p>

                  <p className="mt-2 text-sm font-medium text-[#182124]">
                    {priority}
                  </p>
                </div>

                {/* Due Date */}

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9698]">
                    Due date
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays
                      size={14}
                      className="text-[#064B52]"
                    />

                    <span className="text-sm font-medium text-[#182124]">
                      {formatDate(
                        task.dueDate
                      )}
                    </span>
                  </div>
                </div>

                {/* Updated */}

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9698]">
                    Last updated
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CalendarDays
                      size={14}
                      className="text-[#064B52]"
                    />

                    <span className="text-sm font-medium text-[#182124]">
                      {formatDate(
                        task.updatedAt
                      )}
                    </span>
                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}

          <aside className="space-y-4">

            {/* Assignment */}

            <section className="rounded-xl border border-[#DDE3E3] bg-white p-4 shadow-sm">
              <h2 className="text-xs font-semibold text-[#182124]">
                Assignment
              </h2>

              <div className="mt-4 space-y-4">

                {/* Assigned To */}

                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#8A9698]">
                    Assigned to
                  </p>

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCE9E9] text-xs font-semibold text-[#064B52]">
                      {task.assignedTo?.name
                        ?.charAt(0)
                        .toUpperCase() || (
                        <UserRound size={15} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-[#182124]">
                        {task.assignedTo?.name ||
                          "Unassigned"}
                      </p>

                      {task.assignedTo?.email && (
                        <p className="truncate text-[10px] text-[#8A9698]">
                          {
                            task.assignedTo
                              .email
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#EEF1F1]" />

                {/* Created By */}

                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#8A9698]">
                    Created by
                  </p>

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F4F4] text-[#064B52]">
                      <UserRoundPlus size={15} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-[#182124]">
                        {task.createdBy?.name ||
                          "Unknown user"}
                      </p>

                      {task.createdBy?.email && (
                        <p className="truncate text-[10px] text-[#8A9698]">
                          {
                            task.createdBy
                              .email
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Project */}

            <section className="min-h-[92px] rounded-xl border border-[#DDE3E3] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52]">
                  <FolderKanban size={15} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] text-[#8A9698]">
                    Project
                  </p>

                  <p className="mt-0.5 truncate text-xs font-semibold text-[#182124]">
                    {task.project?.name ||
                      "Project"}
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
