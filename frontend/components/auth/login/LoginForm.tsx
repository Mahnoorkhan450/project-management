"use client";

import { FormEvent, useState } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Loader2,
} from "lucide-react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: trimmedEmail,
        password,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Invalid email or password."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[12px] leading-5 text-red-600">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-[11px] font-semibold text-[#182124]"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D898A]"
          />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="you@example.com"
            autoComplete="email"
            disabled={loading}
            className="h-12 w-full rounded-xl border border-[#DDE3E3] bg-[#F7F8F7] pl-10 pr-4 text-[13px] text-[#182124] outline-none transition placeholder:text-[#9AA5A6] focus:border-[#064B52] focus:bg-white focus:ring-4 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-[11px] font-semibold text-[#182124]"
          >
            Password
          </label>

          <button
            type="button"
            onClick={() =>
              router.push("/forgot-password")
            }
            className="text-[11px] font-semibold text-[#064B52] transition hover:text-[#0B626A]"
          >
            Forgot password?
          </button>
        </div>

        <div className="relative">
          <LockKeyhole
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D898A]"
          />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={loading}
            className="h-12 w-full rounded-xl border border-[#DDE3E3] bg-[#F7F8F7] pl-10 pr-11 text-[13px] text-[#182124] outline-none transition placeholder:text-[#9AA5A6] focus:border-[#064B52] focus:bg-white focus:ring-4 focus:ring-[#064B52]/10 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword((value) => !value)
            }
            disabled={loading}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7D898A] transition hover:text-[#064B52]"
          >
            {showPassword ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          className="h-3.5 w-3.5 rounded border-[#DDE3E3] accent-[#064B52]"
        />

        <span className="text-[11px] text-[#6E7B7D]">
          Remember me
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#064B52] text-[13px] font-semibold text-white shadow-[0_12px_25px_-15px_rgba(6,75,82,0.7)] transition hover:bg-[#0B626A] hover:shadow-[0_16px_30px_-15px_rgba(6,75,82,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />
            Signing in...
          </>
        ) : (
          <>Sign in</>
        )}
      </button>
    </form>
  );
}