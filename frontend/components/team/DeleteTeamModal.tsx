"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";
import { useState } from "react";

import { deleteTeam, type Team } from "@/services/teamService";

interface DeleteTeamModalProps {
  open: boolean;
  team: Team;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteTeamModal({
  open,
  team,
  onClose,
  onSuccess,
}: DeleteTeamModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      await deleteTeam(team.id);

      onSuccess();
    } catch (error: any) {
      console.error(
        "Failed to delete team:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to delete team."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#101719]/45
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div className="flex items-start justify-between px-6 pt-6">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-red-50
              text-red-600
            "
          >
            <AlertTriangle size={21} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-[#6E7B7D]
              transition
              hover:bg-[#F2F5F5]
              hover:text-[#182124]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}

        <div className="px-6 pb-6 pt-4">
          <h2
            className="
              text-lg
              font-semibold
              text-[#182124]
            "
          >
            Delete {team.name}?
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#6E7B7D]
            "
          >
            This action cannot be undone. The
            team and its associated data may be
            permanently removed.
          </p>

          {/* ERROR */}

          {error && (
            <div
              className="
                mt-4
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
              {error}
            </div>
          )}

          {/* ACTIONS */}

          <div
            className="
              mt-6
              flex
              justify-end
              gap-3
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border
                border-[#DDE3E3]
                bg-white
                px-5
                py-2.5
                text-sm
                font-medium
                text-[#182124]
                transition
                hover:bg-[#F7F8F7]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Trash2 size={15} />

              {loading
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}