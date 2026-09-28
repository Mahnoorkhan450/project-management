"use client";

import {
  CheckCircle,
  Info,
  TriangleAlert,
  XCircle,
  X,
} from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

const config = {
  success: {
    icon: CheckCircle,
    className:
      "border-[#CFE2D5] bg-[#F2F9F4] text-[#287A45] dark:border-[#31583D] dark:bg-[#1B3021] dark:text-[#8ED6A3]",
  },

  error: {
    icon: XCircle,
    className:
      "border-[#F0CACA] bg-[#FFF5F5] text-[#B42318] dark:border-[#633333] dark:bg-[#351F1F] dark:text-[#FF9B9B]",
  },

  warning: {
    icon: TriangleAlert,
    className:
      "border-[#EADCB8] bg-[#FFFBEF] text-[#8A6A00] dark:border-[#62552C] dark:bg-[#302B1B] dark:text-[#E7CC73]",
  },

  info: {
    icon: Info,
    className:
      "border-[#C9DDE0] bg-[#F2F8F9] text-[#064B52] dark:border-[#31575B] dark:bg-[#1C3033] dark:text-[#9BCDD1]",
  },
};

export default function Toast({
  message,
  type = "info",
  onClose,
}: ToastProps) {
  if (!message) {
    return null;
  }

  const {
    icon: Icon,
    className,
  } = config[type];

  return (
    <div
      className={`
        fixed
        right-5
        top-5
        z-[100]
        flex
        w-[360px]
        items-center
        gap-3
        rounded-2xl
        border
        px-4
        py-3.5
        shadow-[0_12px_35px_rgba(0,0,0,0.12)]
        animate-[toastIn_0.3s_ease-out]
        ${className}
      `}
      role="alert"
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-white/70
          dark:bg-white/5
        "
      >
        <Icon size={19} />
      </div>

      <p
        className="
          flex-1
          text-sm
          font-medium
          leading-5
        "
      >
        {message}
      </p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-current
            opacity-60
            transition
            hover:bg-black/5
            hover:opacity-100
            dark:hover:bg-white/10
          "
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}