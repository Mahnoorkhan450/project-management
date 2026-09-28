"use client";

import {
  FolderKanban,
} from "lucide-react";

import type { MemberProject } from "@/services/teamService";

interface MemberProjectsProps {
  projects?: MemberProject[];
}

const statusLabels: Record<
  MemberProject["status"],
  string
> = {
  ACTIVE: "Active",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

const statusStyles: Record<
  MemberProject["status"],
  string
> = {
  ACTIVE:
    "bg-[#E2EEEE] text-[#064B52]",

  COMPLETED:
    "bg-[#EAF4EC] text-[#347A46]",

  ARCHIVED:
    "bg-[#F2F5F5] text-[#657274]",
};

export default function MemberProjects({
  projects = [],
}: MemberProjectsProps) {
  return (
    <section className="rounded-xl border border-[#DDE3E3] bg-white p-5">
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DCE9E9]">
          <FolderKanban className="h-4 w-4 text-[#064B52]" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#182124]">
            Assigned Projects
          </h3>

          <p className="mt-0.5 text-xs text-[#6E7B7D]">
            Projects associated with
            this member's team.
          </p>
        </div>
      </div>

      {/* Projects */}

      <div className="mt-4">
        {projects.length === 0 ? (
          <div className="rounded-lg bg-[#F7F8F7] p-4">
            <p className="text-sm text-[#6E7B7D]">
              No projects assigned to
              this member.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {projects.map(
              (project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-[#E8ECEC] bg-[#F7F8F7] px-4 py-3 transition hover:border-[#DDE3E3] hover:bg-white"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#182124]">
                      {project.name}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-md px-2.5 py-1 text-[10px] font-semibold ${
                      statusStyles[
                        project.status
                      ]
                    }`}
                  >
                    {
                      statusLabels[
                        project.status
                      ]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}