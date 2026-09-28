"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import type { ProjectStatus } from "@/types/project";

interface ProjectFiltersProps {
  search: string;
  status: ProjectStatus | "ALL";
  onSearchChange: (value: string) => void;
  onStatusChange: (
    value: ProjectStatus | "ALL"
  ) => void;
}

const filters: {
  label: string;
  value: ProjectStatus | "ALL";
}[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Archived",
    value: "ARCHIVED",
  },
];

export default function ProjectFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:max-w-[360px]">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A9697]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search projects..."
          className="
            h-10 w-full rounded-xl
            border border-[#DDE3E3]
            bg-white
            pl-10 pr-4
            text-sm text-[#182124]
            outline-none
            transition
            placeholder:text-[#9AA5A6]
            focus:border-[#064B52]
            focus:ring-2 focus:ring-[#064B52]/10
          "
        />
      </div>

      {/* Filter Dropdown */}
      <div className="relative w-full sm:w-[180px]">
        <SlidersHorizontal
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7D898A]"
        />

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value as ProjectStatus | "ALL"
            )
          }
          className="
            h-10 w-full appearance-none
            rounded-xl
            border border-[#DDE3E3]
            bg-white
            pl-10 pr-8
            text-sm font-medium
            text-[#182124]
            outline-none
            transition
            focus:border-[#064B52]
            focus:ring-2 focus:ring-[#064B52]/10
            cursor-pointer
          "
        >
          {filters.map((filter) => (
            <option
              key={filter.value}
              value={filter.value}
            >
              {filter.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9697]">
          ▼
        </span>
      </div>
    </div>
  );
}