/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell } from "lucide-react";

export default function DashboardHeader({
  setServiceOpen,
  setBookingOpen,
  vendorData,
}: {
  setServiceOpen: (value: boolean) => void;
  setBookingOpen: (value: boolean) => void;
  vendorData: any;
}) {
  return (
    <div className="space-y-6">
      {/* TOP HEADER */}
      <div className="flex items-start justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your bookings, earnings, and clients.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
          </button>

          {/* Add Service */}
          <button
            onClick={() => setServiceOpen(true)}
            className="px-4 py-2 rounded-lg border text-sm font-medium text-purple-600 border-purple-200 hover:bg-purple-50 transition"
          >
            + Add Service
          </button>

          {/* Create Booking */}
          <button
            onClick={() => setBookingOpen(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
          >
            + Create Booking
          </button>
        </div>
      </div>

      {/* WELCOME CARD */}
      <div className="bg-white rounded-2xl border p-5 flex items-center justify-between shadow-sm">
        {/* LEFT */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome back,{" "}
            <span className="text-purple-600 font-semibold">
              {vendorData?.data?.vendor?.businessName || "Vendor"}
            </span>{" "}
            👋
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Here’s what’s happening with your business today.
          </p>
        </div>

        {/* RIGHT (Verified Badge) */}
        <div className="flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
          {vendorData?.data?.vendor?.kycStatus === "APPROVED"
            ? "Verified"
            : "Pending Verification"}
        </div>
      </div>
    </div>
  );
}
