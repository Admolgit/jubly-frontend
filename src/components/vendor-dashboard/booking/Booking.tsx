/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useCancelBookingMutation,
  useGetBookingsQuery,
  useGetDashboardStartsQuery,
  useGetStatusFilterCountQuery,
  useMarkBookingAsCompletedMutation,
  useRescheduleBookingMutation,
} from "../../../features/booking/bookingApi";
import { formatDate } from "../../utils/dateFormatter";
import Pagination from "../../utils/pagination";
import SelectLimit from "../../utils/selectLimit";
import { formatTimeFromISO } from "../../utils/timeFormatter";
import Loader from "../../ui/Loader";
import { useSelector } from "react-redux";
// import { useGetTransactionAmountByVendorQuery } from "../../../features/transactions/transactionAPI";
import {
  CalendarCheck,
  ClipboardList,
  Wallet,
  Calendar,
  Clock,
  CheckCircle,
  CheckSquare,
  XCircle,
  CheckCircle2,
  X,
  Clock3,
} from "lucide-react";
import { LinkActions } from "../../ui/LinkActions";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import ViewBookingModal from "./BookingViewModal";
import { StatCard } from "../dashboard/StatCard";
import BookingSearch from "./BookingSearch";
import BookingForm from "../BookingCreationForm";
import { useExportBookingsCSVMutation } from "../../../features/vendor/vendorApi";
import Dialog from "../../ui/Dialog";

type BookingStatus =
  | "ALL"
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

