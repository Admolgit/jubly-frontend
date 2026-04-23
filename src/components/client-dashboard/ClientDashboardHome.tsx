/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { StatCard } from "../vendor-dashboard/StatCard";
import Loader from "../ui/Loader";
import { formatDate } from "../utils/dateFormatter";
import { formatTimeFromISO } from "../utils/timeFormatter";
import { useGetClientsBookingsQuery } from "../../features/booking/bookingApi";
import { useSelector } from "react-redux";

export function ClientDashboardHome() {
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const { data: bookingsData, isLoading } = useGetClientsBookingsQuery(
    {
      email: user?.email,
      page: 1,
      limit: 50,
      status: "",
      dateFilter: undefined,
      search: undefined,
      date: undefined,
    },
    {
      skip: !user?.email,
    },
  );

  const bookings = bookingsData?.data || [];

  const stats = useMemo(() => {
    const total = bookingsData?.meta?.total || bookings.length || 0;
    const upcoming = bookings.filter(
      (b: any) => b.status === "PENDING" || b.status === "CONFIRMED",
    );
    const vendorIds = new Set(
      bookings
        .map((b: any) => b.vendor?.id || b.vendorId || b.vendor?.userId)
        .filter(Boolean),
    );

    return {
      total,
      upcoming: upcoming.length,
      vendors: vendorIds.size,
      upcomingList: upcoming.slice(0, 4),
    };
  }, [bookings, bookingsData?.meta?.total]);

  return (
    <div className="py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Client Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage bookings, explore vendors, and stay on schedule.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/client-dashboard/vendors"
            className="rounded-[10px] border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Find Vendors
          </Link>
          <Link
            to="/booking"
            className="rounded-[10px] bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
          >
            + Book a Service
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <StatCard
          title="Total Bookings"
          value={stats.total.toString()}
          isLoadingStats={isLoading}
        />
        <StatCard
          title="Upcoming Bookings"
          value={stats.upcoming.toString()}
          isLoadingStats={isLoading}
        />
        <StatCard
          title="Vendors Booked"
          value={stats.vendors.toString()}
          isLoadingStats={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Upcoming Bookings</h3>
            <Link
              to="/client-dashboard/bookings"
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {isLoading ? (
              <Loader />
            ) : stats.upcomingList.length === 0 ? (
              <p className="text-sm text-gray-500">No upcoming bookings yet.</p>
            ) : (
              stats.upcomingList.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.services?.name || "Service"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(item.vendor?.businessName ||
                        item.vendorName ||
                        "Vendor") +
                        " • " +
                        formatDate(item.date, "DD/MM/YYYY")}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {formatTimeFromISO(item.startTime as string)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Quick Actions</h3>
          <div className="mt-4 grid gap-3">
            <Link
              to="/client-dashboard/calendar"
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View Booking Calendar
            </Link>
            <Link
              to="/client-dashboard/bookings"
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Manage Bookings
            </Link>
            <Link
              to="/client-dashboard/vendors"
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Search Vendors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
