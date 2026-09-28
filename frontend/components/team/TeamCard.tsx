
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import type { Team } from "@/services/teamService";
import { useAuth } from "@/context/AuthContext";
import MemberAvatar from "./MemberAvatar";
import EditTeamModal from "./EditTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";
import useTeamCard from "@/hooks/useTeamCard";

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({
  team,
}: TeamCardProps) {
  const { isAdmin } = useAuth();

  const {
    menuOpen,
    menuRef,
    toggleMenu,
    members,
    visibleMembers,
    totalMembers,
    remaining,
    totalProjects,
    departments,
    departmentsLoading,
    editOpen,
    openEdit,
    closeEdit,
    handleEditSuccess,
    deleteOpen,
    openDelete,
    closeDelete,
    handleDeleteSuccess,
  } = useTeamCard({ team });

  return (
    <>
      <div className="group rounded-2xl border border-[#DDE3E3] bg-white p-5 shadow-[0_2px_10px_rgba(16,23,25,0.03)] transition duration-200 hover:-translate-y-0.5 hover:border-[#C5D1D1] hover:shadow-[0_8px_24px_rgba(16,23,25,0.07)]">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCE9E9] text-[#064B52]">
              <Building2 size={21} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-semibold text-[#182124]">
                {team.name}
              </h3>

              <p className="mt-1 truncate text-xs text-[#6E7B7D]">
                {team.department?.name || "No department"}
              </p>
            </div>
          </div>

          {/* Admin Menu */}
          {isAdmin && (
            <div
              ref={menuRef}
              className="relative shrink-0"
            >
              <button
                type="button"
                onClick={toggleMenu}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6E7B7D] transition hover:bg-[#F3F6F6] hover:text-[#182124]"
              >
                <MoreHorizontal size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-9 z-30 w-36 overflow-hidden rounded-xl border border-[#DDE3E3] bg-white py-1 shadow-lg">
                  <button
                    type="button"
                    onClick={openEdit}
                    disabled={departmentsLoading}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-[#182124] hover:bg-[#F7F8F7] disabled:opacity-50"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={openDelete}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="mt-4 min-h-[40px] text-sm leading-5 text-[#6E7B7D]">
          {team.description ||
            "No description available for this team."}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#F7F8F7] px-4 py-3">
            <div className="flex items-center gap-2">
              <Users
                size={15}
                className="text-[#064B52]"
              />

              <span className="text-xs text-[#6E7B7D]">
                Members
              </span>
            </div>

            <p className="mt-1.5 text-lg font-semibold text-[#182124]">
              {totalMembers}
            </p>
          </div>

          <div className="rounded-xl bg-[#F7F8F7] px-4 py-3">
            <div className="flex items-center gap-2">
              <Building2
                size={15}
                className="text-[#064B52]"
              />

              <span className="text-xs text-[#6E7B7D]">
                Projects
              </span>
            </div>

            <p className="mt-1.5 text-lg font-semibold text-[#182124]">
              {totalProjects}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-[#EEF1F1] pt-4">
          <div className="flex items-center">
            {visibleMembers.map((member, index) => (
              <div
                key={`${member.userId}-${member.id}`}
                className={index === 0 ? "" : "-ml-2"}
              >
                <MemberAvatar
                  name={
                    member.user?.name ||
                    "User"
                  }
                />
              </div>
            ))}

            {remaining > 0 && (
              <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E8EEEE] text-[11px] font-semibold text-[#064B52]">
                +{remaining}
              </div>
            )}

            {members.length === 0 && (
              <span className="text-xs text-[#8A9698]">
                No members yet
              </span>
            )}
          </div>

          <Link
            href={`/team/${team.id}`}
            className="flex items-center gap-1 text-xs font-semibold text-[#064B52] transition hover:text-[#04383E]"
          >
            View team
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Edit Modal */}
      {isAdmin && editOpen && (
        <EditTeamModal
          open={editOpen}
          team={team}
          departments={departments}
          onClose={closeEdit}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Delete Modal */}
      {isAdmin && deleteOpen && (
        <DeleteTeamModal
          open={deleteOpen}
          team={team}
          onClose={closeDelete}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
}
