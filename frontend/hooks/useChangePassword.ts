
"use client";

import {
  useState,
  type FormEvent,
} from "react";

import { changePassword } from "@/services/authService";

export type PasswordToastType =
  | "success"
  | "error";

export interface PasswordToast {
  type: PasswordToastType;
  message: string;
}

export default function useChangePassword() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [
    showCurrentPassword,
    setShowCurrentPassword,
  ] = useState(false);

  const [
    showNewPassword,
    setShowNewPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState<PasswordToast | null>(null);

  const showToast = (
    type: PasswordToastType,
    message: string
  ) => {
    setToast({
      type,
      message,
    });
  };

  const clearToast = () => {
    setToast(null);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!currentPassword) {
      showToast(
        "error",
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      showToast(
        "error",
        "Please enter a new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      showToast(
        "error",
        "New password must be at least 6 characters."
      );
      return;
    }

    if (!confirmPassword) {
      showToast(
        "error",
        "Please confirm your new password."
      );
      return;
    }

    if (
      newPassword !== confirmPassword
    ) {
      showToast(
        "error",
        "New password and confirm password must match."
      );
      return;
    }

    if (
      currentPassword === newPassword
    ) {
      showToast(
        "error",
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);

      const message =
        await changePassword({
          currentPassword,
          newPassword,
          confirmPassword,
        });

      showToast(
        "success",
        message ||
          "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error: any) {
      console.error(
        "Change password error:",
        error
      );

      const message =
        error?.response?.data?.message ||
        "Failed to change password.";

      showToast(
        "error",
        message
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,

    newPassword,
    setNewPassword,

    confirmPassword,
    setConfirmPassword,

    showCurrentPassword,
    setShowCurrentPassword,

    showNewPassword,
    setShowNewPassword,

    showConfirmPassword,
    setShowConfirmPassword,

    loading,

    toast,
    showToast,
    clearToast,

    handleSubmit,
  };
}
