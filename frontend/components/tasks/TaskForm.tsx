
"use client";

import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  Save,
} from "lucide-react";

import Link from "next/link";

import useTaskForm from "@/hooks/useTaskForm";

interface TaskFormProps {
  mode: "create" | "edit";
}

export default function TaskForm({
  mode,
}: TaskFormProps) {
  const {
    projects,
    users,
    loadingData,
    saving,

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

    toastMessage,
    toastType,
    closeToast,

    handleSubmit,
  } = useTaskForm({
    mode,
  });

  if (loadingData) {
    return (
      <div className="flex h-[320px] items-center justify-center">
        <Loader2
          className="h-6 w-6 animate-spin text-[#064B52]"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6">
      {/* Toast */}

      {toastMessage && (
        <div
          className={`mb-4 rounded-lg border px-3.5 py-2.5 text-sm ${
            toastType === "error"
              ? "border-red-200 bg-red-50 text-red-600"
              : toastType === "warning"
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-[#CFE0E1] bg-[#EDF6F6] text-[#064B52]"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span>{toastMessage}</span>

            <button
              type="button"
              onClick={closeToast}
              className="shrink-0 text-xs font-semibold hover:underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Header */}

      <div className="mb-4">
        <Link
          href="/tasks"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#6E7B7D] transition hover:text-[#064B52]"
        >
          <ArrowLeft size={14} />
          Back to Tasks
        </Link>

        <h1 className="text-xl font-semibold tracking-tight text-[#182124]">
          {mode === "create"
            ? "Create New Task"
            : "Edit Task"}
        </h1>

        <p className="mt-0.5 text-xs text-[#6E7B7D]">
          {mode === "create"
            ? "Create a task and assign it to a project."
            : "Update task details and progress."}
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-[#DDE3E3] bg-white p-4 shadow-sm sm:p-5"
      >
        {/* Title */}

        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-[#182124]">
            Task Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter task title"
            className="h-10 w-full rounded-lg border border-[#DDE3E3] px-3 text-sm outline-none transition placeholder:text-[#A0AAAB] focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10"
          />
        </div>

        {/* Description */}

        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-[#182124]">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Describe the task..."
            rows={3}
            className="w-full resize-none rounded-lg border border-[#DDE3E3] px-3 py-2.5 text-sm outline-none transition placeholder:text-[#A0AAAB] focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10"
          />
        </div>

        {/* Fields */}

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Project */}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#182124]">
              Project
            </label>

            <select
              value={projectId}
              onChange={(e) =>
                setProjectId(e.target.value)
              }
              className="h-10 w-full rounded-lg border border-[#DDE3E3] bg-white px-3 text-sm outline-none transition focus:border-[#064B52]"
            >
              <option value="">
                Select project
              </option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Assign */}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#182124]">
              Assign To
            </label>

            <select
              value={assignedToId}
              onChange={(e) =>
                setAssignedToId(
                  e.target.value
                )
              }
              className="h-10 w-full rounded-lg border border-[#DDE3E3] bg-white px-3 text-sm outline-none transition focus:border-[#064B52]"
            >
              <option value="">
                Unassigned
              </option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#182124]">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "TODO"
                    | "IN_PROGRESS"
                    | "COMPLETED"
                )
              }
              className="h-10 w-full rounded-lg border border-[#DDE3E3] bg-white px-3 text-sm outline-none transition focus:border-[#064B52]"
            >
              <option value="TODO">
                To Do
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="COMPLETED">
                Completed
              </option>
            </select>
          </div>

          {/* Priority */}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#182124]">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as
                    | "LOW"
                    | "MEDIUM"
                    | "HIGH"
                )
              }
              className="h-10 w-full rounded-lg border border-[#DDE3E3] bg-white px-3 text-sm outline-none transition focus:border-[#064B52]"
            >
              <option value="LOW">
                Low
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="HIGH">
                High
              </option>
            </select>
          </div>

          {/* Due Date */}

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold text-[#182124]">
              Due Date
            </label>

            <div className="relative">
              <CalendarDays
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7B7D]"
              />

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(
                    e.target.value
                  )
                }
                className="h-10 w-full rounded-lg border border-[#DDE3E3] bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-[#064B52]"
              />
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-5 flex justify-end gap-2 border-t border-[#EEF1F1] pt-4">
          <Link
            href="/tasks"
            className="inline-flex h-9 items-center rounded-lg border border-[#DDE3E3] px-4 text-xs font-medium text-[#6E7B7D] transition hover:bg-[#F7F8F7]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#064B52] px-4 text-xs font-semibold text-white transition hover:bg-[#0B626A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2
                size={14}
                className="animate-spin"
              />
            ) : (
              <Save size={14} />
            )}

            {saving
              ? "Saving..."
              : mode === "create"
              ? "Create Task"
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
