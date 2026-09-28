
"use client";

import Link from "next/link";

import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import {
  ChevronDown,
  ChevronRight,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ==========================================
  // PAGE STATES
  // ==========================================

  const isProjectsPage =
    pathname.startsWith("/projects");

  const isTasksPage =
    pathname.startsWith("/tasks");

  const isTeamPage =
    pathname.startsWith("/team");

  // ==========================================
  // CURRENT STATUS
  // ==========================================

  const currentStatus =
    searchParams.get("status");

  // ==========================================
  // DROPDOWN STATES
  // ==========================================

  const [projectsOpen, setProjectsOpen] =
    useState(isProjectsPage);

  const [tasksOpen, setTasksOpen] =
    useState(isTasksPage);

  const [teamOpen, setTeamOpen] =
    useState(isTeamPage);

  // ==========================================
  // KEEP ACTIVE SECTION OPEN
  // ==========================================

  useEffect(() => {
    if (isProjectsPage) {
      setProjectsOpen(true);
    }

    if (isTasksPage) {
      setTasksOpen(true);
    }

    if (isTeamPage) {
      setTeamOpen(true);
    }
  }, [
    isProjectsPage,
    isTasksPage,
    isTeamPage,
  ]);

  // ==========================================
  // GENERAL ACTIVE CHECK
  // ==========================================

  const isActive = (
    href: string
  ) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  // ==========================================
  // PROJECT FILTER ACTIVE CHECK
  // ==========================================

  const isProjectFilterActive = (
    status?: string
  ) => {
    if (!isProjectsPage) {
      return false;
    }

    if (!status) {
      return currentStatus === null;
    }

    return currentStatus === status;
  };

  // ==========================================
  // TASK FILTER ACTIVE CHECK
  // ==========================================

  const isTaskFilterActive = (
    status?: string
  ) => {
    if (!isTasksPage) {
      return false;
    }

    if (!status) {
      return currentStatus === null;
    }

    return currentStatus === status;
  };

  return (
    <>
      {/* ==========================================
          MOBILE OVERLAY
          ========================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-black/20
            dark:bg-black/50
            lg:hidden
          "
        />
      )}

      {/* ==========================================
          SIDEBAR
          ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[260px] flex-col
          border-r
          border-[#DDE3E3]
          bg-white

          dark:border-[#293638]
          dark:bg-[#172326]

          transition-transform duration-300

          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ==========================================
            BRAND
            ========================================== */}

        <div
          className="
            flex h-[72px]
            items-center justify-between
            border-b
            border-[#DDE3E3]
            px-6

            dark:border-[#293638]
          "
        >
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-xl
                bg-[#064B52]
                text-sm font-bold
                text-white
              "
            >
              W
            </div>

            <span
              className="
                text-xl font-bold
                tracking-tight
                text-[#182124]

                dark:text-[#F1F5F5]
              "
            >
              Worknest
            </span>
          </Link>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="
              rounded-lg p-2
              text-[#6E7B7D]
              transition

              hover:bg-[#DCE9E9]
              hover:text-[#064B52]

              dark:text-[#9AA7A8]
              dark:hover:bg-[#243437]
              dark:hover:text-[#8BC1C4]

              lg:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* ==========================================
            NAVIGATION
            ========================================== */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-4 py-6
          "
        >
          {/* ========================================
              WORKSPACE
              ======================================== */}

          <p
            className="
              mb-3 px-3
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#8A9697]

              dark:text-[#829294]
            "
          >
            Workspace
          </p>

          <div className="space-y-1">
            {/* ======================================
                DASHBOARD
                ====================================== */}

            <SidebarLink
              href="/dashboard"
              label="Dashboard"
              icon={
                <LayoutDashboard size={18} />
              }
              active={isActive(
                "/dashboard"
              )}
              onClick={onClose}
            />

            {/* ======================================
                PROJECTS
                ====================================== */}

            <button
              type="button"
              onClick={() =>
                setProjectsOpen(
                  (previous) => !previous
                )
              }
              aria-expanded={projectsOpen}
              className={`
                flex w-full
                items-center justify-between
                rounded-xl
                px-3 py-2.5
                text-sm font-medium
                transition-all

                ${
                  isProjectsPage
                    ? `
                      bg-[#DCE9E9]
                      text-[#064B52]

                      dark:bg-[#244245]
                      dark:text-[#B9DADC]
                    `
                    : `
                      text-[#6E7B7D]
                      hover:bg-[#F2F6F6]
                      hover:text-[#182124]

                      dark:text-[#AAB8BA]
                      dark:hover:bg-[#243437]
                      dark:hover:text-[#F1F5F5]
                    `
                }
              `}
            >
              <span className="flex items-center gap-3">
                <span
                  className={
                    isProjectsPage
                      ? `
                        text-[#064B52]
                        dark:text-[#8BC1C4]
                      `
                      : `
                        text-[#7D898A]
                        dark:text-[#829294]
                      `
                  }
                >
                  <FolderKanban size={18} />
                </span>

                <span>Projects</span>
              </span>

              <span
                className={
                  isProjectsPage
                    ? `
                      text-[#064B52]
                      dark:text-[#8BC1C4]
                    `
                    : `
                      text-[#7D898A]
                      dark:text-[#829294]
                    `
                }
              >
                {projectsOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            </button>

            {/* PROJECT FILTERS */}

            {projectsOpen && (
              <div
                className="
                  ml-7 space-y-1
                  border-l
                  border-[#DDE3E3]
                  pl-3

                  dark:border-[#344649]
                "
              >
                {/* ALL */}

                <SubLink
                  href="/projects"
                  label="All"
                  active={isProjectFilterActive()}
                  onClick={onClose}
                />

                {/* ACTIVE */}

                <SubLink
                  href="/projects?status=ACTIVE"
                  label="Active"
                  active={isProjectFilterActive(
                    "ACTIVE"
                  )}
                  onClick={onClose}
                />

                {/* COMPLETED */}

                <SubLink
                  href="/projects?status=COMPLETED"
                  label="Completed"
                  active={isProjectFilterActive(
                    "COMPLETED"
                  )}
                  onClick={onClose}
                />

                {/* ARCHIVED */}

                <SubLink
                  href="/projects?status=ARCHIVED"
                  label="Archived"
                  active={isProjectFilterActive(
                    "ARCHIVED"
                  )}
                  onClick={onClose}
                />
              </div>
            )}

            {/* ======================================
                TASKS
                ====================================== */}

            <button
              type="button"
              onClick={() =>
                setTasksOpen(
                  (previous) => !previous
                )
              }
              aria-expanded={tasksOpen}
              className={`
                flex w-full
                items-center justify-between
                rounded-xl
                px-3 py-2.5
                text-sm font-medium
                transition-all

                ${
                  isTasksPage
                    ? `
                      bg-[#DCE9E9]
                      text-[#064B52]

                      dark:bg-[#244245]
                      dark:text-[#B9DADC]
                    `
                    : `
                      text-[#6E7B7D]
                      hover:bg-[#F2F6F6]
                      hover:text-[#182124]

                      dark:text-[#AAB8BA]
                      dark:hover:bg-[#243437]
                      dark:hover:text-[#F1F5F5]
                    `
                }
              `}
            >
              <span className="flex items-center gap-3">
                <span
                  className={
                    isTasksPage
                      ? `
                        text-[#064B52]
                        dark:text-[#8BC1C4]
                      `
                      : `
                        text-[#7D898A]
                        dark:text-[#829294]
                      `
                  }
                >
                  <CheckSquare size={18} />
                </span>

                <span>Tasks</span>
              </span>

              <span
                className={
                  isTasksPage
                    ? `
                      text-[#064B52]
                      dark:text-[#8BC1C4]
                    `
                    : `
                      text-[#7D898A]
                      dark:text-[#829294]
                    `
                }
              >
                {tasksOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            </button>

            {/* TASK FILTERS */}

            {tasksOpen && (
              <div
                className="
                  ml-7 space-y-1
                  border-l
                  border-[#DDE3E3]
                  pl-3

                  dark:border-[#344649]
                "
              >
                {/* ALL */}

                <SubLink
                  href="/tasks"
                  label="All"
                  active={isTaskFilterActive()}
                  onClick={onClose}
                />

                {/* TODO */}

                <SubLink
                  href="/tasks?status=TODO"
                  label="To Do"
                  active={isTaskFilterActive(
                    "TODO"
                  )}
                  onClick={onClose}
                />

                {/* IN PROGRESS */}

                <SubLink
                  href="/tasks?status=IN_PROGRESS"
                  label="In Progress"
                  active={isTaskFilterActive(
                    "IN_PROGRESS"
                  )}
                  onClick={onClose}
                />

                {/* COMPLETED */}

                <SubLink
                  href="/tasks?status=COMPLETED"
                  label="Completed"
                  active={isTaskFilterActive(
                    "COMPLETED"
                  )}
                  onClick={onClose}
                />
              </div>
            )}

            {/* ======================================
                TEAM
                ====================================== */}

            <button
              type="button"
              onClick={() =>
                setTeamOpen(
                  (previous) => !previous
                )
              }
              aria-expanded={teamOpen}
              className={`
                flex w-full
                items-center justify-between
                rounded-xl
                px-3 py-2.5
                text-sm font-medium
                transition-all

                ${
                  isTeamPage
                    ? `
                      bg-[#DCE9E9]
                      text-[#064B52]

                      dark:bg-[#244245]
                      dark:text-[#B9DADC]
                    `
                    : `
                      text-[#6E7B7D]
                      hover:bg-[#F2F6F6]
                      hover:text-[#182124]

                      dark:text-[#AAB8BA]
                      dark:hover:bg-[#243437]
                      dark:hover:text-[#F1F5F5]
                    `
                }
              `}
            >
              <span className="flex items-center gap-3">
                <span
                  className={
                    isTeamPage
                      ? `
                        text-[#064B52]
                        dark:text-[#8BC1C4]
                      `
                      : `
                        text-[#7D898A]
                        dark:text-[#829294]
                      `
                  }
                >
                  <Users size={18} />
                </span>

                <span>Team</span>
              </span>

              <span
                className={
                  isTeamPage
                    ? `
                      text-[#064B52]
                      dark:text-[#8BC1C4]
                    `
                    : `
                      text-[#7D898A]
                      dark:text-[#829294]
                    `
                }
              >
                {teamOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            </button>

            {/* TEAM FILTERS */}

            {teamOpen && (
              <div
                className="
                  ml-7 space-y-1
                  border-l
                  border-[#DDE3E3]
                  pl-3

                  dark:border-[#344649]
                "
              >
                <SubLink
                  href="/team"
                  label="All Teams"
                  active={
                    pathname === "/team"
                  }
                  onClick={onClose}
                />

                <SubLink
                  href="/team/members"
                  label="Members"
                  active={
                    pathname ===
                    "/team/members"
                  }
                  onClick={onClose}
                />
              </div>
            )}
          </div>

          {/* ========================================
              SYSTEM
              ======================================== */}

          <p
            className="
              mb-3 mt-8 px-3
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#8A9697]

              dark:text-[#829294]
            "
          >
            System
          </p>

          <SidebarLink
            href="/settings"
            label="Settings"
            icon={
              <Settings size={18} />
            }
            active={isActive(
              "/settings"
            )}
            onClick={onClose}
          />
        </nav>

        {/* ==========================================
            FOOTER
            ========================================== */}

        <div
          className="
            border-t
            border-[#DDE3E3]
            px-5 py-4

            dark:border-[#293638]
          "
        >
          <p
            className="
              text-xs
              text-[#6E7B7D]

              dark:text-[#9AA7A8]
            "
          >
            © 2026 Worknest
          </p>

          <p
            className="
              mt-1
              text-[11px]
              text-[#9AA5A6]

              dark:text-[#718082]
            "
          >
            Simple · Focused · Organized
          </p>
        </div>
      </aside>
    </>
  );
}

/* ==============================================
   SIDEBAR LINK
   ============================================== */

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function SidebarLink({
  href,
  label,
  icon,
  active,
  onClick,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3
        rounded-xl
        px-3 py-2.5
        text-sm font-medium
        transition-all

        ${
          active
            ? `
              bg-[#DCE9E9]
              text-[#064B52]

              dark:bg-[#244245]
              dark:text-[#B9DADC]
            `
            : `
              text-[#6E7B7D]
              hover:bg-[#F2F6F6]
              hover:text-[#182124]

              dark:text-[#AAB8BA]
              dark:hover:bg-[#243437]
              dark:hover:text-[#F1F5F5]
            `
        }
      `}
    >
      <span
        className={
          active
            ? `
              text-[#064B52]
              dark:text-[#8BC1C4]
            `
            : `
              text-[#7D898A]
              dark:text-[#829294]
            `
        }
      >
        {icon}
      </span>

      <span>{label}</span>
    </Link>
  );
}

/* ==============================================
   SUB NAVIGATION LINK
   ============================================== */

interface SubLinkProps {
  href: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SubLink({
  href,
  label,
  active,
  onClick,
}: SubLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        block rounded-lg
        px-3 py-2
        text-sm
        transition-all

        ${
          active
            ? `
              bg-[#DCE9E9]
              font-medium
              text-[#064B52]

              dark:bg-[#244245]
              dark:text-[#B9DADC]
            `
            : `
              text-[#6E7B7D]
              hover:bg-[#F2F6F6]
              hover:text-[#182124]

              dark:text-[#9AA7A8]
              dark:hover:bg-[#243437]
              dark:hover:text-[#F1F5F5]
            `
        }
      `}
    >
      {label}
    </Link>
  );
}
