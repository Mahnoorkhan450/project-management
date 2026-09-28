
"use client";

import { FolderKanban } from "lucide-react";

import type { DashboardTeamMember } from "@/services/dashboardService";

interface WelcomeSectionProps {
  userName?: string;
  members?: DashboardTeamMember[];
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

export default function WelcomeSection({
  userName = "there",
  members = [],
}: WelcomeSectionProps) {
  const visibleMembers = members.slice(0, 5);
  const remainingMembers =
    members.length > 5 ? members.length - 5 : 0;

  return (
    <section className="rounded-xl border border-[#DDE3E3] bg-[#064B52] px-6 py-6 text-white">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Welcome Content */}
        <div className="max-w-2xl">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <FolderKanban className="h-5 w-5" />
          </div>

          <p className="text-sm font-medium text-white/70">
            Welcome back
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Good to see you, {userName}.
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
            Keep your projects organized, stay on top of your tasks,
            and keep your team moving forward.
          </p>
        </div>

        {/* Team Members */}
        <div className="flex shrink-0 items-center">
          {visibleMembers.length > 0 ? (
            <div className="flex items-center">
              {visibleMembers.map((member, index) => (
                <div
                  key={member.id}
                  title={`${member.name} • ${member.email}`}
                  className={`relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#064B52] bg-[#DCE9E9] ${
                    index > 0 ? "-ml-2" : ""
                  }`}
                >
                  {member.profileImage ? (
                    <img
                      src={member.profileImage}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#DCE9E9] text-xs font-semibold text-[#064B52]">
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>
              ))}

              {remainingMembers > 0 && (
                <div
                  title={`${remainingMembers} more members`}
                  className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#064B52] bg-white/15 text-xs font-semibold text-white"
                >
                  +{remainingMembers}
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-white/60">
              No team members
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
