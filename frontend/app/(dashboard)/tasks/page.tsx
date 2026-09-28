
"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ArrowRight,
  CheckSquare,
  Plus,
} from "lucide-react";

import TaskFilters from "@/components/tasks/TaskFilters";
import TaskList from "@/components/tasks/TaskList";

import useTasks from "@/hooks/useTasks";

import type { TaskStatus } from "@/types/task";

export default function TasksPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams =
    useSearchParams();

  const {
    tasks,
    loading,
    error,
    clearError,
  } = useTasks();

  // ==========================================
  // CURRENT STATUS
  // ==========================================

  const currentStatus =
    searchParams.get("status");

  const status: TaskStatus | "ALL" =
    currentStatus === "TODO" ||
    currentStatus === "IN_PROGRESS" ||
    currentStatus === "COMPLETED"
      ? currentStatus
      : "ALL";

  // ==========================================
  // CHANGE STATUS FILTER
  // ==========================================

  const handleStatusChange = (
    newStatus:
      | TaskStatus
      | "ALL"
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    if (newStatus === "ALL") {
      params.delete("status");
    } else {
      params.set(
        "status",
        newStatus
      );
    }

    const query =
      params.toString();

    router.push(
      query
        ? `${pathname}?${query}`
        : pathname
    );
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#F7F8F7]

        dark:bg-[#101719]
      "
    >
      {/* ======================================
          PAGE HEADER
          ====================================== */}

      <section
        className="
          border-b
          border-[#DDE3E3]
          bg-white

          dark:border-[#293638]
          dark:bg-[#172326]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6 py-7

            lg:px-8
          "
        >
          <div
            className="
              flex flex-col
              gap-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div
              className="
                flex items-start
                gap-4
              "
            >
              <div
                className="
                  flex h-12 w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#DCE9E9]
                  text-[#064B52]

                  dark:bg-[#244245]
                  dark:text-[#B1D6D8]
                "
              >
                <CheckSquare
                  size={23}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#6E7B7D]

                    dark:text-[#AAB8BA]
                  "
                >
                  Workspace
                </p>

                <h1
                  className="
                    mt-1
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-[#182124]

                    dark:text-[#F1F5F5]
                  "
                >
                  Tasks
                </h1>

                <p
                  className="
                    mt-1
                    max-w-xl
                    text-sm
                    leading-6
                    text-[#6E7B7D]

                    dark:text-[#AAB8BA]
                  "
                >
                  Manage your work,
                  track progress,
                  and stay on top
                  of deadlines.
                </p>
              </div>
            </div>

            <Link
              href="/tasks/new"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#064B52]
                px-5 py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition

                hover:bg-[#0B626A]
              "
            >
              <Plus size={18} />

              New Task
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================
          CONTENT
          ====================================== */}

      <section
        className="
          mx-auto
          max-w-[1500px]
          px-6 py-7

          lg:px-8
        "
      >
        {/* ERROR */}

        {error && (
          <div
            className="
              mb-6
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4 py-3
              text-sm
              text-red-600
            "
          >
            <span>
              {error}
            </span>

            <button
              type="button"
              onClick={clearError}
              className="
                shrink-0
                text-xs
                font-semibold
                hover:underline
              "
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ==================================
            FILTERS
            ================================== */}

        <div
          className="
            mb-7
            flex flex-col
            gap-4

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <TaskFilters
            status={status}
            onStatusChange={
              handleStatusChange
            }
          />

          <Link
            href="/projects"
            className="
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-medium
              text-[#064B52]
              transition

              hover:text-[#0B626A]

              dark:text-[#8BC1C4]
              dark:hover:text-[#B1D6D8]
            "
          >
            View projects

            <ArrowRight size={16} />
          </Link>
        </div>

        {/* ==================================
            TASK LIST
            ================================== */}

        <TaskList
          tasks={tasks}
          loading={loading}
          status={status}
        />
      </section>
    </main>
  );
}
