
"use client";

import {
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  Users,
} from "lucide-react";

import type { DashboardStats } from "@/services/dashboardService";

interface StatsCardsProps {
  stats: DashboardStats;
}

const cards = [
  {
    key: "projects",
    label: "Total projects",
    icon: FolderKanban,
    iconBg: "bg-[#E8F2F2]",
    iconColor: "text-[#08727A]",
  },
  {
    key: "tasks",
    label: "Total tasks",
    icon: ClipboardList,
    iconBg: "bg-[#EEF0F8]",
    iconColor: "text-[#5B61A8]",
  },
  {
    key: "teamMembers",
    label: "Team members",
    icon: Users,
    iconBg: "bg-[#F8EEEE]",
    iconColor: "text-[#B45F6B]",
  },
  {
    key: "completion",
    label: "Completion",
    icon: CheckCircle2,
    iconBg: "bg-[#EAF5EF]",
    iconColor: "text-[#37845B]",
    suffix: "%",
  },
] as const;

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

export default function StatsCards({
  stats,
}: StatsCardsProps) {
  const members = stats.members ?? [];

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key];

        return (
          <div
            key={card.key}
            className="rounded-xl border border-[#DDE3E3] bg-white p-4 transition-shadow duration-200 hover:shadow-sm"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-[#6E7B7D]">
                  {card.label}
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight text-[#182124]">
                  {value}
                  {"suffix" in card ? card.suffix : ""}
                </p>
              </div>

              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
              >
                <Icon
                  className="h-[18px] w-[18px]"
                  strokeWidth={2}
                />
              </div>
            </div>

            {/* Team Members */}
            {card.key === "teamMembers" && (
              <div className="mt-4">
                {members.length > 0 ? (
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {members.slice(0, 5).map((member, index) => (
                        <div
                          key={member.id}
                          title={`${member.name} • ${member.email}`}
                          className={`relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-[#DCE9E9] ${
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
                            <div className="flex h-full w-full items-center justify-center bg-[#DCE9E9] text-[10px] font-semibold text-[#064B52]">
                              {getInitials(member.name)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {members.length > 5 && (
                      <div
                        title={`${members.length - 5} more members`}
                        className="-ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#EEF2F2] text-[10px] font-semibold text-[#526164]"
                      >
                        +{members.length - 5}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-[#8A9698]">
                    No members yet
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
