
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getDepartments,
  type Department,
  type Team,
} from "@/services/teamService";

interface UseTeamCardOptions {
  team: Team;
}

export default function useTeamCard({
  team,
}: UseTeamCardOptions) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [departmentsLoading, setDepartmentsLoading] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  // ==========================================
  // TEAM DATA
  // ==========================================

  const members = Array.isArray(team.members)
    ? team.members
    : [];

  const visibleMembers =
    members.slice(0, 4);

  const totalMembers =
    team._count?.members ??
    members.length;

  const remaining = Math.max(
    totalMembers -
      visibleMembers.length,
    0
  );

  const totalProjects =
    team._count?.projects ?? 0;

  // ==========================================
  // CLOSE MENU ON OUTSIDE CLICK
  // ==========================================

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ==========================================
  // TOGGLE MENU
  // ==========================================

  const toggleMenu = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();

      setMenuOpen(
        (previous) => !previous
      );
    },
    []
  );

  // ==========================================
  // LOAD DEPARTMENTS
  // ==========================================

  const loadDepartments = useCallback(
    async () => {
      try {
        setDepartmentsLoading(true);

        const data =
          await getDepartments();

        setDepartments(
          Array.isArray(data)
            ? data
            : []
        );

        return data;
      } catch (error) {
        console.error(
          "Failed to load departments:",
          error
        );

        setDepartments([]);

        return [];
      } finally {
        setDepartmentsLoading(false);
      }
    },
    []
  );

  // ==========================================
  // OPEN EDIT
  // ==========================================

  const openEdit = useCallback(
    async (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();

      setMenuOpen(false);

      await loadDepartments();

      setEditOpen(true);
    },
    [loadDepartments]
  );

  // ==========================================
  // CLOSE EDIT
  // ==========================================

  const closeEdit = useCallback(() => {
    setEditOpen(false);
  }, []);

  // ==========================================
  // OPEN DELETE
  // ==========================================

  const openDelete = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      event.stopPropagation();

      setMenuOpen(false);

      setDeleteOpen(true);
    },
    []
  );

  // ==========================================
  // CLOSE DELETE
  // ==========================================

  const closeDelete = useCallback(() => {
    setDeleteOpen(false);
  }, []);

  // ==========================================
  // EDIT SUCCESS
  // ==========================================

  const handleEditSuccess =
    useCallback(() => {
      setEditOpen(false);
      window.location.reload();
    }, []);

  // ==========================================
  // DELETE SUCCESS
  // ==========================================

  const handleDeleteSuccess =
    useCallback(() => {
      setDeleteOpen(false);
      window.location.reload();
    }, []);

  // ==========================================
  // RETURN
  // ==========================================

  return {
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
  };
}
