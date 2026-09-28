"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import useTeamMembers from "@/hooks/useTeamMembers";

import MembersHeader from "./MembersHeader";
import MembersToolbar from "./MembersToolbar";
import MembersList from "./MembersList";
import MemberDetails from "./MemberDetails";
import MembersLoading from "./MembersLoading";
import EmptyMembers from "./EmptyMembers";
import AddMemberModal from "./AddMemberModal";

export default function Members() {
  const { isAdmin } = useAuth();

  const {
    teams,
    filteredMembers,
    selectedMember,
    details,
    loading,
    detailsLoading,
    error,
    search,
    setSearch,
    selectMember,
    clearSelectedMember,
    reloadMembers,
  } = useTeamMembers();

  const [addMemberOpen, setAddMemberOpen] =
    useState(false);

  const [selectedTeam, setSelectedTeam] =
    useState("");

  // ==========================================
  // TEAM NAMES
  // ==========================================

  const teamNames = useMemo(() => {
    return teams
      .map((team) => team.name)
      .filter(
        (name): name is string =>
          Boolean(name)
      );
  }, [teams]);

  // ==========================================
  // TEAM FILTER
  // ==========================================

  const visibleMembers = selectedTeam
    ? filteredMembers.filter(
        (member) =>
          member.teamName === selectedTeam
      )
    : filteredMembers;

  // ==========================================
  // MEMBER DETAILS
  // ==========================================

  if (selectedMember) {
    return (
      <>
        <MemberDetails
          member={selectedMember}
          details={details}
          loading={detailsLoading}
          onBack={clearSelectedMember}
        />

        {error && (
          <div
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            role="alert"
          >
            {error}
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // MEMBERS LIST
  // ==========================================

  return (
    <>
      <div className="space-y-5">
        {/* Header */}

        <MembersHeader
          isAdmin={isAdmin}
          onAddMember={() =>
            setAddMemberOpen(true)
          }
        />

        {/* Search + Filter */}

        <MembersToolbar
          search={search}
          onSearchChange={setSearch}
          teams={teamNames}
          selectedTeam={selectedTeam}
          onTeamChange={setSelectedTeam}
        />

        {/* Error */}

        {error && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Loading */}

        {loading ? (
          <MembersLoading />
        ) : visibleMembers.length === 0 ? (
          <EmptyMembers
            search={search}
          />
        ) : (
          <MembersList
            members={visibleMembers}
            selectedMember={selectedMember}
            onSelect={selectMember}
          />
        )}
      </div>

      {/* Add Member */}

      {isAdmin && (
        <AddMemberModal
          open={addMemberOpen}
          onClose={() =>
            setAddMemberOpen(false)
          }
          onSuccess={reloadMembers}
        />
      )}
    </>
  );
}