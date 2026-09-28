import type {
  TextareaHTMLAttributes,
} from "react";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) {
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

      <textarea
        id={id}
        className={`
          min-h-28 w-full resize-y rounded-lg border
          bg-white px-4 py-3 text-sm text-slate-900
          outline-none transition
          placeholder:text-slate-400
          focus:border-slate-900
          focus:ring-2 focus:ring-slate-200
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          ${
            error
              ? "border-red-400"
              : "border-slate-300"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}