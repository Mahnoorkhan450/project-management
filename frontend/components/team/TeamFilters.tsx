"use client";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

interface Department {
  id: number;
  name: string;
}

interface TeamFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  departmentId: string;
  setDepartmentId: (value: string) => void;
  departments: Department[];
}

export default function TeamFilters({
  search,
  setSearch,
  departmentId,
  setDepartmentId,
  departments,
}: TeamFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9597]"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teams..."
          className="h-11 w-full rounded-xl border border-[#DDE3E3] bg-white pl-11 pr-4 text-sm text-[#182124] outline-none transition placeholder:text-[#9AA4A5] focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9]"
        />
      </div>

      <div className="relative lg:w-64">
        <SlidersHorizontal
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E7B7D]"
        />

        <select
          value={departmentId}
          onChange={(e) =>
            setDepartmentId(e.target.value)
          }
          className="h-11 w-full appearance-none rounded-xl border border-[#DDE3E3] bg-white pl-11 pr-4 text-sm text-[#182124] outline-none focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9]"
        >
          <option value="">All Departments</option>

          {departments.map((department) => (
            <option
              key={department.id}
              value={department.id}
            >
              {department.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}