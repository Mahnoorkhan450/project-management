"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  const modalContent = (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        min-h-screen
        items-center
        justify-center
        overflow-y-auto
        bg-[#101719]/45
        p-4
        backdrop-blur-[2px]
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`
          relative
          w-full
          ${sizes[size]}
          rounded-2xl
          border
          border-[#DDE3E3]
          bg-white
          shadow-2xl
          dark:border-[#344649]
          dark:bg-[#172326]
        `}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#E8ECEC]
            px-6
            py-4
            dark:border-[#2B3A3D]
          "
        >
          {title && (
            <h2
              className="
                text-lg
                font-semibold
                text-[#182124]
                dark:text-[#F1F5F5]
              "
            >
              {title}
            </h2>
          )}

          <button
            type="button"
            onClick={onClose}
            className="
              ml-auto
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-[#6E7B7D]
              transition
              hover:bg-[#F1F4F4]
              hover:text-[#182124]
              dark:text-[#AAB8BA]
              dark:hover:bg-[#243437]
              dark:hover:text-[#F1F5F5]
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.body
  );
}