
"use client";

import {
  ClipboardList,
  FolderKanban,
  Users,
} from "lucide-react";

import type { DashboardActivity } from "@/services/dashboardService";

interface TeamActivityProps {
  activities?: DashboardActivity[];
}

export default function TeamActivity({
  activities = [],
}: TeamActivityProps) {
  const visibleActivities = activities.slice(0, 4);

  const formatDate = (date: string) => {
    const activityDate = new Date(date);

    if (Number.isNaN(activityDate.getTime())) {
      return "";
    }

    return activityDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-[#DDE3E3] bg-white">
      {/* Header */}
      <div className="border-b border-[#DDE3E3] px-5 py-4">
        <h2 className="text-base font-semibold text-[#182124]">
          Team activity
        </h2>

        <p className="mt-1 text-xs text-[#6E7B7D]">
          Recent updates from your team
        </p>
      </div>

      {/* Activity List */}
      {visibleActivities.length > 0 ? (
        <div className="px-5 py-4">
          <div className="space-y-1">
            {visibleActivities.map((activity, index) => {
              const isProject = activity.type === "PROJECT";

              const Icon = isProject
                ? FolderKanban
                : ClipboardList;

              return (
                <div
                  key={activity.id}
                  className="group relative flex gap-3.5 rounded-xl px-2 py-3 transition hover:bg-[#F7F8F7]"
                >
                  {/* Timeline */}
                  {index < visibleActivities.length - 1 && (
                    <div className="absolute left-[21px] top-[46px] h-[calc(100%-22px)] w-px bg-[#DDE3E3]" />
                  )}

                  {/* Activity Icon */}
                  <div
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isProject
                        ? "bg-[#E8F2F2] text-[#064B52]"
                        : "bg-[#EEF3F8] text-[#47657A]"
                    }`}
                  >
                    <Icon
                      className="h-[17px] w-[17px]"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Activity Content */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 text-sm font-medium leading-5 text-[#182124]">
                        {activity.title}
                      </p>

                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                          isProject
                            ? "bg-[#E8F2F2] text-[#064B52]"
                            : "bg-[#EEF3F8] text-[#47657A]"
                        }`}
                      >
                        {isProject ? "Project" : "Task"}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#7B888A]">
                      <span className="font-medium text-[#526164]">
                        {activity.user.name}
                      </span>

                      <span className="text-[#C1C9CA]">
                        •
                      </span>

                      <span>
                        {formatDate(activity.date)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="px-5 py-10">
          <div className="rounded-xl border border-dashed border-[#DDE3E3] bg-[#F8FAFA] px-5 py-9 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#064B52] shadow-sm">
              <Users className="h-5 w-5" />
            </div>

            <p className="mt-3 text-sm font-semibold text-[#182124]">
              No recent activity
            </p>

            <p className="mx-auto mt-1 max-w-[220px] text-xs leading-5 text-[#7B888A]">
              Team updates and project activity will appear here.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
