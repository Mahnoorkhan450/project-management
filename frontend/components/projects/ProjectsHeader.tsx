"use client";

import Link from "next/link";
import { FolderKanban, Plus } from "lucide-react";

export default function ProjectsHeader() {
  return (
    <header className="flex flex-col gap-5 border-b border-[#DDE3E3] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52]">
            <FolderKanban className="h-4 w-4" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6E7B7D]">
            Workspace
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-[#182124] sm:text-3xl">
          Projects
        </h1>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#6E7B7D]">
          Organize your work, track progress, and keep every project
          in one place.
        </p>
      </div>

      <Link
        href="/projects/create"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#064B52] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B626A] focus:outline-none focus:ring-2 focus:ring-[#064B52]/20"
      >
        <Plus className="h-4 w-4" />
        New Project
      </Link>
    </header>
  );
}