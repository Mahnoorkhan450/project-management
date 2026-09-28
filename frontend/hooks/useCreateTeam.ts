
"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  createTeam,
  getDepartments,
  type Department,
} from "@/services/teamService";

interface UseCreateTeamOptions {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export default function useCreateTeam({
  open,
  onSuccess,
  onClose,
}: UseCreateTeamOptions) {
  /* =========================================
     FORM STATE
  ========================================= */

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [departmentId, setDepartmentId] =
    useState("");

  /* =========================================
     DEPARTMENT STATE
  ========================================= */

  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [departmentsLoading, setDepartmentsLoading] =
    useState(false);

  /* =========================================
     UI STATE
  ========================================= */

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================================
     LOAD DEPARTMENTS
  ========================================= */

  const loadDepartments = useCallback(
    async () => {
      try {
        setDepartmentsLoading(true);
        setError("");

        const data = await getDepartments();

        setDepartments(
          Array.isArray(data) ? data : []
        );
      } catch (err: any) {
        console.error(
          "Failed to load departments:",
          err
        );

        setDepartments([]);

        setError(
          err?.response?.data?.message ||
            "Unable to load departments."
        );
      } finally {
        setDepartmentsLoading(false);
      }
    },
    []
  );

  /* =========================================
     LOAD WHEN MODAL OPENS
  ========================================= */

  useEffect(() => {
    if (!open) return;

    loadDepartments();
  }, [open, loadDepartments]);

  /* =========================================
     RESET FORM
  ========================================= */

  const resetForm = useCallback(() => {
    setName("");
    setDescription("");
    setDepartmentId("");
    setError("");
  }, []);

  /* =========================================
     CLOSE
  ========================================= */

  const handleClose = useCallback(() => {
    if (loading) return;

    resetForm();
    onClose();
  }, [
    loading,
    resetForm,
    onClose,
  ]);

  /* =========================================
     SUBMIT
  ========================================= */

  const submit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setError("");

      /* ---------------------------------------
         VALIDATE NAME
      --------------------------------------- */

      if (name.trim().length < 2) {
        setError(
          "Team name must be at least 2 characters."
        );
        return;
      }

      /* ---------------------------------------
         VALIDATE DEPARTMENT
      --------------------------------------- */

      if (!departmentId) {
        setError(
          "Please select a department."
        );
        return;
      }

      try {
        setLoading(true);

        /* -------------------------------------
           CREATE TEAM
        ------------------------------------- */

        await createTeam({
          name: name.trim(),
          description:
            description.trim() || undefined,
          departmentId: Number(departmentId),
        });

        /* -------------------------------------
           RESET
        ------------------------------------- */

        resetForm();

        /* -------------------------------------
           SUCCESS
        ------------------------------------- */

        onSuccess();
        onClose();
      } catch (err: any) {
        console.error(
          "Failed to create team:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to create team."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      name,
      description,
      departmentId,
      resetForm,
      onSuccess,
      onClose,
    ]
  );

  return {
    /* Form */
    name,
    setName,

    description,
    setDescription,

    departmentId,
    setDepartmentId,

    /* Departments */
    departments,
    departmentsLoading,

    /* UI */
    loading,
    error,

    /* Actions */
    submit,
    handleClose,
    resetForm,
    loadDepartments,
  };
}
