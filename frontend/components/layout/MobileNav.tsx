
"use client";

import { Menu } from "lucide-react";

interface MobileNavProps {
  onOpen: () => void;
}

export default function MobileNav({
  onOpen,
}: MobileNavProps) {
  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open sidebar"
        className="
          fixed
          left-4 top-4
          z-30
          flex h-10 w-10
          items-center justify-center
          rounded-lg
          border
          border-[#DDE3E3]
          bg-white
          text-[#064B52]
          shadow-sm
          transition

          hover:bg-[#F2F6F6]

          dark:border-[#344649]
          dark:bg-[#172326]
          dark:text-[#8BC1C4]
          dark:hover:bg-[#243437]
        "
      >
        <Menu
          size={20}
          strokeWidth={1.8}
        />
      </button>
    </div>
  );
}
