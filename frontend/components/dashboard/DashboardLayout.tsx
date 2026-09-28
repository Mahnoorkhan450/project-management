
"use client";

import { useState, type ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-[#F7F8F7]
        text-[#182124]
        transition-colors

        dark:bg-[#101719]
        dark:text-[#F1F5F5]
      "
    >
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />

      <MobileNav
        onOpen={() =>
          setMobileOpen(true)
        }
      />

      <div className="lg:pl-[260px]">
        <Navbar />

        <main
          className="
            min-h-[calc(100vh-72px)]
            bg-[#F7F8F7]
            px-4 py-5
            transition-colors

            dark:bg-[#101719]

            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1400px]
            "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
