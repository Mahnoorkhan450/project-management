
"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // -----------------------------
    // Validation
    // -----------------------------

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    if (trimmedName.length < 2) {
      setError(
        "Name must be at least 2 characters."
      );
      return;
    }

    if (!trimmedEmail) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (!password) {
      setError(
        "Please create a password."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      await register({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      router.push("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Unable to create your account. Please try again."
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
      {/* --------------------------------
          Error Message
      --------------------------------- */}

      {error && (
        <div
          className="
            rounded-xl
            border border-[#E7CACA]
            bg-[#FFF7F7]
            px-4
            py-3
          "
        >
          <p
            className="
              text-[11px]
              font-medium
              leading-5
              text-[#A65F5F]
            "
          >
            {error}
          </p>
        </div>
      )}

      {/* --------------------------------
          Full Name
      --------------------------------- */}

      <div>
        <label
          htmlFor="name"
          className="
            mb-2
            block
            text-[12px]
            font-semibold
            text-[#182124]
          "
        >
          Full name
        </label>

        <div className="relative">
          <UserRound
            size={16}
            strokeWidth={1.8}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-[#6E7B7D]
            "
          />

          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            disabled={loading}
            required
            maxLength={100}
            className="
              h-[48px]
              w-full
              rounded-xl
              border border-[#DDE3E3]
              bg-[#F7F8F7]
              pl-10
              pr-4
              text-[13px]
              text-[#182124]
              outline-none
              transition

              placeholder:text-[#8A9698]

              hover:border-[#BFCBCB]

              focus:border-[#0B626A]
              focus:bg-white
              focus:ring-4
              focus:ring-[#0B626A]/10

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>
      </div>

      {/* --------------------------------
          Email
      --------------------------------- */}

      <div>
        <label
          htmlFor="email"
          className="
            mb-2
            block
            text-[12px]
            font-semibold
            text-[#182124]
          "
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            size={16}
            strokeWidth={1.8}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-[#6E7B7D]
            "
          />

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            disabled={loading}
            required
            maxLength={150}
            className="
              h-[48px]
              w-full
              rounded-xl
              border border-[#DDE3E3]
              bg-[#F7F8F7]
              pl-10
              pr-4
              text-[13px]
              text-[#182124]
              outline-none
              transition

              placeholder:text-[#8A9698]

              hover:border-[#BFCBCB]

              focus:border-[#0B626A]
              focus:bg-white
              focus:ring-4
              focus:ring-[#0B626A]/10

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />
        </div>
      </div>

      {/* --------------------------------
          Password
      --------------------------------- */}

      <div>
        <label
          htmlFor="password"
          className="
            mb-2
            block
            text-[12px]
            font-semibold
            text-[#182124]
          "
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={16}
            strokeWidth={1.8}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-[#6E7B7D]
            "
          />

          <input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Create a secure password"
            autoComplete="new-password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            disabled={loading}
            required
            minLength={6}
            className="
              h-[48px]
              w-full
              rounded-xl
              border border-[#DDE3E3]
              bg-[#F7F8F7]
              pl-10
              pr-11
              text-[13px]
              text-[#182124]
              outline-none
              transition

              placeholder:text-[#8A9698]

              hover:border-[#BFCBCB]

              focus:border-[#0B626A]
              focus:bg-white
              focus:ring-4
              focus:ring-[#0B626A]/10

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          <button
            type="button"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            onClick={() =>
              setShowPassword(
                (value) => !value
              )
            }
            disabled={loading}
            className="
              absolute
              right-2
              top-1/2
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-lg
              text-[#6E7B7D]
              transition

              hover:bg-[#DCE9E9]
              hover:text-[#064B52]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {showPassword ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        </div>

        <p
          className="
            mt-1.5
            text-[10px]
            leading-4
            text-[#6E7B7D]
          "
        >
          Use at least 6 characters.
        </p>
      </div>

      {/* --------------------------------
          Terms
      --------------------------------- */}

      <label
        className="
          flex
          cursor-pointer
          items-start
          gap-2.5
          pt-0.5
        "
      >
        <input
          type="checkbox"
          required
          disabled={loading}
          className="
            mt-0.5
            h-4
            w-4
            shrink-0
            rounded
            border-[#DDE3E3]
            accent-[#064B52]
          "
        />

        <span
          className="
            text-[10px]
            leading-5
            text-[#6E7B7D]
          "
        >
          I agree to the{" "}
          <Link
            href="#"
            className="
              font-semibold
              text-[#064B52]
              hover:text-[#04383E]
            "
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="
              font-semibold
              text-[#064B52]
              hover:text-[#04383E]
            "
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {/* --------------------------------
          Submit
      --------------------------------- */}

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          h-[49px]
          w-full
          items-center
          justify-center
          rounded-xl
          bg-[#064B52]
          text-[13px]
          font-semibold
          text-white

          shadow-[0_8px_20px_-8px_rgba(6,75,82,0.55)]

          transition

          hover:bg-[#0B626A]
          hover:shadow-[0_10px_24px_-8px_rgba(6,75,82,0.6)]

          active:scale-[0.99]

          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <span
              className="
                mr-2
                h-4
                w-4
                animate-spin
                rounded-full
                border-2
                border-white/30
                border-t-white
              "
            />

            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
}
