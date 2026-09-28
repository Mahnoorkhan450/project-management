"use client";

import {
  ClipboardList,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface MemberStatsProps {
  assigned: number;
  completed: number;
  pending: number;
}

export default function MemberStats({
  assigned,
  completed,
  pending,
}: MemberStatsProps) {
  const stats = [
    {
      label: "Assigned Tasks",
      value: assigned,
      icon: ClipboardList,
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-[#DDE3E3] bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCE9E9]">
                <Icon className="h-4 w-4 text-[#064B52]" />
              </div>

              <span className="text-xl font-semibold text-[#182124]">
                {stat.value}
              </span>
            </div>

            <p className="mt-3 text-xs font-medium text-[#6E7B7D]">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}