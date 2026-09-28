
"use client";

import type { Team } from "@/services/teamService";

import TeamCard from "./TeamCard";

interface TeamGridProps {
  teams: Team[];
}

export default function TeamGrid({
  teams,
}: TeamGridProps) {
  if (teams.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-[#C9D4D4]
          bg-white
          px-6
          py-16
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-[#DCE9E9]
            text-[#064B52]
          "
        >
          <span className="text-xl">
            👥
          </span>
        </div>

        <h3
          className="
            mt-4
            text-base
            font-semibold
            text-[#182124]
          "
        >
          No teams found
        </h3>

        <p
          className="
            mx-auto
            mt-2
            max-w-md
            text-sm
            leading-6
            text-[#6E7B7D]
          "
        >
          Create your first team or change
          the current search and department
          filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
        />
      ))}
    </div>
  );
}
