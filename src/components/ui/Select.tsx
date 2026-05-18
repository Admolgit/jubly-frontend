// src/components/ui/Select.tsx

import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      placeholder = "Select option",
      className = "",
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="mb-3 flex flex-col">
        <label className="mb-1 text-sm font-medium">{label}</label>

        <div className="relative">
          {/* Left Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}

          {/* Right Chevron */}
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

          <select
            {...props}
            ref={ref}
            className={`w-full appearance-none rounded border p-2 pr-10 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              icon ? "pl-10" : ""
            } ${className}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
