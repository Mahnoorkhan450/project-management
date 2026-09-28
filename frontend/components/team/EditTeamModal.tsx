
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  X,
} from "lucide-react";

import api from "@/lib/axios";

import {
  updateTeam,
  addTeamMember,
  removeTeamMember,
  updateTeamMemberRole,
  type Team,
  type TeamRole,
  type TeamUser,
} from "@/services/teamService";

import Toast from "@/components/ui/Toast";

interface Department {
  id: number;
  name: string;
}

interface EditTeamModalProps {
  open: boolean;
  team: Team;
  departments?: Department[];
  onClose: () => void;
  onSuccess: () => void;
}

const teamRoles: TeamRole[] = [
  "MEMBER",
  "TEAM_LEAD",
  "MANAGER",
];

export default function EditTeamModal({
  open,
  team,
  departments = [],
  onClose,
  onSuccess,
}: EditTeamModalProps) {
  /* =========================================
     TEAM STATE
  ========================================= */

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [departmentId, setDepartmentId] =
    useState("");

  /* =========================================
     MEMBERS
  ========================================= */

  const [members, setMembers] = useState<
    Team["members"]
  >([]);

  const [users, setUsers] = useState<
    TeamUser[]
  >([]);

  const [selectedUserId, setSelectedUserId] =
    useState("");

  const [selectedRole, setSelectedRole] =
    useState<TeamRole>("MEMBER");

  /* =========================================
     LOADING
  ========================================= */

  const [loading, setLoading] =
    useState(false);

  const [usersLoading, setUsersLoading] =
    useState(false);

  const [memberLoading, setMemberLoading] =
    useState(false);

  /* =========================================
     ERROR
  ========================================= */

  const [error, setError] = useState("");

  /* =========================================
     TOAST
  ========================================= */

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  /* =========================================
     RESET WHEN OPEN
  ========================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    setName(team.name ?? "");

    setDescription(
      team.description ?? ""
    );

    setDepartmentId(
      team.department
        ? String(team.department.id)
        : ""
    );

    setMembers(
      Array.isArray(team.members)
        ? team.members
        : []
    );

    setSelectedUserId("");
    setSelectedRole("MEMBER");
    setError("");
    setToastMessage("");
  }, [open, team]);

  /* =========================================
     LOAD USERS
  ========================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadUsers = async () => {
      try {
        setUsersLoading(true);

        const response =
          await api.get("/users");

        const responseData =
          response.data;

        let userList: TeamUser[] = [];

        if (
          Array.isArray(responseData)
        ) {
          userList = responseData;
        } else if (
          Array.isArray(
            responseData?.data
          )
        ) {
          userList =
            responseData.data;
        } else if (
          Array.isArray(
            responseData?.data?.users
          )
        ) {
          userList =
            responseData.data.users;
        } else if (
          Array.isArray(
            responseData?.users
          )
        ) {
          userList =
            responseData.users;
        }

        setUsers(userList);
      } catch (error: any) {
        console.error(
          "Failed to load users:",
          error?.response?.data ||
            error
        );

        setUsers([]);

        showToast(
          error?.response?.data?.message ||
            "Unable to load users.",
          "error"
        );
      } finally {
        setUsersLoading(false);
      }
    };

    loadUsers();
  }, [open]);

  /* =========================================
     TOAST AUTO CLOSE
  ========================================= */

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [toastMessage]);

  /* =========================================
     TOAST HELPERS
  ========================================= */

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

  /* =========================================
     MEMBER IDS
  ========================================= */

  const memberUserIds = useMemo(() => {
    return new Set(
      members.map(
        (member) => member.userId
      )
    );
  }, [members]);

  /* =========================================
     AVAILABLE USERS
  ========================================= */

  const availableUsers = useMemo(() => {
    return users.filter(
      (user) =>
        !memberUserIds.has(user.id)
    );
  }, [users, memberUserIds]);

  /* =========================================
     UPDATE TEAM
  ========================================= */

  const submit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      showToast(
        "Team name is required.",
        "warning"
      );
      return;
    }

    if (!departmentId) {
      showToast(
        "Please select a department.",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      await updateTeam(team.id, {
        name: name.trim(),
        description:
          description.trim() ||
          undefined,
        departmentId:
          Number(departmentId),
      });

      showToast(
        "Team updated successfully.",
        "success"
      );

      onSuccess();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to update team.";

      setError(message);

      showToast(
        message,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     ADD MEMBER
  ========================================= */

  const handleAddMember = async () => {
    if (!selectedUserId) {
      showToast(
        "Please select a member.",
        "warning"
      );

      return;
    }

    try {
      setMemberLoading(true);

      const newMember =
        await addTeamMember(
          team.id,
          {
            userId:
              Number(selectedUserId),
            role: selectedRole,
          }
        );

      setMembers((current) => [
        ...current,
        newMember,
      ]);

      setSelectedUserId("");
      setSelectedRole("MEMBER");

      showToast(
        "Member added successfully.",
        "success"
      );

      onSuccess();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to add member.";

      showToast(
        message,
        "error"
      );
    } finally {
      setMemberLoading(false);
    }
  };

  /* =========================================
     REMOVE MEMBER
  ========================================= */

  const handleRemoveMember = async (
    userId: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove this member from the team?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setMemberLoading(true);

      await removeTeamMember(
        team.id,
        userId
      );

      setMembers((current) =>
        current.filter(
          (member) =>
            member.userId !== userId
        )
      );

      showToast(
        "Member removed successfully.",
        "success"
      );

      onSuccess();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to remove member.";

      showToast(
        message,
        "error"
      );
    } finally {
      setMemberLoading(false);
    }
  };

  /* =========================================
     UPDATE ROLE
  ========================================= */

  const handleRoleChange = async (
    userId: number,
    role: TeamRole
  ) => {
    try {
      setMemberLoading(true);

      const updatedMember =
        await updateTeamMemberRole(
          team.id,
          userId,
          role
        );

      setMembers((current) =>
        current.map((member) =>
          member.userId === userId
            ? {
                ...member,
                role:
                  updatedMember.role,
              }
            : member
        )
      );

      showToast(
        "Member role updated successfully.",
        "success"
      );

      onSuccess();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to update member role.";

      showToast(
        message,
        "error"
      );
    } finally {
      setMemberLoading(false);
    }
  };

  /* =========================================
     CLOSED
  ========================================= */

  if (!open) {
    return null;
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#101719]/50 p-4">
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={closeToast}
      />

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#DDE3E3] bg-white shadow-[0_20px_60px_rgba(16,23,25,0.18)]">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#EEF1F1] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-[#182124]">
              Edit Team
            </h2>

            <p className="mt-1 text-xs text-[#6E7B7D]">
              Update team information and
              manage members.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6E7B7D] transition hover:bg-[#F2F5F5] hover:text-[#182124]"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={submit}
          className="space-y-6 p-6"
        >
          {/* ERROR */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* TEAM NAME */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#182124]">
              Team name
            </label>

            <input
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-[#DDE3E3] bg-white px-4 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9]"
            />
          </div>

          {/* DEPARTMENT */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#182124]">
              Department
            </label>

            <select
              value={departmentId}
              onChange={(event) =>
                setDepartmentId(
                  event.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-[#DDE3E3] bg-white px-4 text-sm text-[#182124] outline-none transition focus:border-[#064B52]"
            >
              <option value="">
                Select department
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

            {departments.length === 0 && (
              <p className="mt-2 text-xs text-[#B42318]">
                No departments available.
              </p>
            )}
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="mb-2 block text-sm font-medium text-[#182124]">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              className="w-full resize-none rounded-xl border border-[#DDE3E3] bg-white px-4 py-3 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9]"
            />
          </div>

          {/* MEMBERS */}

          <div className="border-t border-[#EEF1F1] pt-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#182124]">
                  Team Members
                </h3>

                <p className="mt-1 text-xs text-[#6E7B7D]">
                  Manage team members and
                  their roles.
                </p>
              </div>

              <span className="rounded-full bg-[#DCE9E9] px-3 py-1 text-xs font-semibold text-[#064B52]">
                {members.length}{" "}
                {members.length === 1
                  ? "Member"
                  : "Members"}
              </span>
            </div>

            {/* CURRENT MEMBERS */}

            {members.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#DDE3E3] bg-[#F7F8F7] px-4 py-7 text-center">
                <p className="text-sm font-medium text-[#182124]">
                  No members yet
                </p>

                <p className="mt-1 text-xs text-[#6E7B7D]">
                  Add a member to this
                  team.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {members.map(
                  (member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 rounded-xl border border-[#E8ECEC] bg-[#FAFBFB] p-3"
                    >
                      {/* AVATAR */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCE9E9] text-sm font-semibold text-[#064B52]">
                        {member.user.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      {/* USER */}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#182124]">
                          {member.user.name}
                        </p>

                        <p className="truncate text-xs text-[#6E7B7D]">
                          {member.user.email}
                        </p>
                      </div>

                      {/* ROLE */}

                      <select
                        value={
                          member.role
                        }
                        disabled={
                          memberLoading
                        }
                        onChange={(
                          event
                        ) =>
                          handleRoleChange(
                            member.userId,
                            event.target
                              .value as TeamRole
                          )
                        }
                        className="h-9 rounded-lg border border-[#DDE3E3] bg-white px-2 text-xs font-medium text-[#182124] outline-none focus:border-[#064B52]"
                      >
                        {teamRoles.map(
                          (role) => (
                            <option
                              key={role}
                              value={role}
                            >
                              {role
                                .replace(
                                  "_",
                                  " "
                                )
                                .toLowerCase()
                                .replace(
                                  /\b\w/g,
                                  (char) =>
                                    char.toUpperCase()
                                )}
                            </option>
                          )
                        )}
                      </select>

                      {/* REMOVE */}

                      <button
                        type="button"
                        disabled={
                          memberLoading
                        }
                        onClick={() =>
                          handleRemoveMember(
                            member.userId
                          )
                        }
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#B42318] transition hover:bg-[#FFF1F1] disabled:cursor-not-allowed disabled:opacity-50"
                        title="Remove member"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}

            {/* ADD MEMBER */}

            <div className="mt-4 rounded-xl border border-[#DDE3E3] bg-[#F7F8F7] p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52]">
                  <Plus size={15} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#182124]">
                    Add Member
                  </p>

                  <p className="text-xs text-[#6E7B7D]">
                    Add another user to
                    this team.
                  </p>
                </div>
              </div>

              {usersLoading ? (
                <div className="rounded-xl border border-[#DDE3E3] bg-white px-4 py-3 text-sm text-[#6E7B7D]">
                  Loading users...
                </div>
              ) : users.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#DDE3E3] bg-white px-4 py-4 text-center">
                  <p className="text-sm font-medium text-[#182124]">
                    No users available
                  </p>

                  <p className="mt-1 text-xs text-[#6E7B7D]">
                    No users were returned
                    from the users API.
                  </p>
                </div>
              ) : availableUsers.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#DDE3E3] bg-white px-4 py-4 text-center">
                  <p className="text-sm font-medium text-[#182124]">
                    All users are already
                    members
                  </p>

                  <p className="mt-1 text-xs text-[#6E7B7D]">
                    There are no additional
                    users to add.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-[1fr_150px_auto]">
                  {/* USER */}

                  <select
                    value={selectedUserId}
                    disabled={
                      memberLoading
                    }
                    onChange={(event) =>
                      setSelectedUserId(
                        event.target.value
                      )
                    }
                    className="h-10 rounded-xl border border-[#DDE3E3] bg-white px-3 text-sm text-[#182124] outline-none focus:border-[#064B52]"
                  >
                    <option value="">
                      Select member
                    </option>

                    {availableUsers.map(
                      (user) => (
                        <option
                          key={user.id}
                          value={user.id}
                        >
                          {user.name} —{" "}
                          {user.email}
                        </option>
                      )
                    )}
                  </select>

                  {/* ROLE */}

                  <select
                    value={selectedRole}
                    disabled={
                      memberLoading
                    }
                    onChange={(event) =>
                      setSelectedRole(
                        event.target
                          .value as TeamRole
                      )
                    }
                    className="h-10 rounded-xl border border-[#DDE3E3] bg-white px-3 text-sm text-[#182124] outline-none focus:border-[#064B52]"
                  >
                    {teamRoles.map(
                      (role) => (
                        <option
                          key={role}
                          value={role}
                        >
                          {role
                            .replace(
                              "_",
                              " "
                            )
                            .toLowerCase()
                            .replace(
                              /\b\w/g,
                              (char) =>
                                char.toUpperCase()
                            )}
                        </option>
                      )
                    )}
                  </select>

                  {/* ADD */}

                  <button
                    type="button"
                    disabled={
                      memberLoading ||
                      !selectedUserId
                    }
                    onClick={
                      handleAddMember
                    }
                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#064B52] px-4 text-sm font-semibold text-white transition hover:bg-[#04383E] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-3 border-t border-[#EEF1F1] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DDE3E3] px-5 py-2.5 text-sm font-medium text-[#182124] transition hover:bg-[#F7F8F7]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#064B52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#04383E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
