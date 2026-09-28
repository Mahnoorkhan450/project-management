"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfileOverview() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const name = user.name || "User";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const role =
    user.role === "ADMIN"
      ? "Administrator"
      : "Member";

  return (
    <div className="px-2 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DCE9E9] text-sm font-semibold text-[#064B52]">
          {initials}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-[#182124]">
            {name}
          </h2>

          <p className="mt-0.5 text-xs text-[#6E7B7D]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}