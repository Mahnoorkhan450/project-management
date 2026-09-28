
"use client";

import useDashboard from "@/hooks/useDashboard";
import { useAuth } from "@/context/AuthContext";

import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatsCards from "@/components/dashboard/StatsCards";
import MyWork from "@/components/dashboard/MyWork";
import TaskSummary from "@/components/dashboard/TaskSummary";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";
import TeamActivity from "@/components/dashboard/TeamActivity";

export default function DashboardPage() {
  const { user } = useAuth();

  const {
    dashboard,
    loading,
    error,
    loadDashboard,
  } = useDashboard();

  const userName = user?.name || "User";

  /*
   * ==========================================
   * LOADING STATE
   * ==========================================
   */

  if (loading) {
    return (
      <main className="min-h-full bg-[#F7F8F7] px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px] space-y-5">
          {/* Welcome Skeleton */}
          <div className="h-32 animate-pulse rounded-xl bg-[#DCE9E9]" />

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl bg-white"
              />
            ))}
          </div>

          {/* Main Content Skeleton */}
          <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            <div className="h-72 animate-pulse rounded-xl bg-white" />

            <div className="h-72 animate-pulse rounded-xl bg-white" />
          </div>

          {/* Bottom Content Skeleton */}
          <div className="grid gap-5 xl:grid-cols-2">
            <div className="h-64 animate-pulse rounded-xl bg-white" />

            <div className="h-64 animate-pulse rounded-xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  /*
   * ==========================================
   * ERROR STATE
   * ==========================================
   */

  if (error || !dashboard) {
    return (
      <main className="flex min-h-full items-center justify-center bg-[#F7F8F7] px-6 py-12">
        <div className="w-full max-w-md rounded-xl border border-[#DDE3E3] bg-white p-8 text-center">
          <h1 className="text-lg font-semibold text-[#182124]">
            Dashboard unavailable
          </h1>

          <p className="mt-2 text-sm text-[#6E7B7D]">
            {error || "Dashboard data could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() => {
              loadDashboard().catch(() => {});
            }}
            className="mt-5 rounded-lg bg-[#064B52] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#04383E]"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  /*
   * ==========================================
   * DASHBOARD
   * ==========================================
   */

  return (
    <main className="min-h-full bg-[#F7F8F7] px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px] space-y-5">
        {/* ======================================
            WELCOME
            ====================================== */}

        <WelcomeSection
          userName={userName}
          members={dashboard.stats.members}
        />

        {/* ======================================
            STATISTICS
            ====================================== */}

        <StatsCards stats={dashboard.stats} />

        {/* ======================================
            MY WORK + TASK SUMMARY
            ====================================== */}

        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <MyWork tasks={dashboard.myTasks} />

          <TaskSummary
            distribution={dashboard.taskDistribution}
          />
        </div>

        {/* ======================================
            DEADLINES + TEAM ACTIVITY
            ====================================== */}

        <div className="grid gap-5 xl:grid-cols-2">
          <UpcomingDeadlines
            deadlines={dashboard.deadlines}
          />

          <TeamActivity
            activities={dashboard.activity}
          />
        </div>
      </div>
    </main>
  );
}
