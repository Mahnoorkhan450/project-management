"use client";

import {
  useState,
  type ReactNode,
} from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export default function Tooltip({
  content,
  children,
}: TooltipProps) {
  const [visible, setVisible] =
    useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() =>
        setVisible(true)
      }
      onMouseLeave={() =>
        setVisible(false)
      }
    >
      {children}

      {visible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs text-white shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
}