const statusStyles: any = {
  ALL: {
    pill: "",
    dot: "",
  },
  COMPLETED: {
    pill: "bg-grey-100 text-grey-700",
    dot: "bg-grey-500",
  },
  CONFIRMED: {
    wrapper: "bg-green-100 text-green-700",
    icon: "fill-green-600 text-white",
  },
  PENDING: {
    wrapper: "bg-orange-100 text-orange-600",
    icon: "text-orange-500",
  },
  CANCELLED: {
    pill: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
};

const DEFAULT_ITEMS_PER_PAGE = 10;

const statusConfig: Record<
  BookingStatus,
  { icon: JSX.Element; active: string }
> = {
  ALL: {
    icon: <Calendar size={16} />,
    active: "bg-blue-50 text-blue-600 border-blue-200",
  },
  PENDING: {
    icon: <Clock size={16} />,
    active: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
  CONFIRMED: {
    icon: <CheckCircle size={16} />,
    active: "bg-green-50 text-green-600 border-green-200",
  },
  COMPLETED: {
    icon: <CheckSquare size={16} />,
    active: "bg-gray-50 text-gray-700 border-gray-200",
  },
  CANCELLED: {
    icon: <XCircle size={16} />,
    active: "bg-red-50 text-red-600 border-red-200",
  },
};

export function Bookings() {
  const vendor = useSelector(
    (state: { vendor: { vendor: { id: string; businessName: string } } }) =>
      state.vendor.vendor,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [openMark, setOpenMark] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleStartTime, setRescheduleStartTime] = useState("");
  const [rescheduleEndTime, setRescheduleEndTime] = useState("");
  const [viewVendorOpen, setViewVendorOpen] = useState(false);
  const [selectedView, setSelectedView] = useState(null);

  const { data: getBookingsData, isLoading: getBookingsDataLoading } =
    useGetBookingsQuery({
      page: currentPage,
      limit: itemsPerPage,
      status: statusFilter === "ALL" ? "" : statusFilter?.toUpperCase(),
      dateFilter: undefined,
      search: searchValue || undefined,
      date: undefined,
    });
  const { data: dashboardStats, isLoading: dashboardStatsLoading } =
    useGetDashboardStartsQuery(vendor?.id, {
      skip: !vendor?.id,
    });
  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();
  const [rescheduleBooking, { isLoading: rescheduleLoading }] =
    useRescheduleBookingMutation();
  const [markBookingAsCompleted, { isLoading: markingLoading }] =
    useMarkBookingAsCompletedMutation();
  const { data: statusFilterData } = useGetStatusFilterCountQuery({});

  const statusOptions = [
    {
      label: "All",
      value: "ALL",
      style: "bg-blue-50 text-blue-700",
      count: statusFilterData?.data?.all,
    },
    {
      label: "Upcoming",
      value: "PENDING",
      style: "bg-amber-100 text-amber-700",
      count: statusFilterData?.data?.pending,
    },
    {
      label: "Confirmed",
      value: "CONFIRMED",
      style: "bg-green-100 text-green-700",
      count: statusFilterData?.data?.confirmed,
    },
    {
      label: "Completed",
      value: "COMPLETED",
      style: "bg-gray-100 text-gray-600",
      count: statusFilterData?.data?.completed,
    },
    {
      label: "Cancelled",
      value: "CANCELLED",
      style: "bg-red-100 text-red-700",
      count: statusFilterData?.data?.cancelled,
    },
  ];

  const totalPages = Math.ceil(getBookingsData?.meta?.total / itemsPerPage);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const openCancel = (booking: any) => {
    setSelectedBooking(booking);
    setCancelOpen(true);
  };

  const onMarking = (booking: any) => {
    setSelectedBooking(booking);
    setOpenMark(true);
  };

  const openReschedule = (booking: any) => {
    setSelectedBooking(booking);
    setRescheduleDate(booking?.date ? booking.date.split("T")[0] : "");

    if (booking?.startTime) {
      const start = new Date(booking.startTime);
      setRescheduleStartTime(start.toISOString().slice(11, 16));
    } else {
      setRescheduleStartTime("");
    }

    if (booking?.endTime) {
      const end = new Date(booking.endTime);
      setRescheduleEndTime(end.toISOString().slice(11, 16));
    } else {
      setRescheduleEndTime("");
    }

    setRescheduleOpen(true);
  };

  const handleCancel = async () => {
    if (!selectedBooking?.id) return;

    try {
      await cancelBooking(selectedBooking.id).unwrap();
      toast.success("Booking cancelled successfully");
      setCancelOpen(false);
      setSelectedBooking(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel booking");
    }
  };

  const handleReschedule = async () => {
    if (!selectedBooking?.id) return;
    if (!rescheduleDate || !rescheduleStartTime) {
      toast.error("Please select a date and start time");
      return;
    }

    try {
      await rescheduleBooking({
        bookingId: selectedBooking.id,
        date: rescheduleDate,
        startTime: rescheduleStartTime,
        endTime: rescheduleEndTime || undefined,
      }).unwrap();
      toast.success("Booking rescheduled successfully");
      setRescheduleOpen(false);
      setSelectedBooking(null);
    } catch (error: any) {
      toast.error(error?.message || "Failed to reschedule booking");
    }
  };

  const handleMarkAsCompleted = async () => {
    if (!selectedBooking?.id) return;

    try {
      await markBookingAsCompleted(selectedBooking.id).unwrap();
      toast.success("Booking mark as completed successfully");
      setOpenMark(false);
      setSelectedBooking(null);
    } catch (error: any) {
      toast.error(error?.message || "Failed to cancel booking");
    }
  };

  const handleCreateBooking = async (data: any) => {
    console.log(data);
  };

  const [exportBookingsCSV, { isLoading: exporting }] =
    useExportBookingsCSVMutation({});

  const handleExportCSV = async () => {
    try {
      const blob = await exportBookingsCSV({}).unwrap();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = `${vendor?.businessName
        ?.toLowerCase()
        .replace(/\s+/g, "-")}-bookings-${Date.now()}.csv`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

      toast.success("CSV exported successfully");
    } catch (error: any) {
      console.error("Export CSV error:", error);
      toast.error("Failed to export CSV");
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(searchFilter.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilter]);

  if (getBookingsDataLoading || dashboardStatsLoading) {
    return <Loader />;
  }

  return (
    <div className="py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <p className="text-sm text-gray-500">
            Track upcoming and past appointments.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50"
          >
            Export
          </button>
          <button
            onClick={() => setBookingOpen(true)}
            className="rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            {exporting ? "Exporting..." : "+ New Booking"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-6">
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
          title="This Month Revenue"
          value={`₦${Number(dashboardStats?.data?.earnings?.total)?.toLocaleString()}`}
          isLoadingStats={dashboardStatsLoading}
          icon={<Wallet className="w-5 h-5" />}
          color="orange"
          change={`${dashboardStats?.data?.earnings?.growth}% from last month`}
        />
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm mt-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((option) => {
              const isActive = statusFilter === option.value;
              const config = statusConfig[option.value as BookingStatus];

              return (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition 
                    ${isActive ? config.active + " shadow-sm" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}
                  `}
                >
                  <span className="opacity-90">{config.icon}</span>
                  <span>{option.label}</span>
                  <span
                    className={`
                      ml-1 rounded-full px-2 py-0.5 text-xs font-semibold
                      ${isActive ? "bg-white/70" : "bg-gray-100 text-gray-600"}
                    `}
                  >
                    {option.count ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
          <BookingSearch
            value={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        </div>

        <div className="mt-4 w-full">
          <div className="overflow-x-auto scrollbar-thin">
            {getBookingsDataLoading ? (
              <Loader />
            ) : (
              <table className="w-full min-w-[700px] text-left rounded-xl border border-gray-200 text-sm">
                <thead className="text-md bg-gray-50 text-gray-500 uppercase tracking-wider">
                  <tr className="border-b">
                    <th className="px-3 py-3">Client</th>
                    <th className="px-3 py-3">Service</th>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Time</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="text-md text-gray-700 relative">
                  {getBookingsData?.data?.map((b: any) => (
                    <tr className="border-b last:border-b-0 relative">
                      <td className="px-3 py-4 font-semibold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-medium">
                          AS
                        </div>
                        {b.clientName || "Client Name"}
                      </td>
                      <td className="px-3 py-4 text-gray-600 font-semibold">
                        {b.services?.name}
                      </td>
                      <td className="px-3 py-4 text-gray-600 font-semibold">
                        {formatDate(b.date, "DD/MM/YYYY")}
                      </td>
                      <td className="px-3 py-4 text-gray-600 font-semibold">
                        {formatTimeFromISO(b.startTime as string)}
                      </td>
                      <td className="px-3 py-4 font-semibold text-gray-900 tracking-tight">
                        N {Number(b.services?.price)?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                            statusStyles[b.status].wrapper
                          }`}
                        >
                          {b.status === "COMPLETED" && (
                            <CheckSquare
                              size={14}
                              className={statusStyles[b.status].icon}
                            />
                          )}

                          {b.status === "CONFIRMED" && (
                            <CheckCircle2
                              size={14}
                              className={statusStyles[b.status].icon}
                            />
                          )}

                          {b.status === "PENDING" && (
                            <Clock3
                              size={14}
                              className={statusStyles[b.status].icon}
                            />
                          )}

                          {b.status === "FAILED" && (
                            <X
                              size={14}
                              className={statusStyles[b.status].icon}
                            />
                          )}

                          {b.status}
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <LinkActions
                          link={b}
                          onReschedule={openReschedule}
                          setViewVendorOpen={setViewVendorOpen}
                          onCancle={openCancel}
                          onMarking={onMarking}
                          setSelectedView={setSelectedView}
                          setOpenMark={setOpenMark}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {getBookingsData?.data?.length > 0 && (
          <div className="mt-4 flex items-center text-sm align-center justify-between">
            <SelectLimit
              ITEMS_OPTIONS={[5, 10, 20, 50]}
              itemsPerPage={itemsPerPage}
              handleItemsChange={handleItemsChange}
              text="Bookings"
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
      <ViewBookingModal
        open={viewVendorOpen}
        onClose={() => setViewVendorOpen(false)}
        booking={selectedView}
        setCancelOpen={setCancelOpen}
        setOpenMark={setOpenMark}
        setRescheduleOpen={setRescheduleOpen}
      />
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
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Cancel Booking"
      >
        <Dialog
          setCancelOpen={setCancelOpen}
          cancelLoading={cancelLoading}
          handleCancel={handleCancel}
          headerText="Are you sure you want to cancel this booking? This action cannot be
            undone."
          btnCancelText="No, keep it"
          btnKeepText="Yes, cancel"
        />
      </Modal>
      <Modal
        open={openMark}
        onClose={() => setOpenMark(false)}
        title="Mark Booking as Complete"
      >
        <Dialog
          setCancelOpen={setOpenMark}
          cancelLoading={markingLoading}
          handleCancel={handleMarkAsCompleted}
          headerText="Are you sure you want to mark this booking as completed? This action
            cannot be undone."
          btnCancelText="No, keep it"
          btnKeepText="Yes, mark as completed"
        />
      </Modal>
      <Modal
        open={rescheduleOpen}
        onClose={() => setRescheduleOpen(false)}
        title="Reschedule Booking"
      >
        <div className="space-y-4">
          <Input
            label="New Date"
            type="date"
            value={rescheduleDate}
            onChange={(e) => setRescheduleDate(e.target.value)}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Start Time"
              type="time"
              value={rescheduleStartTime}
              onChange={(e) => setRescheduleStartTime(e.target.value)}
            />
            <Input
              label="End Time (optional)"
              type="time"
              value={rescheduleEndTime}
              onChange={(e) => setRescheduleEndTime(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setRescheduleOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`${!rescheduleDate && !rescheduleStartTime ? "bg-grey" : "bg-blue-700"} rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800`}
              onClick={handleReschedule}
              disabled={!rescheduleDate && !rescheduleStartTime}
            >
              {rescheduleLoading ? "Rescheduling..." : "Confirm Reschedule"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
