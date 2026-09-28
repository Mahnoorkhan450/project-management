
"use client";

import {
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";

import type { TaskDistribution } from "@/services/dashboardService";

interface TaskSummaryProps {
  distribution: TaskDistribution;
}

export default function TaskSummary({
  distribution,
}: TaskSummaryProps) {
  const items = [
    {
      label: "To do",
      value: distribution.TODO,
      icon: ListTodo,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      border: "border-sky-100",
    },
    {
      label: "In progress",
      value: distribution.IN_PROGRESS,
      icon: Clock3,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      border: "border-amber-100",
    },
    {
      label: "Completed",
      value: distribution.COMPLETED,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      border: "border-emerald-100",
    },
  ];

  const total =
    distribution.TODO +
    distribution.IN_PROGRESS +
    distribution.COMPLETED;

  const completionPercentage =
    total > 0
      ? Math.round(
          (distribution.COMPLETED / total) * 100
        )
      : 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-[#DDE3E3] bg-white">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#DDE3E3] px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#182124]">
            Task summary
          </h2>

          <p className="mt-1 text-xs text-[#6E7B7D]">
            Current task distribution
          </p>
        </div>

        <div className="rounded-full bg-[#EEF5F5] px-2.5 py-1">
          <span className="text-[10px] font-semibold text-[#064B52]">
            {total} total
          </span>
        </div>
      </div>

      {/* Task Items */}
      <div className="p-4">
        <div className="space-y-2.5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-xl border ${item.border} bg-[#FCFDFD] px-3.5 py-3 transition hover:shadow-sm`}
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor}`}
                  >
                    <Icon
                      className="h-[17px] w-[17px]"
                      strokeWidth={2}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#182124]">
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#8A9698]">
                      {item.label === "To do"
                        ? "Tasks waiting to start"
                        : item.label === "In progress"
                          ? "Currently being worked on"
                          : "Successfully completed"}
                    </p>
                  </div>
                </div>

                {/* Number */}
                <span className="text-base font-semibold text-[#182124]">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Overall Progress */}
        <div className="mt-4 rounded-xl bg-[#F3F7F7] px-3.5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6E7B7D]">
              Overall progress
            </span>

            <span className="text-xs font-bold text-[#064B52]">
              {completionPercentage}%
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#DCE5E5]">
            <div
              className="h-full rounded-full bg-[#064B52] transition-all duration-500"
              style={{
                width: `${completionPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
