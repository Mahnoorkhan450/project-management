
"use client";

import Link from "next/link";
import { ArrowRight, CheckSquare } from "lucide-react";

import type { DashboardTask } from "@/services/dashboardService";

interface MyWorkProps {
  tasks?: DashboardTask[];
}

const priorityStyle: Record<string, string> = {
  HIGH: "bg-red-50 text-red-600",
  MEDIUM: "bg-amber-50 text-amber-600",
  LOW: "bg-[#DCE9E9] text-[#064B52]",
};

export default function MyWork({
  tasks = [],
}: MyWorkProps) {
  const visibleTasks = tasks.slice(0, 5);

  return (
    <section className="rounded-xl border border-[#DDE3E3] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE3E3] px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#182124]">
            My work
          </h2>

          <p className="mt-1 text-xs text-[#6E7B7D]">
            Tasks that need your attention
          </p>
        </div>

        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#064B52] hover:underline"
        >
          View all

          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Tasks */}
      <div className="divide-y divide-[#DDE3E3]">
        {visibleTasks.length > 0 ? (
          visibleTasks.map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="flex items-center justify-between gap-4 px-5 py-3.5 transition hover:bg-[#F7F8F7]"
            >
              {/* Task information */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52]">
                  <CheckSquare className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#182124]">
                    {task.title}
                  </p>

                  <p className="mt-0.5 text-xs capitalize text-[#6E7B7D]">
                    {task.status.replaceAll("_", " ").toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Priority */}
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  priorityStyle[task.priority] ??
                  "bg-[#F7F8F7] text-[#6E7B7D]"
                }`}
              >
                {task.priority}
              </span>
            </Link>
          ))
        ) : (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-[#182124]">
              No tasks yet
            </p>

            <p className="mt-1 text-xs text-[#6E7B7D]">
              Your assigned work will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
