
"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import type { DashboardDeadline } from "@/services/dashboardService";

interface UpcomingDeadlinesProps {
  deadlines?: DashboardDeadline[];
}

function formatDate(value?: string) {
  if (!value) return "No date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "No date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function UpcomingDeadlines({
  deadlines = [],
}: UpcomingDeadlinesProps) {
  const visibleDeadlines = deadlines.slice(0, 4);

  return (
    <section className="rounded-xl border border-[#DDE3E3] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE3E3] px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#182124]">
            Upcoming deadlines
          </h2>

          <p className="mt-1 text-xs text-[#6E7B7D]">
            Stay ahead of important dates
          </p>
        </div>

        <Link
          href="/tasks"
          className="text-[#064B52] hover:text-[#04383E]"
          aria-label="View all deadlines"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Deadlines */}
      <div className="divide-y divide-[#DDE3E3]">
        {visibleDeadlines.length > 0 ? (
          visibleDeadlines.map((deadline) => (
            <Link
              key={deadline.id}
              href={`/tasks/${deadline.id}`}
              className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-[#F7F8F7]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52]">
                <CalendarDays className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#182124]">
                  {deadline.title}
                </p>

                <p className="mt-0.5 text-xs text-[#6E7B7D]">
                  {formatDate(deadline.dueDate)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-[#182124]">
              No upcoming deadlines
            </p>

            <p className="mt-1 text-xs text-[#6E7B7D]">
              You are all caught up.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
