
"use client";

import { X } from "lucide-react";

import useCreateTeam from "@/hooks/useCreateTeam";

interface CreateTeamModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTeamModal({
  open,
  onClose,
  onSuccess,
}: CreateTeamModalProps) {
  const {
    name,
    setName,

    description,
    setDescription,

    departmentId,
    setDepartmentId,

    departments,
    departmentsLoading,

    loading,
    error,

    submit,
    handleClose,
  } = useCreateTeam({
    open,
    onSuccess,
    onClose,
  });

  /* =========================================
     MODAL CLOSED
  ========================================= */

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101719]/45 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#DDE3E3] bg-white shadow-2xl">

        {/* ==================================
            HEADER
        ================================== */}

        <div className="flex items-center justify-between border-b border-[#EEF1F1] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[#182124]">
              Create Team
            </h2>

            <p className="mt-1 text-xs text-[#6E7B7D]">
              Create a new team in your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close"
            className="rounded-lg p-2 text-[#6E7B7D] transition hover:bg-[#F2F5F5] hover:text-[#182124] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* ==================================
            FORM
        ================================== */}

        <form
          onSubmit={submit}
          className="space-y-5 p-6"
        >
          {/* ==================================
              ERROR
          ================================== */}

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* ==================================
              TEAM NAME
          ================================== */}

          <div>
            <label
              htmlFor="team-name"
              className="mb-2 block text-sm font-medium text-[#182124]"
            >
              Team name
            </label>

            <input
              id="team-name"
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Development Team"
              disabled={loading}
              autoFocus
              className="h-11 w-full rounded-xl border border-[#DDE3E3] bg-white px-4 text-sm text-[#182124] outline-none transition placeholder:text-[#9AA5A7] focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9] disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
            />
          </div>

          {/* ==================================
              DEPARTMENT
          ================================== */}

          <div>
            <label
              htmlFor="team-department"
              className="mb-2 block text-sm font-medium text-[#182124]"
            >
              Department
            </label>

            <select
              id="team-department"
              value={departmentId}
              onChange={(e) =>
                setDepartmentId(
                  e.target.value
                )
              }
              disabled={
                departmentsLoading ||
                loading
              }
              className="h-11 w-full rounded-xl border border-[#DDE3E3] bg-white px-4 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9] disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
            >
              <option value="">
                {departmentsLoading
                  ? "Loading departments..."
                  : departments.length === 0
                  ? "No departments available"
                  : "Select department"}
              </option>

              {departments.map(
                (department) => (
                  <option
                    key={department.id}
                    value={department.id}
                  >
                    {department.name}
                  </option>
                )
              )}
            </select>

            {!departmentsLoading &&
              departments.length === 0 && (
                <p className="mt-1.5 text-xs text-[#8A9698]">
                  Create a department first
                  before creating a team.
                </p>
              )}
          </div>

          {/* ==================================
              DESCRIPTION
          ================================== */}

          <div>
            <label
              htmlFor="team-description"
              className="mb-2 block text-sm font-medium text-[#182124]"
            >
              Description
            </label>

            <textarea
              id="team-description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={4}
              disabled={loading}
              placeholder="Describe the purpose of this team..."
              className="w-full resize-none rounded-xl border border-[#DDE3E3] bg-white px-4 py-3 text-sm text-[#182124] outline-none transition placeholder:text-[#9AA5A7] focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9] disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
            />
          </div>

          {/* ==================================
              ACTIONS
          ================================== */}

          <div className="flex justify-end gap-3 border-t border-[#EEF1F1] pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-[#DDE3E3] px-5 py-2.5 text-sm font-medium text-[#182124] transition hover:bg-[#F7F8F7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                departmentsLoading ||
                departments.length === 0
              }
              className="rounded-xl bg-[#064B52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#04383E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
