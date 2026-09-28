import type {
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          className={`
            w-full rounded-lg border
            bg-white px-4 py-3
            text-sm text-slate-900
            outline-none transition
            placeholder:text-slate-400
            focus:border-slate-900
            focus:ring-2 focus:ring-slate-200
            disabled:cursor-not-allowed
            disabled:bg-slate-100
            ${icon ? "pl-10" : ""}
            ${
              error
                ? "border-red-400 focus:border-red-500"
                : "border-slate-300"
            }
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}