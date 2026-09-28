"use client";

import {
  CalendarDays,
  CheckCircle2,
  Circle,
  ClipboardList,
  Clock3,
} from "lucide-react";

import type { MemberTask } from "@/services/userService";

interface MemberTasksProps {
  tasks?: MemberTask[];
}

const statusConfig = {
  TODO: {
    label: "To Do",
    icon: Circle,
  },

  IN_PROGRESS: {
    label: "In Progress",
    icon: Clock3,
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
  },
};

export default function MemberTasks({
  tasks = [],
}: MemberTasksProps) {
  return (
    <div className="rounded-xl border border-[#DDE3E3] bg-white p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DCE9E9]">
          <ClipboardList className="h-4 w-4 text-[#064B52]" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#182124]">
            Assigned Tasks
          </h3>

          <p className="mt-0.5 text-xs text-[#6E7B7D]">
            Task activity for this member.
          </p>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-4">
        {tasks.length === 0 ? (
          <div className="rounded-lg bg-[#F7F8F7] p-4">
            <p className="text-sm text-[#6E7B7D]">
              No tasks assigned to this member.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => {
              const status =
                statusConfig[task.status];

              const StatusIcon = status.icon;

              return (
                <div
                  key={task.id}
                  className="rounded-lg border border-[#E8ECEC] bg-[#F7F8F7] px-4 py-3 transition hover:border-[#DDE3E3] hover:bg-white"
                >
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div className="mt-0.5 shrink-0">
                      <StatusIcon className="h-4 w-4 text-[#064B52]" />
                    </div>

                    {/* Task Content */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#182124]">
                        {task.title}
                      </p>

                      {/* Project */}
                      {task.project && (
                        <p className="mt-1 truncate text-xs text-[#6E7B7D]">
                          {task.project.name}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {/* Status */}
                        <span className="rounded-full bg-[#DCE9E9] px-2 py-1 text-[10px] font-medium text-[#064B52]">
                          {status.label}
                        </span>

                        {/* Priority */}
                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-[#6E7B7D]">
                          {task.priority}
                        </span>

                        {/* Due Date */}
                        {task.dueDate && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#8A9698]">
                            <CalendarDays className="h-3 w-3" />

                            {new Date(
                              task.dueDate
                            ).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}