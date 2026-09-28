"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  getDepartments,
  addTeamMember,
  updateTeamMemberRole,
  removeTeamMember,
  getMyTeamMemberships,
  type Team,
  type Department,
  type TeamMember,
  type TeamMembership,
  type CreateTeamData,
  type UpdateTeamData,
  type AddTeamMemberData,
  type TeamRole,
} from "@/services/teamService";

export default function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [departments, setDepartments] = useState<
    Department[]
  >([]);

  const [memberships, setMemberships] = useState<
    TeamMembership[]
  >([]);

  const [selectedTeam, setSelectedTeam] =
    useState<Team | null>(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD TEAMS
  // ==========================================

  const loadTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTeams();

      setTeams(data);

      return data;
    } catch (err: any) {
      console.error(
        "Failed to load teams:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load teams."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  // ==========================================
  // LOAD SINGLE TEAM
  // ==========================================

  const loadTeam = async (id: number) => {
    try {
      setActionLoading(true);
      setError("");

      const team = await getTeamById(id);

      setSelectedTeam(team);

      return team;
    } catch (err: any) {
      console.error(
        "Failed to load team:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load team."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // CREATE TEAM
  // ==========================================

  const addTeam = async (
    data: CreateTeamData
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const team = await createTeam(data);

      setTeams((previous) => [
        team,
        ...previous,
      ]);

      return team;
    } catch (err: any) {
      console.error(
        "Failed to create team:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to create team."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // UPDATE TEAM
  // ==========================================

  const editTeam = async (
    id: number,
    data: UpdateTeamData
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const updatedTeam =
        await updateTeam(id, data);

      setTeams((previous) =>
        previous.map((team) =>
          team.id === id
            ? updatedTeam
            : team
        )
      );

      setSelectedTeam(updatedTeam);

      return updatedTeam;
    } catch (err: any) {
      console.error(
        "Failed to update team:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to update team."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // DELETE TEAM
  // ==========================================

  const removeTeam = async (id: number) => {
    try {
      setActionLoading(true);
      setError("");

      await deleteTeam(id);

      setTeams((previous) =>
        previous.filter(
          (team) => team.id !== id
        )
      );

      if (selectedTeam?.id === id) {
        setSelectedTeam(null);
      }
    } catch (err: any) {
      console.error(
        "Failed to delete team:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to delete team."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // LOAD DEPARTMENTS
  // ==========================================

  const loadDepartments =
    useCallback(async () => {
      try {
        setError("");

        const data = await getDepartments();

        setDepartments(data);

        return data;
      } catch (err: any) {
        console.error(
          "Failed to load departments:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load departments."
        );

        throw err;
      }
    }, []);

  // ==========================================
  // ADD TEAM MEMBER
  // ==========================================

  const addMember = async (
    teamId: number,
    data: AddTeamMemberData
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const member = await addTeamMember(
        teamId,
        data
      );

      await loadTeam(teamId);

      return member;
    } catch (err: any) {
      console.error(
        "Failed to add team member:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to add team member."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // UPDATE MEMBER ROLE
  // ==========================================

  const changeMemberRole = async (
    teamId: number,
    userId: number,
    role: TeamRole
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const member =
        await updateTeamMemberRole(
          teamId,
          userId,
          role
        );

      await loadTeam(teamId);

      return member;
    } catch (err: any) {
      console.error(
        "Failed to update member role:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to update member role."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // REMOVE TEAM MEMBER
  // ==========================================

  const removeMember = async (
    teamId: number,
    userId: number
  ) => {
    try {
      setActionLoading(true);
      setError("");

      await removeTeamMember(
        teamId,
        userId
      );

      await loadTeam(teamId);
    } catch (err: any) {
      console.error(
        "Failed to remove team member:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to remove team member."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // LOAD MY TEAM MEMBERSHIPS
  // ==========================================

  const loadMyMemberships =
    useCallback(async () => {
      try {
        setError("");

        const data =
          await getMyTeamMemberships();

        setMemberships(data);

        return data;
      } catch (err: any) {
        console.error(
          "Failed to load memberships:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load team memberships."
        );

        throw err;
      }
    }, []);

  // ==========================================
  // SELECT TEAM
  // ==========================================

  const selectTeam = (
    team: Team | null
  ) => {
    setSelectedTeam(team);
  };

  // ==========================================
  // CLEAR ERROR
  // ==========================================

  const clearError = () => {
    setError("");
  };

  return {
    teams,
    departments,
    memberships,
    selectedTeam,

    loading,
    actionLoading,
    error,

    loadTeams,
    loadTeam,

    addTeam,
    editTeam,
    removeTeam,

    loadDepartments,

    addMember,
    changeMemberRole,
    removeMember,

    loadMyMemberships,

    selectTeam,
    clearError,
  };
}