
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  ChevronDown,
  LogOut,
  Moon,
  Settings,
  Sun,
  UserRound,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef =
    useRef<HTMLDivElement>(null);

  // ==========================================
  // USER INFORMATION
  // ==========================================

  const userName = user?.name || "User";

  const userRole =
    user?.role === "ADMIN"
      ? "Administrator"
      : "Member";

  // ==========================================
  // USER INITIALS
  // ==========================================

  const userInitials = userName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) =>
      name.charAt(0).toUpperCase()
    )
    .join("");

  // ==========================================
  // CLOSE PROFILE DROPDOWN
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // THEME TOGGLE
  // ==========================================

  const toggleTheme = () => {
    setTheme(
      theme === "dark"
        ? "light"
        : "dark"
    );
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    setProfileOpen(false);

    logout();

    window.location.href = "/login";
  };

  return (
    <header
      className="
        relative z-30
        flex h-[72px]
        shrink-0
        items-center
        justify-end
        border-b
        border-[#DDE3E3]
        bg-white
        px-5
        transition-colors

        dark:border-[#293638]
        dark:bg-[#172326]

        sm:px-7
      "
    >
      <div
        className="
          flex items-center
          gap-1.5
          sm:gap-2
        "
      >
        {/* ==================================
            NOTIFICATIONS
            ================================== */}

        <NotificationDropdown />

        {/* ==================================
            THEME
            ================================== */}

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="
            flex h-9 w-9
            items-center
            justify-center
            rounded-lg
            text-[#6E7B7D]
            transition

            hover:bg-[#F2F6F6]
            hover:text-[#064B52]

            dark:text-[#9AA7A8]
            dark:hover:bg-[#243437]
            dark:hover:text-[#8BC1C4]
          "
        >
          {theme === "dark" ? (
            <Sun
              className="h-[17px] w-[17px]"
              strokeWidth={1.8}
            />
          ) : (
            <Moon
              className="h-[17px] w-[17px]"
              strokeWidth={1.8}
            />
          )}
        </button>

        {/* ==================================
            DIVIDER
            ================================== */}

        <div
          className="
            mx-1
            hidden
            h-7 w-px
            bg-[#DDE3E3]

            dark:bg-[#293638]

            sm:block
          "
        />

        {/* ==================================
            PROFILE
            ================================== */}

        <div
          ref={profileRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setProfileOpen(
                (open) => !open
              )
            }
            aria-expanded={profileOpen}
            className="
              flex items-center
              gap-2
              rounded-xl
              px-1.5 py-1
              transition

              hover:bg-[#F2F6F6]

              dark:hover:bg-[#243437]
            "
          >
            {/* AVATAR */}

            <div
              className="
                flex h-9 w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#064B52]
                text-xs
                font-semibold
                text-white
              "
            >
              {userInitials || "U"}
            </div>

            {/* USER INFORMATION */}

            <div
              className="
                hidden
                text-left
                lg:block
              "
            >
              <p
                className="
                  max-w-[130px]
                  truncate
                  text-xs
                  font-semibold
                  text-[#182124]

                  dark:text-[#F1F5F5]
                "
              >
                {userName}
              </p>

              <p
                className="
                  text-[10px]
                  text-[#8A9697]

                  dark:text-[#829294]
                "
              >
                {userRole}
              </p>
            </div>

            {/* CHEVRON */}

            <ChevronDown
              className={`
                hidden
                h-3.5 w-3.5
                text-[#8A9697]
                transition-transform

                dark:text-[#829294]

                lg:block

                ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {/* ==================================
              PROFILE DROPDOWN
              ================================== */}

          {profileOpen && (
            <div
              className="
                absolute
                right-0
                top-[calc(100%+10px)]
                w-[240px]
                overflow-hidden
                rounded-2xl
                border
                border-[#DDE3E3]
                bg-white
                shadow-[0_12px_35px_rgba(24,33,36,0.12)]

                dark:border-[#293638]
                dark:bg-[#172326]
                dark:shadow-[0_12px_35px_rgba(0,0,0,0.35)]
              "
            >
              {/* USER SUMMARY */}

              <div
                className="
                  border-b
                  border-[#DDE3E3]
                  px-4 py-3.5

                  dark:border-[#293638]
                "
              >
                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#064B52]
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    {userInitials || "U"}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-[#182124]

                        dark:text-[#F1F5F5]
                      "
                    >
                      {userName}
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-[#8A9697]

                        dark:text-[#829294]
                      "
                    >
                      {userRole}
                    </p>

                    {user?.email && (
                      <p
                        className="
                          mt-0.5
                          truncate
                          text-[10px]
                          text-[#A0AAAB]

                          dark:text-[#718082]
                        "
                      >
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* MENU */}

              <div className="p-1.5">
                <Link
                  href="/profile"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="
                    flex items-center
                    gap-3
                    rounded-xl
                    px-3 py-2.5
                    text-xs
                    font-medium
                    text-[#182124]
                    transition

                    hover:bg-[#F2F6F6]
                    hover:text-[#064B52]

                    dark:text-[#D9E2E3]
                    dark:hover:bg-[#243437]
                    dark:hover:text-[#8BC1C4]
                  "
                >
                  <UserRound
                    className="
                      h-4 w-4
                      text-[#6E7B7D]

                      dark:text-[#829294]
                    "
                  />

                  Profile
                </Link>

                <Link
                  href="/settings"
                  onClick={() =>
                    setProfileOpen(false)
                  }
                  className="
                    flex items-center
                    gap-3
                    rounded-xl
                    px-3 py-2.5
                    text-xs
                    font-medium
                    text-[#182124]
                    transition

                    hover:bg-[#F2F6F6]
                    hover:text-[#064B52]

                    dark:text-[#D9E2E3]
                    dark:hover:bg-[#243437]
                    dark:hover:text-[#8BC1C4]
                  "
                >
                  <Settings
                    className="
                      h-4 w-4
                      text-[#6E7B7D]

                      dark:text-[#829294]
                    "
                  />

                  Settings
                </Link>
              </div>

              {/* LOGOUT */}

              <div
                className="
                  border-t
                  border-[#DDE3E3]
                  p-1.5

                  dark:border-[#293638]
                "
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3 py-2.5
                    text-xs
                    font-medium
                    text-red-600
                    transition

                    hover:bg-red-50

                    dark:text-red-400
                    dark:hover:bg-red-950/30
                  "
                >
                  <LogOut className="h-4 w-4" />

                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
