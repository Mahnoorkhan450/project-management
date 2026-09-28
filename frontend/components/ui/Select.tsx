import type {
  SelectHTMLAttributes,
} from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export default function Select({
  label,
  error,
  options,
  id,
  className = "",
  ...props
}: SelectProps) {
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

      <select
        id={id}
        className={`
          w-full rounded-lg border
          bg-white px-4 py-3
          text-sm text-slate-900
          outline-none transition
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
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}