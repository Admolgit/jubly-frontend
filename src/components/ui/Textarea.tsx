// src/components/ui/Textarea.tsx

import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      placeholder,
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
          {icon && (
            <div className="absolute left-3 top-4 z-10 h-5 w-5 text-gray-500">
              {icon}
            </div>
          )}

          <textarea
            {...props}
            ref={ref}
            placeholder={placeholder}
            className={`w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              icon ? "pl-10" : ""
            } ${className}`}
          />
        </div>

        {error && (
          <span className="mt-1 text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;