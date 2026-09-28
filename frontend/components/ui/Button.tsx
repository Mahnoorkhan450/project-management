import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import Spinner from "./Spinner";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variants = {
  primary:
    "bg-[#064B52] text-white hover:bg-[#04383E]",

  secondary:
    "border border-[#DDE3E3] bg-white text-[#182124] hover:bg-[#F5F7F7]",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  ghost:
    "bg-transparent text-[#536063] hover:bg-[#F5F7F7]",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-medium
        transition-colors
        focus:outline-none
        focus:ring-2
        focus:ring-[#064B52]/30
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}