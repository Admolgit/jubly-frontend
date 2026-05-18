// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  placeholder?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, placeholder, error, className = "", defaultValue, icon, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col mb-3">
        <label className="mb-1 text-sm font-medium">{label}</label>

        <div className="relative">
          {icon && (
            <div className="absolute z-10 left-3 top-1/2 h-5 w-5 -translate-y-1/2">
              {icon}
            </div>
          )}
          <input
            {...props}
            ref={ref}
            className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            placeholder={placeholder}
            defaultValue={defaultValue && defaultValue}
          />
        </div>
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
