/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { CalendarSyncStatus } from "./CalenderSyncStatus";
import { EarningsChart } from "./EarningsChart";
import { StatCard } from "./StatCard";
import { useGetVendorProfileByIdQuery } from "../../features/vendor/vendorApi";
import {
  useGetDashboardStartsQuery,
  useGetServicesCountsQuery,
  useGetUpcomingBookingsQuery,
} from "../../features/booking/bookingApi";
import { useEffect, useState } from "react";
import { setVendorCredentials } from "../../features/vendor/vendorSlice";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Loader from "../ui/Loader";
import { useGetCalendarLinkedQuery } from "../../features/calendar/calendarAPI";
import { formatTimeFromISO } from "../utils/timeFormatter";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  slug: string;
}

export const lightPurple = "#C271AC";
export const darkPurple = "#77467D";
function DashboardHome() {
  const dispatch = useDispatch();
  const { data: vendorData, isLoading: vendorByUserIdLoading } =
    useGetVendorProfileByIdQuery({});
  const { data: dashboardStats, isLoading: dashboardStatsLoading } =
    useGetDashboardStartsQuery(vendorData?.data?.vendor?.id, {
      skip: !vendorData?.data?.vendor?.id,
    });
  const { data: calendarLinkedData, isLoading: calendarLinkedLoading } =
    useGetCalendarLinkedQuery(vendorData?.data?.vendor?.userId, {
      skip: !vendorData?.data?.vendor?.userId,
    });
  const { data: upcomingBookingsData, isLoading: upcomingIsLoading } =
    useGetUpcomingBookingsQuery({});
  const { data: servicesCountsData, isLoading: loadingServicesCounts } =
    useGetServicesCountsQuery({});

  const [bookingOpen, setBookingOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  useEffect(() => {
    dispatch(setVendorCredentials({ vendor: vendorData?.data?.vendor }));
  }, [vendorData, dispatch]);

  console.log({ upcomingBookingsData });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[20px] font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Overview of your bookings, earnings, and clients.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            onClick={() => setServiceOpen(true)}
          >
            Add Service
          </button>
          <button
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
            onClick={() => setBookingOpen(true)}
          >
            Create Booking
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        {vendorByUserIdLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-[16px]">
              Welcome,{" "}
              <span className="text-[#C271AC]">
                {vendorData?.data?.vendor?.businessName || "Vendor"}
              </span>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              {vendorData?.data?.vendor?.kycStatus === "APPROVED"
                ? "Verified"
                : "Pending Verification"}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value={dashboardStats?.data?.bookingCount?.toString() || "0"}
          isLoadingStats={dashboardStatsLoading}
        />
        <StatCard
          title="Upcoming"
          value={dashboardStats?.data?.upcomingBooking?.toString() || "0"}
          isLoadingStats={dashboardStatsLoading}
        />
        <StatCard
          title="Earnings"
          value={dashboardStats?.data.earnings?.toString() || "0"}
          isLoadingStats={dashboardStatsLoading}
        />
        <StatCard
          title="Profile Views"
          value={dashboardStats?.data?.profileViews?.toString() || "0"}
          isLoadingStats={dashboardStatsLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <CalendarSyncStatus
            data={calendarLinkedData}
            isLoading={calendarLinkedLoading}
          />
          <EarningsChart />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Today&apos;s Schedule</h3>
              <span className="text-xs text-gray-400">
                {upcomingBookingsData?.data?.length || 0} bookings
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {upcomingIsLoading ? (
                <Loader />
              ) : (
                upcomingBookingsData?.data?.map(
                  (item: {
                    id: string;
                    clientName: string;
                    services: { name: string }[];
                    startTime: string;
                  }) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {item.clientName ?? "Client Name"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.services[0]?.name || "Service Name"}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {formatTimeFromISO(item.startTime as string)}
                      </span>
                    </div>
                  ),
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Top Services</h3>
            <div className="mt-4 space-y-3">
              {loadingServicesCounts ? (
                <Loader />
              ) : (
                servicesCountsData?.data?.map((service: any) => (
                  <div
                    key={service.serviceName}
                    className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {service.serviceName}
                    </p>
                    <span className="text-xs font-semibold text-gray-600">
                      {service.count} bookings
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={serviceOpen}
        onClose={() => setServiceOpen(false)}
        title="Add Service"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Service Name" placeholder="Bridal Makeup" />
            <Input label="Price" placeholder="NGN 10,000" />
            <Input label="Duration" placeholder="90 min" />
            <Input label="Category" placeholder="Makeup" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              placeholder="Describe the service"
              className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setServiceOpen(false)}
            >
              Cancel
            </button>
            <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
              Save Service
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title="Create Booking"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Client Name" placeholder="Jane Doe" />
            <Input label="Service" placeholder="Bridal Makeup" />
            <Input label="Date" placeholder="May 24, 2026" />
            <Input label="Time" placeholder="10:00 AM" />
          </div>
          <Input label="Notes" placeholder="Add extra notes" />
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setBookingOpen(false)}
            >
              Cancel
            </button>
            <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
              Save Booking
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DashboardHome;
