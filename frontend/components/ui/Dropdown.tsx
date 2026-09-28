"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

export default function Dropdown({
  trigger,
  children,
  align = "right",
}: DropdownProps) {
  const [open, setOpen] =
    useState(false);

  const ref =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        ref.current &&
        !ref.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
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

  return (
    <div
      ref={ref}
      className="relative inline-block"
    >
      <div
        onClick={() =>
          setOpen((previous) => !previous)
        }
      >
        {trigger}
      </div>

      {open && (
        <div
          className={`
            absolute top-full z-40 mt-2
            min-w-44 rounded-xl border
            border-slate-200 bg-white p-1
            shadow-lg
            ${
              align === "right"
                ? "right-0"
                : "left-0"
            }
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
}