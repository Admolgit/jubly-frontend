// src/components/ui/Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  placeholder?: string;
  defaultValue?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, error, className = "", defaultValue, ...props }, ref) => {
    return (
      <div className="flex flex-col mb-3">
        <label className="mb-1 text-sm font-medium">{label}</label>
        <input
          {...props}
          ref={ref}
          className={`border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
          placeholder={placeholder}
          defaultValue={defaultValue && defaultValue}
        />
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
