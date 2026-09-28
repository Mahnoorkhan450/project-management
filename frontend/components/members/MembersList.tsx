
"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Globe2,
  Headphones,
  Megaphone,
  Palette,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import MemberAvatar from "./MemberAvatar";

import type { MemberItem } from "@/hooks/useTeamMembers";

interface MembersListProps {
  members: MemberItem[];
  selectedMember: MemberItem | null;
  onSelect: (member: MemberItem) => void;
}

/* =========================================
   ROLE LABELS
========================================= */

const roleLabels: Record<string, string> = {
  MEMBER: "Member",
  TEAM_LEAD: "Team Lead",
  MANAGER: "Manager",
};

/* =========================================
   ROLE STYLES
========================================= */

const roleStyles: Record<string, string> = {
  MEMBER:
    "bg-[#F2F5F5] text-[#536163]",

  TEAM_LEAD:
    "bg-[#E2EEEE] text-[#064B52]",

  MANAGER:
    "bg-[#E8EFF0] text-[#04383E]",
};

/* =========================================
   TEAM VISUALS
========================================= */

const teamVisuals = [
  {
    icon: Code2,
    background: "bg-[#E8F5F3]",
    color: "text-[#087F78]",
  },

  {
    icon: Palette,
    background: "bg-[#F0EBFA]",
    color: "text-[#7653A8]",
  },

  {
    icon: Megaphone,
    background: "bg-[#FFF3E2]",
    color: "text-[#C77A20]",
  },

  {
    icon: BriefcaseBusiness,
    background: "bg-[#EAF0FA]",
    color: "text-[#4C6FA9]",
  },

  {
    icon: BarChart3,
    background: "bg-[#EAF5EB]",
    color: "text-[#438451]",
  },

  {
    icon: Headphones,
    background: "bg-[#FBEAF1]",
    color: "text-[#B15478]",
  },

  {
    icon: ShieldCheck,
    background: "bg-[#E9F2F5]",
    color: "text-[#39798B]",
  },

  {
    icon: Globe2,
    background: "bg-[#EAF0F9]",
    color: "text-[#5675A5]",
  },

  {
    icon: UsersRound,
    background: "bg-[#F1ECF8]",
    color: "text-[#75549B]",
  },
];

/* =========================================
   COMPONENT
========================================= */

export default function MembersList({
  members,
  selectedMember,
  onSelect,
}: MembersListProps) {
  if (!members.length) {
    return null;
  }

  /* =========================================
     GROUP MEMBERS BY TEAM
  ========================================= */

  const teams = members.reduce<
    Record<
      string,
      {
        id: number;
        name: string;
        members: MemberItem[];
      }
    >
  >((groups, member) => {
    const key = String(member.teamId);

    if (!groups[key]) {
      groups[key] = {
        id: member.teamId,
        name: member.teamName,
        members: [],
      };
    }

    groups[key].members.push(member);

    return groups;
  }, {});

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="space-y-9">
      {Object.values(teams).map(
        (team, teamIndex) => {
          const visual =
            teamVisuals[
              teamIndex % teamVisuals.length
            ];

          const TeamIcon = visual.icon;

          return (
            <section key={team.id}>
              {/* ==================================
                  TEAM TITLE
              ================================== */}

              <div className="mb-3 flex items-center gap-3 px-1">
                {/* Icon */}

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${visual.background} ${visual.color}`}
                >
                  <TeamIcon className="h-[17px] w-[17px]" />
                </div>

                {/* Team Information */}

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm font-semibold text-[#182124]">
                      {team.name}
                    </h2>

                    <span className="h-1 w-1 rounded-full bg-[#B8C0C1]" />

                    <span className="text-[11px] font-medium text-[#8A9597]">
                      {team.members.length}{" "}
                      {team.members.length === 1
                        ? "member"
                        : "members"}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[11px] text-[#9AA4A6]">
                    Team directory
                  </p>
                </div>
              </div>

              {/* ==================================
                  DIRECTORY
              ================================== */}

              <div className="overflow-hidden rounded-xl bg-white ring-1 ring-[#E2E7E7]">
                {/* ==================================
                    TABLE HEADER
                ================================== */}

                <div className="hidden grid-cols-[64px_minmax(260px,1.5fr)_minmax(220px,1fr)_150px_32px] items-center gap-4 bg-[#F8F9F9] px-5 py-3 md:grid">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8B9698]">
                    #
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8B9698]">
                    Member
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8B9698]">
                    Email
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8B9698]">
                    Role
                  </span>

                  <span />
                </div>

                {/* ==================================
                    MEMBERS
                ================================== */}

                {team.members.map(
                  (member, index) => {
                    const selected =
                      selectedMember?.id ===
                        member.id &&
                      selectedMember?.teamId ===
                        member.teamId;

                    return (
                      <button
                        key={`${team.id}-${member.id}`}
                        type="button"
                        onClick={() =>
                          onSelect(member)
                        }
                        className={`group grid w-full grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 text-left transition md:grid-cols-[64px_minmax(260px,1.5fr)_minmax(220px,1fr)_150px_32px] md:gap-4 md:px-5 ${
                          index <
                          team.members.length - 1
                            ? "border-b border-[#EEF1F1]"
                            : ""
                        } ${
                          selected
                            ? "bg-[#F0F7F7]"
                            : "hover:bg-[#FAFBFB]"
                        }`}
                      >
                        {/* Number */}

                        <span className="text-xs font-medium tabular-nums text-[#9BA5A7]">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        {/* Member */}

                        <div className="flex min-w-0 items-center gap-3">
                          <MemberAvatar
                            name={member.name}
                            size="md"
                          />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#182124]">
                              {member.name}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-[#7A8789]">
                              Team member
                            </p>
                          </div>
                        </div>

                        {/* Email */}

                        <div className="hidden min-w-0 md:block">
                          <p className="truncate text-xs text-[#657274]">
                            {member.email}
                          </p>
                        </div>

                        {/* Desktop Role */}

                        <div className="hidden md:block">
                          <span
                            className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-semibold ${
                              roleStyles[
                                member.role
                              ] ??
                              "bg-[#F2F5F5] text-[#536163]"
                            }`}
                          >
                            {roleLabels[
                              member.role
                            ] ??
                              member.role}
                          </span>
                        </div>

                        {/* Mobile Role */}

                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-semibold md:hidden ${
                            roleStyles[
                              member.role
                            ] ??
                            "bg-[#F2F5F5] text-[#536163]"
                          }`}
                        >
                          {roleLabels[
                            member.role
                          ] ??
                            member.role}
                        </span>

                        {/* Arrow */}

                        <ChevronRight
                          className={`hidden h-4 w-4 shrink-0 transition-all md:block ${
                            selected
                              ? "translate-x-0.5 text-[#064B52]"
                              : "text-[#A4AEAF] group-hover:translate-x-0.5 group-hover:text-[#064B52]"
                          }`}
                        />
                      </button>
                    );
                  }
                )}
              </div>
            </section>
          );
        }
      )}
    </div>
  );
}
