"use client";

import { useEffect, useState } from "react";

import {
  Users,
  Building2,
  CalendarDays,
} from "lucide-react";

import {
  getMyTeamMemberships,
  type TeamMembership,
} from "@/services/teamService";

export default function TeamMemberships() {
  const [memberships, setMemberships] =
    useState<TeamMembership[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadMemberships =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getMyTeamMemberships();

          setMemberships(data);
        } catch (error) {
          console.error(
            "Failed to load team memberships:",
            error
          );

          setError(
            "Unable to load your team memberships."
          );
        } finally {
          setLoading(false);
        }
      };

    loadMemberships();
  }, []);

  const formatRole = (
    role: TeamMembership["role"]
  ) => {
    switch (role) {
      case "TEAM_LEAD":
        return "Team Lead";

      case "MANAGER":
        return "Manager";

      case "MEMBER":
      default:
        return "Member";
    }
  };

  const formatDate = (
    date: string
  ) => {
    return new Date(
      date
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <div className="rounded-2xl border border-[#DDE3E3] bg-white p-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#DCE9E9]">
          <Users
            size={19}
            className="text-[#064B52]"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#182124]">
            Team Memberships
          </h2>

          <p className="mt-1 text-sm text-[#6E7B7D]">
            View the teams you belong to and
            your role in each team.
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-7 rounded-xl border border-[#E3E8E8] px-5 py-12 text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#DCE9E9] border-t-[#064B52]" />

          <p className="mt-3 text-sm text-[#6E7B7D]">
            Loading your teams...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="mt-7 rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-center">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        memberships.length === 0 && (
          <div className="mt-7 rounded-xl border border-[#E3E8E8] px-5 py-12 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F4F4]">
              <Users
                size={20}
                className="text-[#6E7B7D]"
              />
            </div>

            <p className="mt-3 text-sm font-medium text-[#182124]">
              No team memberships yet
            </p>

            <p className="mt-1 text-xs text-[#8A9597]">
              You are not a member of any
              team yet.
            </p>
          </div>
        )}

      {/* Memberships */}
      {!loading &&
        !error &&
        memberships.length > 0 && (
          <div className="mt-7 space-y-3">
            {memberships.map(
              (membership) => (
                <div
                  key={membership.id}
                  className="rounded-xl border border-[#E3E8E8] p-5 transition hover:border-[#C7D6D6]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* Team */}
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#DCE9E9]">
                        <Users
                          size={19}
                          className="text-[#064B52]"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-[#182124]">
                          {
                            membership
                              .team
                              .name
                          }
                        </h3>

                        <div className="mt-1 flex items-center gap-1.5">
                          <Building2
                            size={13}
                            className="text-[#8A9597]"
                          />

                          <span className="text-xs text-[#6E7B7D]">
                            {
                              membership
                                .team
                                .department
                                .name
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Role + Joined */}
                    <div className="flex items-center gap-8">
                      {/* Role */}
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-[#8A9597]">
                          Role
                        </p>

                        <span className="mt-1 inline-flex rounded-full bg-[#DCE9E9] px-2.5 py-1 text-xs font-medium text-[#064B52]">
                          {formatRole(
                            membership.role
                          )}
                        </span>
                      </div>

                      {/* Joined */}
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-[#8A9597]">
                          Joined
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <CalendarDays
                            size={13}
                            className="text-[#8A9597]"
                          />

                          <span className="text-xs text-[#536063]">
                            {formatDate(
                              membership.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {membership.team
                    .description && (
                    <p className="mt-4 border-t border-[#E8ECEC] pt-4 text-sm leading-6 text-[#6E7B7D]">
                      {
                        membership.team
                          .description
                      }
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        )}
    </div>
  );
}