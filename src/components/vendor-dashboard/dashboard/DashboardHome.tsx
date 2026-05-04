/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { CalendarSyncStatus } from "../CalenderSyncStatus";
import { EarningsChart } from "../EarningsChart";
import { StatCard } from "./StatCard";
import { useGetVendorProfileByIdQuery } from "../../../features/vendor/vendorApi";
import {
  // useCreateBookingMutation,
  useGetDashboardStartsQuery,
  useGetServicesCountsQuery,
  useGetUpcomingBookingsQuery,
} from "../../../features/booking/bookingApi";
import { useEffect, useState } from "react";
import { setVendorCredentials } from "../../../features/vendor/vendorSlice";
import Modal from "../../ui/Modal";
import Loader from "../../ui/Loader";
import { useGetCalendarLinkedQuery } from "../../../features/calendar/calendarAPI";
import { formatTimeFromISO } from "../../utils/timeFormatter";
import {
  useGetTransactionAmountByVendorQuery,
  useGetTransactionAnalyticsQuery,
  useGetTransactionHistoryByVendorQuery,
} from "../../../features/transactions/transactionAPI";
import { setTransactions } from "../../../features/transactions/transactionSlice";
import { setTransactionsList } from "../../../features/transactions/transactionsSlice";
import ServiceForm from "../ServiceCreationForm";
import BookingForm from "../BookingCreationForm";
import toast from "react-hot-toast";
import { useCreateServiceMutation } from "../../../features/services/servicesAPI";
import DashboardHeader from "./DashboardHeader";
import { CalendarCheck, ClipboardList, Eye, Wallet } from "lucide-react";
import { TodaySchedule } from "./TodaySchedule";

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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [changeView, setChangeView] = useState("year");
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
  const { data: getTransactionsHistoryByVendor } =
    useGetTransactionAmountByVendorQuery(vendorData?.data?.vendor?.id, {
      skip: !vendorData?.data?.vendor?.id,
    });
  const { data: trasactionsAnalysis, isLoading: loadingTransactionsAnalyics } =
    useGetTransactionAnalyticsQuery(
      {
        vendorId: vendorData?.data?.vendor?.id,
        view: changeView,
      },
      {
        skip: !vendorData?.data?.vendor?.id,
      },
    );
  const { data: transationsList } = useGetTransactionHistoryByVendorQuery(
    vendorData?.data?.vendor?.id,
    {
      skip: !vendorData?.data?.vendor?.id,
    },
  );

  const [createService, { isLoading: createServiceIsLoading }] =
    useCreateServiceMutation();

  const handleCreateService = async (data: any) => {
    try {
      const response = await createService({
        services: [
          {
            category: data.category,
            description: data.description,
            durationMins: Number(data.durationMins),
            name: data.name,
          },
        ],
      }).unwrap();

      if (response.status === 201) {
        toast.success("Service created.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateBooking = async (data: any) => {};

  useEffect(() => {
    dispatch(setVendorCredentials({ vendor: vendorData?.data?.vendor }));
    dispatch(
      setTransactions({
        transactions: getTransactionsHistoryByVendor?.data?.total,
      }),
    );
    dispatch(
      setTransactionsList({
        transactionsList: transationsList?.data?.transactions || [],
      }),
    );
  }, [
    vendorData,
    getTransactionsHistoryByVendor,
    dashboardStats,
    transationsList,
    dispatch,
  ]);

  if (
    vendorByUserIdLoading ||
    dashboardStatsLoading ||
    loadingTransactionsAnalyics
  ) {
    return <Loader />;
  }
  return (
    <div className="py-6">
      <div>
        <DashboardHeader
          setServiceOpen={setServiceOpen}
          setBookingOpen={setBookingOpen}
          vendorData={vendorData}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-6">
        <StatCard
          title="Total Bookings"
          value={dashboardStats?.data?.bookingCount?.toString() || "0"}
          icon={<ClipboardList className="w-5 h-5" />}
          color="purple"
          change="12% from last month"
        />

        <StatCard
          title="Upcoming"
          value={dashboardStats?.data?.upcomingBooking?.toString() || "0"}
          icon={<CalendarCheck className="w-5 h-5" />}
          color="green"
          change="3 this week"
        />

        <StatCard
          title="Earnings"
          value={`₦ ${getTransactionsHistoryByVendor?.data?.total?.toLocaleString() || "0"}`}
          icon={<Wallet className="w-5 h-5" />}
          color="orange"
          change="18% from last month"
        />

        <StatCard
          title="Profile Views"
          value={dashboardStats?.data?.profileViews?.toString() || "0"}
          icon={<Eye className="w-5 h-5" />}
          color="blue"
          change="8% from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <CalendarSyncStatus
          data={calendarLinkedData}
          isLoading={calendarLinkedLoading}
        />

        <TodaySchedule
          upcomingBookingsData={upcomingBookingsData}
          upcomingIsLoading={upcomingIsLoading}
        />
      </div>

      {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <CalendarSyncStatus
            data={calendarLinkedData}
            isLoading={calendarLinkedLoading}
          />
          <EarningsChart
            transactionsAnalytics={trasactionsAnalysis}
            loadingTransactionsAnalyics={loadingTransactionsAnalyics}
            setChangeView={setChangeView}
          />
        </div>

        <div className="flex flex-col gap-6 ">
          <div className="rounded-2xl bg-white p-5 shadow-sm mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Today&apos;s Schedule</h3>
              <span className="text-sm text-gray-400">
                {upcomingBookingsData?.data?.length || 0} bookings
              </span>
            </div>
            <div className="mt-4 space-y-3 ">
              {upcomingIsLoading ? (
                <Loader />
              ) : (
                upcomingBookingsData?.data?.map(
                  (item: {
                    id: string;
                    clientName: string;
                    services: { name: string };
                    startTime: string;
                  }) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
                    >
                      <div>
                        <p className="text-md font-semibold text-gray-900">
                          {item.clientName ?? "Client Name"}
                        </p>
                        <p className="text-md text-gray-500">
                          {item.services?.name || "Service Name"}
                        </p>
                      </div>
                      <span className="text-md font-medium text-gray-700">
                        {formatTimeFromISO(item.startTime as string)}
                      </span>
                    </div>
                  ),
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Top Services</h3>
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
                    <span className="text-sm font-semibold text-gray-600">
                      {service.count} bookings
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div> */}

      <Modal
        open={serviceOpen}
        onClose={() => setServiceOpen(false)}
        title="Add Service"
      >
        <ServiceForm
          setServiceOpen={setServiceOpen}
          handleCreateService={handleCreateService}
          createServiceIsLoading={createServiceIsLoading}
        />
      </Modal>

      <Modal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title="Create Booking"
      >
        <BookingForm
          setBookingOpen={setBookingOpen}
          handleCreateBooking={handleCreateBooking}
        />
      </Modal>
    </div>
  );
}

export default DashboardHome;
