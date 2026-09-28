"use client";

import { useEffect, useState } from "react";
import { UserPlus, X } from "lucide-react";

import useTeams from "@/hooks/useTeams";
import useUserList from "@/hooks/useUserList";

import type { TeamRole } from "@/services/teamService";

interface AddMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddMemberModal({
  open,
  onClose,
  onSuccess,
}: AddMemberModalProps) {
  const {
    teams,
    loading: teamsLoading,
    error: teamsError,
    addMember,
    actionLoading,
  } = useTeams();

  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useUserList(open);

  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [role, setRole] =
    useState<TeamRole>("MEMBER");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setSelectedTeam("");
      setSelectedUser("");
      setRole("MEMBER");
      setError("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedTeam || !selectedUser) {
      setError("Please select a team and user.");
      return;
    }

    try {
      setError("");

      await addMember(Number(selectedTeam), {
        userId: Number(selectedUser),
        role,
      });

      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to add team member."
      );
    }
  };

  const displayError =
    error || teamsError || usersError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DDE3E3] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCE9E9] text-[#064B52]">
              <UserPlus size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#182124]">
                Add Team Member
              </h2>

              <p className="text-sm text-[#6E7B7D]">
                Add a user to a team
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#6E7B7D] transition hover:bg-[#F1F4F4] hover:text-[#182124]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-6"
        >
          {/* Team */}
          <div>
            <label
              htmlFor="team"
              className="mb-2 block text-sm font-medium text-[#182124]"
            >
              Team
            </label>

            <select
              id="team"
              value={selectedTeam}
              onChange={(event) =>
                setSelectedTeam(event.target.value)
              }
              disabled={teamsLoading || actionLoading}
              className="w-full rounded-lg border border-[#DDE3E3] bg-white px-3 py-2.5 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10"
            >
              <option value="">
                {teamsLoading
                  ? "Loading teams..."
                  : "Select team"}
              </option>

              {teams.map((team) => (
                <option
                  key={team.id}
                  value={team.id}
                >
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* User */}
          <div>
            <label
              htmlFor="user"
              className="mb-2 block text-sm font-medium text-[#182124]"
            >
              User
            </label>

            <select
              id="user"
              value={selectedUser}
              onChange={(event) =>
                setSelectedUser(event.target.value)
              }
              disabled={usersLoading || actionLoading}
              className="w-full rounded-lg border border-[#DDE3E3] bg-white px-3 py-2.5 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10"
            >
              <option value="">
                {usersLoading
                  ? "Loading users..."
                  : "Select user"}
              </option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name} — {user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-[#182124]"
            >
              Team Role
            </label>

            <select
              id="role"
              value={role}
              onChange={(event) =>
                setRole(
                  event.target.value as TeamRole
                )
              }
              disabled={actionLoading}
              className="w-full rounded-lg border border-[#DDE3E3] bg-white px-3 py-2.5 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10"
            >
              <option value="MEMBER">
                Member
              </option>

              <option value="TEAM_LEAD">
                Team Lead
              </option>

              <option value="MANAGER">
                Manager
              </option>
            </select>
          </div>

          {/* Error */}
          {displayError && (
            <div
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              role="alert"
            >
              {displayError}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={actionLoading}
              className="rounded-lg border border-[#DDE3E3] px-4 py-2.5 text-sm font-medium text-[#182124] transition hover:bg-[#F5F7F7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                actionLoading ||
                !selectedTeam ||
                !selectedUser
              }
              className="rounded-lg bg-[#064B52] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#04383E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {actionLoading
                ? "Adding..."
                : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}