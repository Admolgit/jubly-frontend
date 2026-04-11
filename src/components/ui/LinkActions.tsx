/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

export const LinkActions = ({
  link,
  onReschedule,
  setViewVendorOpen,
  onCancle,
  setSelectedView,
}: any) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 👇 close dropdown when clicking outside
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
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
          <button
            onClick={() => {
              setSelectedView(link);
              setViewVendorOpen(true);
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            View
          </button>

          <button
            onClick={() => {
              onReschedule();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Reschedule
          </button>

          <button
            onClick={() => {
              onCancle();
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* <button
            onClick={() => {
              if (link.status === "CONFIRMED") {
                onDeactivate(link.id);
              } else {
                onReactivate(link.id);
              }
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {link.status === "CONFIRMED" ? "Deactivate" : "Reactivate"}
          </button> */}

          {/* {link.status !== "PENDING" && (
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          )} */}
        </div>
      )}
    </div>
  );
};
