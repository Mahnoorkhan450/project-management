"use client";

import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  MoreVertical,
  UserRound,
} from "lucide-react";

import type { Task } from "@/types/task";

import TaskEditButton from "./TaskEditButton";
import DeleteTaskButton from "./DeleteTaskButton";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Dropdown from "@/components/ui/Dropdown";
import Tooltip from "@/components/ui/Tooltip";

interface TaskCardProps {
  task: Task;
  onDelete?: (taskId: number) => void;
}

const statusConfig = {
  TODO: {
    label: "To Do",
    icon: Circle,
    variant: "default" as const,
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: Clock3,
    variant: "info" as const,
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    variant: "success" as const,
  },
} as const;

const priorityConfig = {
  LOW: {
    label: "Low Priority",
    variant: "default" as const,
  },
  MEDIUM: {
    label: "Medium Priority",
    variant: "warning" as const,
  },
  HIGH: {
    label: "High Priority",
    variant: "danger" as const,
  },
} as const;

export default function TaskCard({
  task,
  onDelete,
}: TaskCardProps) {
  const router = useRouter();

  const status = statusConfig[task.status];
  const StatusIcon = status.icon;

  const priority = priorityConfig[task.priority];

  const canEdit = task.canEdit === true;
  const canDelete = task.canDelete === true;

  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  const handleDeleted = (taskId: number) => {
    onDelete?.(taskId);
  };

  const handleCardClick = () => {
    router.push(`/tasks/${task.id}`);
  };

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(`/tasks/${task.id}`);
    }
  };

  return (
    <Card
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className="
        group
        relative
        cursor-pointer
        border-[#DDE3E3]
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-[#064B52]/20
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 pr-2">
          <p
            className="
              mb-1
              text-xs
              font-medium
              uppercase
              tracking-wide
              text-[#6E7B7D]
            "
          >
            {task.project?.name || "Project"}
          </p>

          <h3
            className="
              truncate
              text-lg
              font-semibold
              text-[#182124]
            "
          >
            {task.title}
          </h3>
        </div>

        {/* Actions */}

        <div
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <Dropdown
            align="right"
            trigger={
              <Tooltip content="Task actions">
                <button
                  type="button"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    text-[#6E7B7D]
                    transition
                    hover:bg-[#F1F4F4]
                    hover:text-[#064B52]
                  "
                  aria-label="Task actions"
                  aria-haspopup="menu"
                >
                  <MoreVertical size={19} />
                </button>
              </Tooltip>
            }
          >
            <div
              role="menu"
              className="w-48"
            >
              {/* Edit */}

              {canEdit && (
                <TaskEditButton
                  taskId={task.id}
                />
              )}

              {/* Delete */}

              {canDelete && (
                <>
                  {canEdit && (
                    <div className="my-1.5 h-px bg-[#EEF1F1]" />
                  )}

                  <DeleteTaskButton
                    taskId={task.id}
                    taskTitle={task.title}
                    onDeleted={handleDeleted}
                  />
                </>
              )}
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Description */}

      {task.description && (
        <p
          className="
            mt-3
            line-clamp-2
            text-sm
            leading-6
            text-[#6E7B7D]
          "
        >
          {task.description}
        </p>
      )}

      {/* Status + Priority */}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Badge variant={status.variant}>
          <span className="inline-flex items-center gap-1.5">
            <StatusIcon size={14} />
            {status.label}
          </span>
        </Badge>

        <Badge variant={priority.variant}>
          {priority.label}
        </Badge>
      </div>

      {/* Task Meta */}

      <div
        className="
          mt-5
          flex
          flex-wrap
          items-center
          gap-x-5
          gap-y-2
          border-t
          border-[#EEF1F1]
          pt-4
          text-xs
          text-[#6E7B7D]
        "
      >
        <span className="inline-flex items-center gap-1.5">
          <UserRound size={14} />

          {task.assignedTo?.name || "Unassigned"}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} />

          {dueDate}
        </span>
      </div>
    </Card>
  );
}