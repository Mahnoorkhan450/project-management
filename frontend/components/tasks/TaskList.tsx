
"use client";

import {
  CheckSquare,
  RefreshCw,
  ClipboardList,
} from "lucide-react";

import TaskCard from "./TaskCard";

import type {
  Task,
  TaskStatus,
} from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  status: TaskStatus | "ALL";
  onRefresh?: () => void;
}

export default function TaskList({
  tasks,
  loading,
  status,
  onRefresh,
}: TaskListProps) {
  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="
                min-h-[245px]
                rounded-2xl
                border
                border-[#DDE3E3]
                bg-white
                p-5
                shadow-sm
              "
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="h-7 w-24 animate-pulse rounded-lg bg-[#E8EEEE]" />
                <div className="h-8 w-8 animate-pulse rounded-lg bg-[#F1F4F4]" />
              </div>

              {/* Title */}
              <div className="mt-5 h-5 w-4/5 animate-pulse rounded-md bg-[#E8EEEE]" />

              <div className="mt-2 h-5 w-3/5 animate-pulse rounded-md bg-[#E8EEEE]" />

              {/* Description */}
              <div className="mt-5 space-y-2">
                <div className="h-3.5 w-full animate-pulse rounded bg-[#F1F4F4]" />
                <div className="h-3.5 w-4/5 animate-pulse rounded bg-[#F1F4F4]" />
              </div>

              {/* Tags */}
              <div className="mt-5 flex gap-2">
                <div className="h-7 w-20 animate-pulse rounded-full bg-[#E8EEEE]" />
                <div className="h-7 w-24 animate-pulse rounded-full bg-[#E8EEEE]" />
              </div>

              {/* Footer */}
              <div className="mt-5 border-t border-[#EEF1F1] pt-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-28 animate-pulse rounded bg-[#E8EEEE]" />
                  <div className="h-4 w-16 animate-pulse rounded bg-[#E8EEEE]" />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (tasks.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[380px]
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-[#C9D4D5]
          bg-white
          px-6
          py-14
        "
      >
        <div className="max-w-md text-center">
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#DCE9E9]
              text-[#064B52]
            "
          >
            <ClipboardList className="h-7 w-7" />
          </div>

          <h3
            className="
              mt-5
              text-lg
              font-semibold
              tracking-tight
              text-[#182124]
            "
          >
            No tasks found
          </h3>

          <p
            className="
              mx-auto
              mt-2
              max-w-sm
              text-sm
              leading-6
              text-[#6E7B7D]
            "
          >
            {status === "ALL"
              ? "You don't have any tasks yet. Create a task to start organizing your work."
              : "There are no tasks in this status yet."}
          </p>

          <div
            className="
              mx-auto
              mt-5
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-[#DDE3E3]
              bg-[#F7F8F7]
              px-3.5
              py-2
              text-xs
              font-medium
              text-[#6E7B7D]
            "
          >
            <CheckSquare className="h-3.5 w-3.5 text-[#064B52]" />

            <span>
              Tasks will appear here
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // TASKS
  // ==========================================

  return (
    <div className="space-y-4">
      {/* Result header */}
      <div
        className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          border-[#DDE3E3]
          bg-white
          px-4
          py-3
          shadow-sm
        "
      >
        <div className="flex items-center gap-2.5">
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#DCE9E9]
              text-[#064B52]
            "
          >
            <CheckSquare className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#182124]">
              Your Tasks
            </p>

            <p className="text-xs text-[#8A9697]">
              {tasks.length}{" "}
              {tasks.length === 1
                ? "task"
                : "tasks"}{" "}
              found
            </p>
          </div>
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            title="Refresh tasks"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-[#DDE3E3]
              bg-white
              text-[#6E7B7D]
              transition
              hover:bg-[#F2F6F6]
              hover:text-[#064B52]
            "
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Task cards */}
      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}
