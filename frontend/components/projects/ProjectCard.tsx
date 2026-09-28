
"use client";

import Link from "next/link";
import {
  CalendarDays,
  CheckSquare,
  Eye,
  FolderKanban,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Dropdown from "@/components/ui/Dropdown";

import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onDelete: (projectId: number) => void;
}

const statusConfig = {
  ACTIVE: {
    label: "Active",
    variant: "info" as const,
  },
  COMPLETED: {
    label: "Completed",
    variant: "success" as const,
  },
  ARCHIVED: {
    label: "Archived",
    variant: "default" as const,
  },
};

export default function ProjectCard({
  project,
  onDelete,
}: ProjectCardProps) {
  const status = statusConfig[project.status];

  const createdDate = new Date(
    project.createdAt
  ).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const taskCount = project._count?.tasks ?? 0;

  return (
    <article
      className="
        group relative flex min-h-[235px]
        flex-col overflow-hidden rounded-2xl
        border border-[#DDE3E3]
        bg-white
        shadow-sm
        transition duration-200
        hover:-translate-y-0.5
        hover:border-[#BFCFCF]
        hover:shadow-md
      "
    >
      {/* CLICKABLE CARD */}

      <Link
        href={`/projects/${project.id}`}
        className="
          absolute inset-0 z-0
          rounded-2xl
          focus:outline-none
          focus:ring-2
          focus:ring-[#064B52]/20
        "
        aria-label={`View ${project.name}`}
      />

      {/* CARD CONTENT */}

      <div
        className="
          relative z-10
          flex flex-1 flex-col
          p-5
          pointer-events-none
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {/* Project Icon */}

            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl
                bg-[#DCE9E9]
                text-[#064B52]
              "
            >
              <FolderKanban className="h-5 w-5" />
            </div>

            {/* Project Name */}

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  font-semibold
                  text-[#182124]
                  transition
                  group-hover:text-[#064B52]
                "
              >
                {project.name}
              </h2>
            </div>
          </div>

          {/* OPTIONS */}

          <div className="pointer-events-auto">
            <Dropdown
              align="right"
              trigger={
                <button
                  type="button"
                  aria-label={`Options for ${project.name}`}
                  className="
                    rounded-lg p-2
                    text-[#8A9697]
                    transition
                    hover:bg-[#F2F6F6]
                    hover:text-[#182124]
                  "
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              }
            >
              {/* VIEW */}

              <Link
                href={`/projects/${project.id}`}
                className="
                  flex items-center gap-2.5
                  rounded-lg
                  px-3 py-2
                  text-sm
                  text-[#6E7B7D]
                  transition
                  hover:bg-[#F2F6F6]
                  hover:text-[#182124]
                "
              >
                <Eye className="h-4 w-4" />
                <span>View</span>
              </Link>

              {/* EDIT */}

              {project.canEdit && (
                <Link
                  href={`/projects/${project.id}/edit`}
                  className="
                    flex items-center gap-2.5
                    rounded-lg
                    px-3 py-2
                    text-sm
                    text-[#6E7B7D]
                    transition
                    hover:bg-[#F2F6F6]
                    hover:text-[#182124]
                  "
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
              )}

              {/* DELETE */}

              {project.canDelete && (
                <button
                  type="button"
                  className="
                    flex w-full items-center gap-2.5
                    rounded-lg
                    px-3 py-2
                    text-sm
                    text-red-600
                    transition
                    hover:bg-red-50
                  "
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    onDelete(project.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              )}
            </Dropdown>
          </div>
        </div>

        {/* STATUS */}

        <div className="mt-5">
          <Badge variant={status.variant}>
            {status.label}
          </Badge>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4
            line-clamp-2
            min-h-[48px]
            text-sm
            leading-6
            text-[#6E7B7D]
          "
        >
          {project.description ||
            "No description provided."}
        </p>

        {/* TEAM */}

        {project.team && (
          <div
            className="
              mt-4
              flex items-center gap-2
              text-xs
              text-[#6E7B7D]
            "
          >
            <div
              className="
                flex h-6 w-6
                shrink-0
                items-center justify-center
                rounded-md
                bg-[#F0F5F5]
                text-[#064B52]
              "
            >
              <UsersIcon />
            </div>

            <span className="truncate">
              {project.team.name}
            </span>
          </div>
        )}

        {/* FOOTER */}

        <div
          className="
            mt-auto
            flex items-center
            justify-between
            border-t border-[#DDE3E3]
            pt-4
          "
        >
          {/* Created Date */}

          <div
            className="
              flex items-center
              gap-2
              text-xs
              text-[#8A9697]
            "
          >
            <CalendarDays className="h-4 w-4" />

            <span>{createdDate}</span>
          </div>

          {/* PROJECT / TASK COUNTS */}

          <div
            className="
              flex items-center
              gap-3
              text-xs
              font-medium
              text-[#6E7B7D]
            "
          >
            {/* Project Count */}

            <div
              className="
                flex items-center gap-1.5
              "
              title="Project"
            >
              <FolderKanban
                className="
                  h-3.5 w-3.5
                  text-[#064B52]
                "
              />

              <span>1</span>
            </div>

            {/* Task Count */}

            <div
              className="
                flex items-center gap-1.5
              "
              title="Tasks"
            >
              <CheckSquare
                className="
                  h-3.5 w-3.5
                  text-[#064B52]
                "
              />

              <span>{taskCount}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// TEAM ICON

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
