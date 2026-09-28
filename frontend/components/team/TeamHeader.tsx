"use client";

import {
  Plus,
  Users,
} from "lucide-react";

interface TeamHeaderProps {
  onCreate: () => void;
}

export default function TeamHeader({
  onCreate,
}: TeamHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#064B52]">
          <Users size={16} />
          Workspace Teams
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-[#182124] sm:text-3xl">
          Teams
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-[#6E7B7D]">
          Organize people into teams, manage responsibilities,
          and collaborate across projects.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#064B52] px-5 text-sm font-semibold text-white transition hover:bg-[#04383E]"
      >
        <Plus size={18} />
        Create Team
      </button>
    </div>
  );
}