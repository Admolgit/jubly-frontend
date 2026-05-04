/* eslint-disable @typescript-eslint/no-explicit-any */

import Modal from "../../ui/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  booking: any;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-600",
};

export default function ViewBookingModal({ open, onClose, booking }: Props) {
  if (!booking) return null;

  return (
    <Modal open={open} onClose={onClose} title="Booking Details">
      <div className="space-y-5 text-sm">
        {/* 👤 Client Info */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Client</h3>
          <p className="text-gray-600">{booking.clientName}</p>
          <p className="text-gray-500 text-xs">{booking.clientEmail}</p>
        </div>

        {/* 💼 Service Info */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Service</h3>
          <p className="text-gray-600">{booking.services?.name || "Service"}</p>
          <p className="text-gray-900 font-medium">
            ₦ {Number(booking.services?.price || 0).toLocaleString()}
          </p>
        </div>

        {/* 📅 Date & Time */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Schedule</h3>
          <p className="text-gray-600">{formatDate(booking.date)}</p>
          <p className="text-gray-600">
            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
          </p>
        </div>

        {/* 📌 Status */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Status</h3>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              statusStyles[booking.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {booking.status}
          </span>
        </div>

        {/* 🧾 Meta */}
        <div className="text-xs text-gray-400 border-t pt-3 space-y-1">
          <p>Booking ID: {booking.id}</p>
          <p>Created: {formatDate(booking.createdAt)}</p>
        </div>

        {/* 🔘 Actions */}
        <div className="flex justify-end pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
