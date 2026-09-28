
"use client";

import { useEffect, useState } from "react";
import { X, Users, ShieldCheck } from "lucide-react";

import api from "@/lib/axios";

import {
  addTeamMember,
  type TeamRole,
} from "@/services/teamService";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersResponse {
  success: boolean;
  count: number;
  users: User[];
}

interface AddMemberModalProps {
  open: boolean;
  teamId: number;
  existingUserIds: number[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddMemberModal({
  open,
  teamId,
  existingUserIds,
  onClose,
  onSuccess,
}: AddMemberModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<TeamRole>("MEMBER");

  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD USERS
  // ==========================================

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadUsers = async () => {
      try {
        setLoadingUsers(true);
        setError("");

        const response =
          await api.get<UsersResponse>("/users");

        console.log(
          "USERS API RESPONSE:",
          response.data
        );

        const userList = response.data?.users ?? [];

        console.log(
          "USERS LIST:",
          userList
        );

        setUsers(userList);
      } catch (error: any) {
        console.error(
          "LOAD USERS ERROR:",
          error?.response?.data || error
        );

        setUsers([]);

        setError(
          error?.response?.data?.message ||
            "Unable to load users."
        );
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, [open, teamId]);

  // ==========================================
  // RESET FORM
  // ==========================================

  useEffect(() => {
    if (!open) {
      setUserId("");
      setRole("MEMBER");
      setError("");
      setUsers([]);
      setLoadingUsers(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  // ==========================================
  // FILTER EXISTING MEMBERS
  // ==========================================

  const availableUsers = users.filter(
    (user) =>
      !existingUserIds.includes(user.id)
  );

  // ==========================================
  // SUBMIT
  // ==========================================

  const submit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!userId) {
      setError("Please select a user.");
      return;
    }

    try {
      setLoading(true);

      await addTeamMember(teamId, {
        userId: Number(userId),
        role,
      });

      setUserId("");
      setRole("MEMBER");

      await onSuccess();

      onClose();
    } catch (error: any) {
      console.error(
        "ADD MEMBER ERROR:",
        error?.response?.data || error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to add member."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101719]/45 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#DDE3E3] bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#EEF1F1] px-6 py-5">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCE9E9] text-[#064B52]">
              <Users size={19} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#182124]">
                Add Team Member
              </h2>

              <p className="mt-1 text-xs text-[#6E7B7D]">
                Add an existing workspace user.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-[#6E7B7D] transition hover:bg-[#F2F5F5] hover:text-[#182124] disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={submit}
          className="space-y-5 p-6"
        >

          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* USER */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#182124]">
              User
            </label>

            <div className="relative">

              <Users
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9597]"
              />

              <select
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value)
                }
                disabled={
                  loadingUsers || loading
                }
                className="h-11 w-full appearance-none rounded-xl border border-[#DDE3E3] bg-white pl-11 pr-4 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9] disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
              >

                <option value="">
                  {loadingUsers
                    ? "Loading users..."
                    : availableUsers.length === 0
                    ? "No available users"
                    : "Select user"}
                </option>

                {availableUsers.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name} — {user.email}
                  </option>
                ))}

              </select>

            </div>

            {!loadingUsers &&
              users.length === 0 &&
              !error && (
                <p className="mt-2 text-xs text-red-500">
                  No users found.
                </p>
              )}

            {!loadingUsers &&
              users.length > 0 &&
              availableUsers.length === 0 && (
                <p className="mt-2 text-xs text-[#6E7B7D]">
                  All users are already members
                  of this team.
                </p>
              )}
          </div>

          {/* TEAM ROLE */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#182124]">
              Team Role
            </label>

            <div className="relative">

              <ShieldCheck
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9597]"
              />

              <select
                value={role}
                onChange={(e) =>
                  setRole(
                    e.target.value as TeamRole
                  )
                }
                disabled={loading}
                className="h-11 w-full appearance-none rounded-xl border border-[#DDE3E3] bg-white pl-11 pr-4 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9] disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
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
          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-3 border-t border-[#EEF1F1] pt-5">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-[#DDE3E3] px-5 py-2.5 text-sm font-medium text-[#182124] transition hover:bg-[#F7F8F7] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                loadingUsers ||
                !userId
              }
              className="rounded-xl bg-[#064B52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#04383E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Adding..."
                : "Add Member"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
