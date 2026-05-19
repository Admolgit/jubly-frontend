/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { StatCard } from "../vendor-dashboard/dashboard/StatCard";
import Loader from "../ui/Loader";
import { formatDate } from "../utils/dateFormatter";
import { formatTimeFromISO } from "../utils/timeFormatter";
import { useGetClientsBookingsQuery } from "../../features/booking/bookingApi";
import { useSelector } from "react-redux";
import { Bell, CalendarCheck, ClipboardList, Wallet } from "lucide-react";

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
    <div className="py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage bookings, explore vendors, and stay on schedule.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="relative rounded-full p-2.5 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-900" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-600" />
          </button>
          <Link
            to="/client-dashboard/vendors"
            className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50"
          >
            Find Vendors
          </Link>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            + Book a Service
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <StatCard
          title="Total Bookings"
          value={stats.total.toString()}
          icon={<ClipboardList className="w-5 h-5" />}
          color="purple"
          // change={`${stats?.data?.bookingCount?.growth}% from last month`}
        />
        <StatCard
          title="Upcoming"
          value={stats.upcoming.toString()}
          icon={<CalendarCheck className="w-5 h-5" />}
          color="green"
          // change={`${dashboardStats?.data?.upcomingBooking?.growth} this week`}
        />
        <StatCard
          title="Vendors Booked"
          value={stats.vendors.toString()}
          icon={<Wallet className="w-5 h-5" />}
          color="orange"
          // change={`${dashboardStats?.data?.earnings?.growth}% from last month`}
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
