/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { NON_ACTIONABLE_BOOKING_STATUSES } from "../utils/bookingStatus";

const MENU_WIDTH = 192; // matches w-48
const MENU_MARGIN = 8;

export const LinkActions = ({
  link,
  onReschedule,
  onManageReschedule,
  setViewVendorOpen,
  onCancle,
  setSelectedView,
  onMarking,
  component,
}: any) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(
    null,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActionable = !NON_ACTIONABLE_BOOKING_STATUSES.includes(link?.status);
  const hasActiveReschedule = link?.status === "RESCHEDULE_REQUESTED";

  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const left = Math.min(
      Math.max(rect.right - MENU_WIDTH, MENU_MARGIN),
      window.innerWidth - MENU_WIDTH - MENU_MARGIN,
    );

    setPosition({ top: rect.bottom + 8, left });
  };

  const handleToggle = () => {
    if (!open) updatePosition();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    
    const handleScrollOrResize = () => setOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 hover:bg-gray-200 rounded"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open &&
        position &&
        createPortal(
          <div
            ref={menuRef}
            style={{ top: position.top, left: position.left }}
            className="fixed z-[9999] w-48 rounded-xl border border-gray-100 bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => {
                setSelectedView(link);
                setViewVendorOpen(true);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              View
            </button>

            {link?.status !== "CANCELLED" && component === "transaction" && (
              <button
                type="button"
                onClick={() => {
                  onReschedule(link);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Refund Client
              </button>
            )}

            {component !== "transaction" && hasActiveReschedule && (
              <button
                type="button"
                onClick={() => {
                  onManageReschedule?.(link);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Manage Reschedule Request
              </button>
            )}

            {component !== "transaction" &&
              isActionable &&
              !hasActiveReschedule &&
              !(link?.rescheduleCount > 0) && (
                <button
                  type="button"
                  onClick={() => {
                    onReschedule(link);
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Reschedule
                </button>
              )}

            {component !== "transaction" && isActionable && (
              <button
                type="button"
                onClick={() => {
                  onCancle(link);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>
            )}

            {component !== "transaction" && isActionable && !hasActiveReschedule && (
              <button
                type="button"
                onClick={() => {
                  onMarking(link);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {link?.status === "CONFIRMED" ? "Mark as completed" : "Dispute"}
              </button>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
};
