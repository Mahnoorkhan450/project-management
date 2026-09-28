
"use client";

import {
  Search,
  X,
  ChevronDown,
} from "lucide-react";

interface MembersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  teams: string[];
  selectedTeam: string;
  onTeamChange: (value: string) => void;
}

export default function MembersToolbar({
  search,
  onSearchChange,
  teams,
  selectedTeam,
  onTeamChange,
}: MembersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:w-[300px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E7B7D]" />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search members..."
          className="h-9 w-full rounded-lg border border-[#DDE3E3] bg-white pl-9 pr-9 text-sm text-[#182124] outline-none transition placeholder:text-[#8A9698] focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9]"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[#6E7B7D] transition hover:bg-[#DCE9E9] hover:text-[#064B52]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Team Filter */}
      <div className="relative w-full sm:w-[190px]">
        <select
          value={selectedTeam}
          onChange={(event) =>
            onTeamChange(event.target.value)
          }
          className="h-9 w-full appearance-none rounded-lg border border-[#DDE3E3] bg-white px-3 pr-9 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#DCE9E9]"
        >
          <option value="">All teams</option>

          {teams.map((team) => (
            <option
              key={team}
              value={team}
            >
              {team}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6E7B7D]" />
      </div>
    </div>
  );
}
