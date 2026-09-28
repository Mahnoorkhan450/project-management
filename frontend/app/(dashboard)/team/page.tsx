
"use client";

import { useState } from "react";
import { Plus, Users } from "lucide-react";

import TeamCard from "@/components/team/TeamCard";
import CreateTeamModal from "@/components/team/CreateTeamModal";

import useTeams from "@/hooks/useTeams";
import { useAuth } from "@/context/AuthContext";

export default function TeamPage() {
  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  const {
    teams,
    loading,
    error,
    loadTeams,
    clearError,
  } = useTeams();

  const { isAdmin } = useAuth();

  const handleOpenCreateModal = () => {
    clearError();
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleTeamCreated = async () => {
    setCreateModalOpen(false);

    try {
      await loadTeams();
    } catch {
      // useTeams already handles the error state
    }
  };

  return (
    <div className="min-h-full bg-[#F7F8F7] px-6 py-6 lg:px-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#DCE9E9]
              text-[#064B52]
            "
          >
            <Users size={21} />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-[#182124]
              "
            >
              Teams
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-[#6E7B7D]
              "
            >
              Organize people and collaborate
              across projects.
            </p>
          </div>

        </div>

        {/* ==========================================
            CREATE TEAM - ADMIN ONLY
        ========================================== */}

        {isAdmin && (
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#064B52]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#04383E]
            "
          >
            <Plus size={17} />

            Create Team
          </button>
        )}
      </div>

      {/* ==========================================
          ERROR
      ========================================== */}

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
            px-4
            py-3
            text-sm
            text-red-600
          "
        >
          <span>{error}</span>

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

      {/* ==========================================
          LOADING
      ========================================== */}

      {loading && (
        <div
          className="
            flex
            min-h-[300px]
            items-center
            justify-center
          "
        >
          <div
            className="
              h-8
              w-8
              animate-spin
              rounded-full
              border-2
              border-[#DCE9E9]
              border-t-[#064B52]
            "
          />
        </div>
      )}

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {!loading && teams.length === 0 && (
        <div
          className="
            flex
            min-h-[350px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-[#DDE3E3]
            bg-white
            px-6
            text-center
            shadow-[0_2px_10px_rgba(16,23,25,0.03)]
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#DCE9E9]
              text-[#064B52]
            "
          >
            <Users size={25} />
          </div>

          <h2
            className="
              mt-4
              text-lg
              font-semibold
              text-[#182124]
            "
          >
            No teams yet
          </h2>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-[#6E7B7D]
            "
          >
            {isAdmin
              ? "Create your first team to organize members and manage collaboration."
              : "There are no teams available yet."}
          </p>

          {/* ADMIN ONLY */}

          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="
                mt-5
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#064B52]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#04383E]
              "
            >
              <Plus size={16} />

              Create Team
            </button>
          )}
        </div>
      )}

      {/* ==========================================
          TEAMS
      ========================================== */}

      {!loading && teams.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
            />
          ))}
        </div>
      )}

      {/* ==========================================
          CREATE TEAM MODAL
      ========================================== */}

      {isAdmin && (
        <CreateTeamModal
          open={createModalOpen}
          onClose={handleCloseCreateModal}
          onSuccess={handleTeamCreated}
        />
      )}
    </div>
  );
}
