
"use client";

import { Users, UserPlus } from "lucide-react";

interface MembersHeaderProps {
  isAdmin: boolean;
  onAddMember: () => void;
}

export default function MembersHeader({
  isAdmin,
  onAddMember,
}: MembersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCE9E9]">
            <Users className="h-5 w-5 text-[#064B52]" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-[#182124]">
              Team Members
            </h1>

            <p className="mt-1 text-sm text-[#6E7B7D]">
              Manage and view members across your teams.
            </p>
          </div>
        </div>
      </div>

      {/* ADMIN ONLY */}
      {isAdmin && (
        <button
          type="button"
          onClick={onAddMember}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#064B52] px-4 text-sm font-medium text-white transition hover:bg-[#04383E]"
        >
          <UserPlus className="h-4 w-4" />
          Add Member
        </button>
      )}
    </div>
  );
}
