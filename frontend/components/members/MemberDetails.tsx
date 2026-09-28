"use client";

import {
  ArrowLeft,
  Mail,
  Users,
  Building2,
  CalendarDays,
} from "lucide-react";

import type { TeamMemberDetails } from "@/services/teamService";

import MemberAvatar from "./MemberAvatar";
import MemberStats from "./MemberStats";
import MemberProjects from "./MemberProjects";

interface MemberDetailsProps {
  details: TeamMemberDetails | null;

  member: {
    id: number;
    teamId: number;
    name: string;
    email: string;
    role: string;
    teamName: string;
    departmentName?: string;
  };

  loading: boolean;

  onBack: () => void;
}

const roleLabels: Record<
  string,
  string
> = {
  MEMBER: "Member",
  TEAM_LEAD: "Team Lead",
  MANAGER: "Manager",
};

function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

export default function MemberDetails({
  details,
  member,
  loading,
  onBack,
}: MemberDetailsProps) {
  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-28 animate-pulse rounded-md bg-[#DCE9E9]" />

        <div className="h-40 animate-pulse rounded-xl bg-white" />

        <div className="h-24 animate-pulse rounded-xl bg-white" />
      </div>
    );
  }

  // ==========================================
  // NO DETAILS
  // ==========================================

  if (!details) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-[#064B52] transition hover:bg-[#DCE9E9]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />

          Back to members
        </button>

        <div className="rounded-xl border border-[#DDE3E3] bg-white p-6">
          <p className="text-sm font-medium text-[#182124]">
            Unable to load member
            details.
          </p>

          <p className="mt-1 text-xs text-[#6E7B7D]">
            Please try again.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // DATA
  // ==========================================

  const user = details.user;

  const team = details.team;

  const statistics =
    details.statistics;

  const projects =
    details.projects ?? [];

  // ==========================================
  // DETAILS
  // ==========================================

  return (
    <div className="space-y-4">
      {/* Back */}

      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-[#064B52] transition hover:bg-[#DCE9E9]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />

        Back to members
      </button>

      {/* ======================================
          PROFILE HEADER
      ====================================== */}

      <section className="rounded-xl border border-[#DDE3E3] bg-white px-5 py-4">
        <div className="flex items-center gap-4">
          <MemberAvatar
            name={
              user.name ||
              member.name
            }
            size="lg"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-lg font-semibold text-[#182124]">
                {user.name}
              </h1>

              <span className="rounded-full bg-[#DCE9E9] px-2.5 py-1 text-[10px] font-semibold text-[#064B52]">
                {roleLabels[
                  details.teamRole
                ] ??
                  details.teamRole}
              </span>
            </div>

            <div className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-[#6E7B7D]">
              <Mail className="h-3.5 w-3.5 shrink-0" />

              <span className="truncate">
                {user.email}
              </span>
            </div>
          </div>
        </div>

        {/* ====================================
            INFO BOXES
        ==================================== */}

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <InfoBox
            icon={Users}
            label="Team"
            value={
              team.name || "—"
            }
          />

          <InfoBox
            icon={Building2}
            label="Department"
            value={
              user.department?.name ??
              team.department?.name ??
              "—"
            }
          />

          <InfoBox
            icon={CalendarDays}
            label="Joined"
            value={formatDate(
              details.joinedAt
            )}
          />
        </div>
      </section>

      {/* ======================================
          STATISTICS
      ====================================== */}

      <MemberStats
        assigned={
          statistics.assignedTasks
        }
        completed={
          statistics.completedTasks
        }
        pending={
          statistics.pendingTasks
        }
      />

      {/* ======================================
          PROJECTS
      ====================================== */}

      <MemberProjects
        projects={projects}
      />
    </div>
  );
}

// ==========================================
// INFO BOX
// ==========================================

interface InfoBoxProps {
  icon: React.ComponentType<{
    className?: string;
  }>;

  label: string;

  value: string;
}

function InfoBox({
  icon: Icon,
  label,
  value,
}: InfoBoxProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg bg-[#F7F8F7] px-3 py-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#DCE9E9]">
        <Icon className="h-3.5 w-3.5 text-[#064B52]" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wide text-[#8A9698]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-semibold text-[#182124]">
          {value}
        </p>
      </div>
    </div>
  );
}