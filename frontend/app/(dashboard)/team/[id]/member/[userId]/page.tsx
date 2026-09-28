
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getTeams,
  getTeamMemberDetails,
  type Team,
  type TeamMemberDetails,
} from "@/services/teamService";

export interface MemberItem {
  id: number;
  teamId: number;
  name: string;
  email: string;
  role: string;
  teamName: string;
  departmentName?: string;
}

export default function useTeamMembers() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [selectedMember, setSelectedMember] =
    useState<MemberItem | null>(null);

  const [details, setDetails] =
    useState<TeamMemberDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  // ==========================================
  // LOAD TEAMS
  // ==========================================

  const loadTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTeams();

      setTeams(response);
    } catch (err: any) {
      console.error(
        "Failed to load teams:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load team members."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  // ==========================================
  // CREATE MEMBERS LIST FROM TEAMS
  // ==========================================

  const members = useMemo<MemberItem[]>(() => {
    const result: MemberItem[] = [];

    teams.forEach((team) => {
      team.members?.forEach((member) => {
        result.push({
          id: Number(member.userId),
          teamId: Number(team.id),

          name:
            member.user?.name ??
            "Unknown User",

          email:
            member.user?.email ??
            "",

          role:
            member.role ??
            "MEMBER",

          teamName: team.name,

          departmentName:
            team.department?.name ??
            "",
        });
      });
    });

    return result;
  }, [teams]);

  // ==========================================
  // SEARCH MEMBERS
  // ==========================================

  const filteredMembers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return members;
    }

    return members.filter((member) => {
      return (
        member.name
          .toLowerCase()
          .includes(value) ||
        member.email
          .toLowerCase()
          .includes(value) ||
        member.teamName
          .toLowerCase()
          .includes(value) ||
        member.departmentName
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [members, search]);

  // ==========================================
  // LOAD MEMBER DETAILS
  // ==========================================

  const loadMemberDetails = useCallback(
    async (
      teamId: number,
      userId: number
    ) => {
      try {
        setDetailsLoading(true);
        setError("");
        setDetails(null);

        const response =
          await getTeamMemberDetails(
            teamId,
            userId
          );

        setDetails(response);

        return response;
      } catch (err: any) {
        console.error(
          "Failed to load member details:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load member details."
        );

        throw err;
      } finally {
        setDetailsLoading(false);
      }
    },
    []
  );

  // ==========================================
  // SELECT MEMBER
  // ==========================================

  const selectMember = async (
    member: MemberItem
  ) => {
    try {
      setSelectedMember(member);

      await loadMemberDetails(
        member.teamId,
        member.id
      );
    } catch {
      // Error already handled by loadMemberDetails
    }
  };

  // ==========================================
  // CLEAR SELECTED MEMBER
  // ==========================================

  const clearSelectedMember = () => {
    setSelectedMember(null);
    setDetails(null);
    setError("");
  };

  // ==========================================
  // CLEAR ERROR
  // ==========================================

  const clearError = () => {
    setError("");
  };

  // ==========================================
  // RETURN
  // ==========================================

  return {
    teams,

    members,
    filteredMembers,

    selectedMember,
    details,

    loading,
    detailsLoading,

    error,

    search,
    setSearch,

    loadMemberDetails,
    selectMember,
    clearSelectedMember,
    clearError,

    reloadMembers: loadTeams,
  };
}
