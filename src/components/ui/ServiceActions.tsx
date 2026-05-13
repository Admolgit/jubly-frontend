/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

export const ServiceActions = ({ link, onReactivate, onDeactivate }: any) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50 ">

          {link.active !== true && (
            <button
              onClick={() => {
                onReactivate(link);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Reactivate
            </button>
          )}

          {link.active !== false && (
            <button
              onClick={() => {
                onDeactivate(link);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Deactivate
            </button>
          )}

          {/* {link.status !== "CANCELLED" && (
            <button
              onClick={() => {
                onMarking(link)
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {link.status === "CONFIRMED" ? "Mark as completed" : "Dispute"}
            </button>
          )} */}
        </div>
      )}
    </div>
  );
};
