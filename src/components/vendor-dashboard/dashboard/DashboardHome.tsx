/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { CalendarSyncStatus } from "../CalenderSyncStatus";
import { EarningsChart } from "../EarningsChart";
import { StatCard } from "./StatCard";
import { useGetVendorProfileByIdQuery } from "../../../features/vendor/vendorApi";
import {
  useGetBusinessInsightQuery,
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
import {
  BriefcaseBusiness,
  Calendar,
  CalendarCheck,
  Camera,
  ChevronRight,
  ClipboardList,
  Eye,
  GraduationCap,
  HeartHandshake,
  Paintbrush,
  Repeat,
  Sparkles,
  TrendingUp,
  UserRound,
  Wallet,
} from "lucide-react";
import { TodaySchedule } from "./TodaySchedule";
import { formatDate } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  slug: string;
}

export const lightPurple = "#C271AC";
export const darkPurple = "#77467D";

const serviceIcons = [
  HeartHandshake,
  Camera,
  Sparkles,
  Paintbrush,
  GraduationCap,
];
const serviceColors = [
  "bg-pink-100 text-pink-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
  "bg-green-100 text-green-600",
];

const insightColors = {
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  pink: "bg-pink-100 text-pink-600",
};

function DashboardHome() {
  const navigate = useNavigate();
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
  const { data: businessInsightData } = useGetBusinessInsightQuery({});
  console.log({ businessInsightData });

  const insightCards = [
    {
      label: "Best Day",
      value: businessInsightData?.data?.bestDay?.day || "None",
      detail: `${businessInsightData?.data?.bestDay?.percentage}% of bookings`,
      icon: TrendingUp,
      color: "purple",
    },
    {
      label: "Average Booking",
      value: `₦${Number(businessInsightData?.data?.averageBooking).toLocaleString()}`,
      detail: "Per booking",
      icon: Wallet,
      color: "green",
    },
    {
      label: "Repeat Clients",
      value: businessInsightData?.data?.repeatClients,
      detail: "Returning clients",
      icon: Repeat,
      color: "pink",
    },
  ] as const;

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

  const handleCreateBooking = async (data: any) => {
    console.log(data);
  };

  const totalEarnings =
    Number(dashboardStats?.data?.earnings?.total / 100)?.toLocaleString() ||
    0;
  const topServices = servicesCountsData?.data || [];
  const recentBooking = upcomingBookingsData?.data?.[0];

  useEffect(() => {
    dispatch(setVendorCredentials({ vendor: vendorData?.data?.vendor }));
    dispatch(
      setTransactions({
        transactions: dashboardStats?.data?.earnings?.total,
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
    <div className="py-4">
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
          value={dashboardStats?.data?.bookingCount?.total?.toString() || "0"}
          icon={<ClipboardList className="w-5 h-5" />}
          color="purple"
          change={`${dashboardStats?.data?.bookingCount?.growth}% from last month`}
        />

        <StatCard
          title="Upcoming"
          value={
            dashboardStats?.data?.upcomingBooking?.total?.toString() || "0"
          }
          icon={<CalendarCheck className="w-5 h-5" />}
          color="green"
          change={`${dashboardStats?.data?.upcomingBooking?.growth} this week`}
        />

        <StatCard
          title="Earnings"
          value={`₦${totalEarnings}`}
          icon={<Wallet className="w-5 h-5" />}
          color="orange"
          change={`${dashboardStats?.data?.earnings?.growth}% from last month`}
        />

        <StatCard
          title="Profile Views"
          value={dashboardStats?.data?.views?.total?.toString() || "0"}
          icon={<Eye className="w-5 h-5" />}
          color="blue"
          change={`${dashboardStats?.data?.views?.growth}% from last month`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <CalendarSyncStatus
          data={calendarLinkedData}
          isLoading={calendarLinkedLoading}
        />

        <TodaySchedule
          upcomingBookingsData={upcomingBookingsData}
          upcomingIsLoading={upcomingIsLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 mt-6">
        <div className="xl:col-span-2">
          <EarningsChart
            transactionsAnalytics={trasactionsAnalysis}
            loadingTransactionsAnalyics={loadingTransactionsAnalyics}
            setChangeView={setChangeView}
          />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-950">
              Top Services
            </h3>
            <button
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
              onClick={() => navigate("services")}
            >
              View all
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {loadingServicesCounts ? (
              <Loader />
            ) : topServices.length === 0 ? (
              <div className="rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                No service bookings yet.
              </div>
            ) : (
              topServices.slice(0, 5).map((service: any, index: number) => {
                const Icon = serviceIcons[index] || BriefcaseBusiness;

                return (
                  <div
                    key={service.serviceName || index}
                    className="flex items-center justify-between rounded-xl bg-gray-50/80 px-3 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          serviceColors[index] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="truncate text-sm font-medium text-gray-900">
                        {service.serviceName || "Service"}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-gray-500">
                      {service.count || 0} bookings
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5 mt-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-3">
          <h3 className="text-lg font-semibold text-gray-950">
            Business Insights
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {insightCards.map((insight) => {
              const Icon = insight.icon;

              return (
                <div key={insight.label} className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      insightColors[insight.color]
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-gray-500">{insight.label}</p>
                    <p className="text-lg font-semibold text-gray-950">
                      {insight.value}
                    </p>
                    <p className="text-xs font-medium text-purple-600">
                      {insight.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-950">
              Recent Bookings
            </h3>
            <button
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
              onClick={() => navigate("bookings")}
            >
              View all
            </button>
          </div>

          <div className="mt-4">
            {upcomingIsLoading ? (
              <Loader />
            ) : recentBooking ? (
              <div className="flex items-center justify-between gap-4 rounded-xl bg-gray-50/80 px-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  {recentBooking.clientImage ? (
                    <img
                      src={recentBooking.clientImage}
                      alt={recentBooking.clientName || "Client"}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <UserRound className="h-5 w-5" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-950">
                      {recentBooking.clientName || "Client"}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {recentBooking.services?.name || "Service"}
                    </p>
                  </div>
                </div>

                <div className="hidden min-w-[130px] items-center gap-2 text-sm text-gray-500 sm:flex">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(
                      recentBooking.date || recentBooking.startTime,
                      "DD/MM/YYYY",
                    ) || "Today"}
                  </span>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {recentBooking.status || "Confirmed"}
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
              </div>
            ) : (
              <div className="rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                No recent bookings yet.
              </div>
            )}
          </div>
        </div>
      </div>

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
