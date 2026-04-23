/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "../utils/dateFormatter";
import { formatTimeFromISO } from "../utils/timeFormatter";
import Modal from "./Modal";
import { Calendar, Clock, Building2 } from "lucide-react";

function ViewModal({ setViewVendorOpen, viewVendorOpen, booking }: any) {
  return (
    <Modal
      open={viewVendorOpen}
      onClose={() => setViewVendorOpen(false)}
      title="Booking Details"
    >
      <div className="py-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{booking?.services?.name}</h2>
            <p className="text-sm text-gray-500">BOOKING ID: {booking?.id}</p>
          </div>

          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              booking?.status === "CONFIRMED"
                ? "bg-green-100 text-green-600"
                : booking?.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
            }`}
          >
            {booking?.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-4">
          {/* Vendor */}
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Building2 size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vendor</p>
              <p className="font-medium">{booking?.vendorName}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Calendar size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Service Date</p>
              <p className="font-medium">{formatDate(booking?.date)}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Clock size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Appointment Time</p>
              <p className="font-medium">
                {formatTimeFromISO(booking?.startTime)} -{" "}
                {formatTimeFromISO(booking?.endTime)}
              </p>
            </div>
          </div>
        </div>

        {/* Price Box */}
        <div className="border rounded-xl p-4 bg-gray-50 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Service Total</p>
            <p className="text-xs text-gray-400">
              Payment processed successfully
            </p>
          </div>
          <p className="font-semibold text-lg">
            ₦{booking?.services?.price || "0.00"}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setViewVendorOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            {/* Close */}
          </button>

          {booking?.status === "CONFIRMED" && (
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
              Download receipt
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ViewModal;
