/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell, CheckCircle2, Plus } from "lucide-react";

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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your bookings, earnings, and clients.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="relative rounded-full p-2.5 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-900" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-600" />
          </button>

          <button
            onClick={() => setServiceOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </button>

          <button
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Create Booking
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome back,{" "}
            <span className="font-semibold text-purple-600">
              {vendorData?.data?.vendor?.businessName || "Vendor"}
            </span>{" "}
            👋
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your business today.
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600 sm:flex">
          <CheckCircle2 className="h-4 w-4 fill-purple-600 text-white" />
          {vendorData?.data?.vendor?.kycStatus === "APPROVED"
            ? "Verified"
            : "Pending Verification"}
        </div>
      </div>
    </div>
  );
}
