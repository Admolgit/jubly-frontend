import { X } from "lucide-react";
import { useEffect } from "react";
import type { ReactNode } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass =
    size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-3xl" : "max-w-xl";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      {/* Overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal container */}
      <div className="relative flex min-h-full items-start justify-center px-4 py-10 overflow-y-auto">
        <div
          className={`w-full ${sizeClass} rounded-2xl bg-white shadow-2xl transform transition-all duration-200 scale-100`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            {title ? (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            ) : (
              <span />
            )}

            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
