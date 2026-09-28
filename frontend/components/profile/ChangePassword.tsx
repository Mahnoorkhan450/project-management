
"use client";

import {
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";

import useChangePassword from "@/hooks/useChangePassword";

export default function ChangePassword() {
  const {
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
    clearToast,

    handleSubmit,
  } = useChangePassword();

  return (
    <div className="relative rounded-2xl border border-[#DDE3E3] bg-white p-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-6 top-6 z-50 flex w-[360px] items-start gap-3 rounded-xl border bg-white px-4 py-3.5 shadow-lg ${
            toast.type === "success"
              ? "border-green-200"
              : "border-red-200"
          }`}
        >
          <div className="shrink-0 pt-0.5">
            {toast.type === "success" ? (
              <CheckCircle2
                size={20}
                className="text-green-600"
              />
            ) : (
              <XCircle
                size={20}
                className="text-red-600"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-semibold ${
                toast.type === "success"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {toast.type === "success"
                ? "Success"
                : "Error"}
            </p>

            <p className="mt-0.5 text-sm text-[#596568]">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={clearToast}
            className="shrink-0 text-[#8A9597] transition hover:text-[#182124]"
            aria-label="Close notification"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-[#182124]">
          Change Password
        </h2>

        <p className="mt-1 text-sm text-[#6E7B7D]">
          Keep your account secure with a strong password.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="mb-2 block text-sm font-medium text-[#182124]"
          >
            Current Password
          </label>

          <div className="relative">
            <input
              id="currentPassword"
              type={
                showCurrentPassword
                  ? "text"
                  : "password"
              }
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              disabled={loading}
              placeholder="Enter current password"
              className="h-11 w-full rounded-lg border border-[#DDE3E3] bg-white px-3 pr-11 text-sm text-[#182124] outline-none transition placeholder:text-[#A1AAAC] focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowCurrentPassword(
                  (value) => !value
                )
              }
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#7A8789] transition hover:text-[#064B52] disabled:cursor-not-allowed"
              aria-label={
                showCurrentPassword
                  ? "Hide current password"
                  : "Show current password"
              }
            >
              {showCurrentPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium text-[#182124]"
          >
            New Password
          </label>

          <div className="relative">
            <input
              id="newPassword"
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              disabled={loading}
              placeholder="Enter new password"
              className="h-11 w-full rounded-lg border border-[#DDE3E3] bg-white px-3 pr-11 text-sm text-[#182124] outline-none transition placeholder:text-[#A1AAAC] focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowNewPassword(
                  (value) => !value
                )
              }
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#7A8789] transition hover:text-[#064B52] disabled:cursor-not-allowed"
              aria-label={
                showNewPassword
                  ? "Hide new password"
                  : "Show new password"
              }
            >
              {showNewPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <p className="mt-1.5 text-xs text-[#8A9597]">
            Password must be at least 6 characters.
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-[#182124]"
          >
            Confirm New Password
          </label>

          <div className="relative">
            <input
              id="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              disabled={loading}
              placeholder="Confirm new password"
              className="h-11 w-full rounded-lg border border-[#DDE3E3] bg-white px-3 pr-11 text-sm text-[#182124] outline-none transition placeholder:text-[#A1AAAC] focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:bg-[#F7F8F7]"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShowConfirmPassword(
                  (value) => !value
                )
              }
              className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#7A8789] transition hover:text-[#064B52] disabled:cursor-not-allowed"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end border-t border-[#E8ECEC] pt-5">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#064B52] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#04383E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
