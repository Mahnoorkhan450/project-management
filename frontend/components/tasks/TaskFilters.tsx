
"use client";

import type { TaskStatus } from "@/types/task";

interface TaskFiltersProps {
  status: TaskStatus | "ALL";
  onStatusChange: (
    status: TaskStatus | "ALL"
  ) => void;
}

const filters: {
  label: string;
  value: TaskStatus | "ALL";
}[] = [
  {
    label: "All Tasks",
    value: "ALL",
  },
  {
    label: "To Do",
    value: "TODO",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
];

export default function TaskFilters({
  status,
  onStatusChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        const active =
          status === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() =>
              onStatusChange(
                filter.value
              )
            }
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-[#064B52] text-white shadow-sm"
                : "border border-[#DDE3E3] bg-white text-[#6E7B7D] hover:border-[#B9C8C9] hover:bg-[#F1F4F4] hover:text-[#064B52]"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
