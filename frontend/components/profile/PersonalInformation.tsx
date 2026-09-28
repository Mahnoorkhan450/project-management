"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function PersonalInformation() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // API update baad mein yahan connect hoga
    console.log("Updated profile:", {
      name,
    });
  };

  return (
    <div className="rounded-2xl border border-[#DDE3E3] bg-white p-6">
      <div>
        <h2 className="text-base font-semibold text-[#182124]">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-[#6E7B7D]">
          Update your basic account information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[#182124]"
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#DDE3E3] bg-white px-3 text-sm text-[#182124] outline-none transition focus:border-[#064B52] focus:ring-2 focus:ring-[#064B52]/10"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#182124]"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="h-11 w-full cursor-not-allowed rounded-lg border border-[#DDE3E3] bg-[#F7F8F7] px-3 text-sm text-[#6E7B7D]"
          />

          <p className="mt-1.5 text-xs text-[#8A9597]">
            Email address cannot be changed.
          </p>
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="mb-2 block text-sm font-medium text-[#182124]"
          >
            Role
          </label>

          <input
            id="role"
            type="text"
            value={
              user?.role === "ADMIN"
                ? "Administrator"
                : "Member"
            }
            disabled
            className="h-11 w-full cursor-not-allowed rounded-lg border border-[#DDE3E3] bg-[#F7F8F7] px-3 text-sm text-[#6E7B7D]"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="rounded-lg bg-[#064B52] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#04383E]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}