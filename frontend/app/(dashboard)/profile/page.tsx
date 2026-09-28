"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react";

import ProfileOverview from "@/components/profile/ProfileOverview";
import PersonalInformation from "@/components/profile/PersonalInformation";
import ChangePassword from "@/components/profile/ChangePassword";
import TeamMemberships from "@/components/profile/TeamMemberships";

type ProfileSection =
  | "personal"
  | "security"
  | "teams";

export default function ProfilePage() {
  const [activeSection, setActiveSection] =
    useState<ProfileSection>("personal");

  return (
    <div className="w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#182124] dark:text-[#F1F5F5]">
          Profile
        </h1>

        <p className="mt-1 text-sm text-[#6E7B7D] dark:text-[#AAB8BA]">
          Manage your profile and account settings.
        </p>
      </div>

      {/* Main Profile Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* LEFT SIDEBAR */}
        <div className="h-fit rounded-2xl border border-[#DDE3E3] bg-white p-4 dark:border-[#293638] dark:bg-[#172326]">
          {/* Profile Summary */}
          <ProfileOverview />

          {/* Navigation */}
          <div className="mt-5 border-t border-[#E8ECEC] pt-4 dark:border-[#293638]">
            {/* Personal Information */}
            <button
              type="button"
              onClick={() =>
                setActiveSection("personal")
              }
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                activeSection === "personal"
                  ? "bg-[#DCE9E9] text-[#064B52] dark:bg-[#244245] dark:text-[#B1D6D8]"
                  : "text-[#536063] hover:bg-[#F3F6F6] dark:text-[#AAB8BA] dark:hover:bg-[#243437]"
              }`}
            >
              <UserRound size={18} />

              <div className="flex-1">
                <p className="text-sm font-medium">
                  Personal Information
                </p>

                <p className="mt-0.5 text-xs opacity-70">
                  Your account details
                </p>
              </div>

              <span className="text-lg">›</span>
            </button>

            {/* Security */}
            <button
              type="button"
              onClick={() =>
                setActiveSection("security")
              }
              className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                activeSection === "security"
                  ? "bg-[#DCE9E9] text-[#064B52] dark:bg-[#244245] dark:text-[#B1D6D8]"
                  : "text-[#536063] hover:bg-[#F3F6F6] dark:text-[#AAB8BA] dark:hover:bg-[#243437]"
              }`}
            >
              <ShieldCheck size={18} />

              <div className="flex-1">
                <p className="text-sm font-medium">
                  Security & Password
                </p>

                <p className="mt-0.5 text-xs opacity-70">
                  Password and security
                </p>
              </div>

              <span className="text-lg">›</span>
            </button>

            {/* Teams */}
            <button
              type="button"
              onClick={() =>
                setActiveSection("teams")
              }
              className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                activeSection === "teams"
                  ? "bg-[#DCE9E9] text-[#064B52] dark:bg-[#244245] dark:text-[#B1D6D8]"
                  : "text-[#536063] hover:bg-[#F3F6F6] dark:text-[#AAB8BA] dark:hover:bg-[#243437]"
              }`}
            >
              <Users size={18} />

              <div className="flex-1">
                <p className="text-sm font-medium">
                  Team Memberships
                </p>

                <p className="mt-0.5 text-xs opacity-70">
                  Your teams and roles
                </p>
              </div>

              <span className="text-lg">›</span>
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="min-w-0">
          {activeSection === "personal" && (
            <PersonalInformation />
          )}

          {activeSection === "security" && (
            <ChangePassword />
          )}

          {activeSection === "teams" && (
            <TeamMemberships />
          )}
        </div>
      </div>
    </div>
  );
}