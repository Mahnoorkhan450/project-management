"use client";

import { useState } from "react";
import Link from "next/link";
import {
MoreHorizontal,
UserMinus,
UserRound,
} from "lucide-react";

import {
removeTeamMember,
updateTeamMemberRole,
type TeamMember,
type TeamRole,
} from "@/services/teamService";

import MemberAvatar from "./MemberAvatar";

interface TeamMembersProps {
teamId: number;
members: TeamMember[];
onChanged: () => void;
}

const roleLabel: Record<TeamRole, string> = {
MEMBER: "Member",
TEAM_LEAD: "Team Lead",
MANAGER: "Manager",
};

export default function TeamMembers({
teamId,
members,
onChanged,
}: TeamMembersProps) {
const [openMenu, setOpenMenu] =
useState<number | null>(null);

const [loadingId, setLoadingId] =
useState<number | null>(null);

const [error, setError] = useState("");

const changeRole = async (
userId: number,
role: TeamRole
) => {
try {
setLoadingId(userId);
setError("");
setOpenMenu(null);


  await updateTeamMemberRole(
    teamId,
    userId,
    role
  );

  onChanged();
} catch (error: any) {
  setError(
    error?.response?.data?.message ||
      "Unable to update role."
  );
} finally {
  setLoadingId(null);
}


};

const removeMember = async (
userId: number
) => {
const confirmed = window.confirm(
"Remove this member from the team?"
);


if (!confirmed) return;

try {
  setLoadingId(userId);
  setError("");
  setOpenMenu(null);

  await removeTeamMember(
    teamId,
    userId
  );

  onChanged();
} catch (error: any) {
  setError(
    error?.response?.data?.message ||
      "Unable to remove member."
  );
} finally {
  setLoadingId(null);
}


};

if (members.length === 0) {
return ( <div className="rounded-2xl border border-dashed border-[#C9D4D4] bg-white px-6 py-12 text-center"> <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#DCE9E9] text-[#064B52]"> <UserRound size={20} /> </div>


    <h3 className="mt-4 font-semibold text-[#182124]">
      No team members
    </h3>

    <p className="mt-2 text-sm text-[#6E7B7D]">
      Add members to start collaborating.
    </p>
  </div>
);


}

return ( <div>
{error && ( <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
{error} </div>
)}


  <div className="overflow-hidden rounded-2xl border border-[#DDE3E3] bg-white">
    {members.map((member, index) => (
      <div
        key={member.id}
        className={`relative flex items-center gap-4 px-5 py-4 sm:px-6 ${
          index !== members.length - 1
            ? "border-b border-[#EEF1F1]"
            : ""
        }`}
      >
        {/* Avatar */}

        <Link
          href={`/team/${teamId}/member/${member.userId}`}
          className="shrink-0"
          title={`View ${member.user.name}`}
        >
          <MemberAvatar
            name={member.user.name}
            size="md"
          />
        </Link>

        {/* Member Info */}

        <div className="min-w-0 flex-1">
          <Link
            href={`/team/${teamId}/member/${member.userId}`}
            className="block truncate text-sm font-semibold text-[#182124] transition hover:text-[#064B52]"
          >
            {member.user.name}
          </Link>

          <p className="mt-0.5 truncate text-xs text-[#6E7B7D]">
            {member.user.email}
          </p>
        </div>

        {/* Role */}

        <div className="hidden sm:block">
          <span
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
              member.role === "MANAGER"
                ? "bg-[#EAF1F1] text-[#064B52]"
                : member.role === "TEAM_LEAD"
                ? "bg-[#DCE9E9] text-[#064B52]"
                : "bg-[#F1F4F4] text-[#6E7B7D]"
            }`}
          >
            {roleLabel[member.role]}
          </span>
        </div>

        {/* Actions */}

        <div className="relative">
          <button
            type="button"
            disabled={
              loadingId === member.userId
            }
            onClick={() =>
              setOpenMenu(
                openMenu === member.userId
                  ? null
                  : member.userId
              )
            }
            className="rounded-lg p-2 text-[#7C888A] transition hover:bg-[#F3F5F5] hover:text-[#182124] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Member options"
          >
            <MoreHorizontal size={18} />
          </button>

          {openMenu === member.userId && (
            <div className="absolute right-0 top-10 z-20 w-52 rounded-xl border border-[#DDE3E3] bg-white p-1.5 shadow-xl">
              {/* View Details */}

              <Link
                href={`/team/${teamId}/member/${member.userId}`}
                onClick={() =>
                  setOpenMenu(null)
                }
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#182124] hover:bg-[#F2F5F5]"
              >
                <UserRound size={14} />
                View details
              </Link>

              <div className="my-1 border-t border-[#EEF1F1]" />

              {/* Change Role */}

              <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#8A9597]">
                Change role
              </p>

              {(
                [
                  "MEMBER",
                  "TEAM_LEAD",
                  "MANAGER",
                ] as TeamRole[]
              ).map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() =>
                    changeRole(
                      member.userId,
                      role
                    )
                  }
                  className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-medium text-[#182124] hover:bg-[#F2F5F5]"
                >
                  {roleLabel[role]}

                  {member.role === role && (
                    <span className="ml-auto font-bold text-[#064B52]">
                      ✓
                    </span>
                  )}
                </button>
              ))}

              <div className="my-1 border-t border-[#EEF1F1]" />

              {/* Remove */}

              <button
                type="button"
                onClick={() =>
                  removeMember(
                    member.userId
                  )
                }
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <UserMinus size={14} />
                Remove member
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>


);
}
