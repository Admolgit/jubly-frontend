import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

export function CustomSelect({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-[0.6rem] text-sm"
      >
        <span>{selected?.label || "Select an option"}</span>
        <span className="text-gray-400">▾</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
