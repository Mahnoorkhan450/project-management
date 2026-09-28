"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  getUserDetails,
  type UserProfile,
  type UpdateProfileData,
  type ChangePasswordData,
  type MemberDetailsData,
} from "@/services/userService";

export default function useUsers() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [selectedUser, setSelectedUser] =
    useState<MemberDetailsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================================
     LOAD PROFILE
  ========================================= */

  const loadProfile = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyProfile();

        setProfile(data);

        return data;
      } catch (err: any) {
        console.error(
          "Failed to load profile:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load profile."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /* =========================================
     AUTO LOAD PROFILE
  ========================================= */

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /* =========================================
     UPDATE PROFILE
  ========================================= */

  const updateProfile = async (
    data: UpdateProfileData
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const updatedProfile =
        await updateMyProfile(data);

      setProfile(updatedProfile);

      return updatedProfile;
    } catch (err: any) {
      console.error(
        "Failed to update profile:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to update profile."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================
     UPDATE PASSWORD
  ========================================= */

  const updatePassword = async (
    data: ChangePasswordData
  ) => {
    try {
      setActionLoading(true);
      setError("");

      const message =
        await changeMyPassword(data);

      return message;
    } catch (err: any) {
      console.error(
        "Failed to change password:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to change password."
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================
     LOAD USER DETAILS
  ========================================= */

  const loadUserDetails = async (
    userId: number
  ) => {
    try {
      setLoading(true);
      setError("");

      const details =
        await getUserDetails(userId);

      setSelectedUser(details);

      return details;
    } catch (err: any) {
      console.error(
        "Failed to load user details:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load user details."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     CLEAR SELECTED USER
  ========================================= */

  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  /* =========================================
     CLEAR ERROR
  ========================================= */

  const clearError = () => {
    setError("");
  };

  return {
    profile,
    selectedUser,

    loading,
    actionLoading,
    error,

    loadProfile,
    updateProfile,
    updatePassword,
    loadUserDetails,

    clearSelectedUser,
    clearError,
  };
}