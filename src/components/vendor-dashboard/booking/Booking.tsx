/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useCancelBookingMutation,
  useGetBookingsQuery,
  useGetDashboardStartsQuery,
  useMarkBookingAsCompletedMutation,
  useRescheduleBookingMutation,
} from "../../../features/booking/bookingApi";
import { formatDate } from "../../utils/dateFormatter";
import Pagination from "../../utils/pagination";
import SelectLimit from "../../utils/selectLimit";
import { formatTimeFromISO } from "../../utils/timeFormatter";
import Loader from "../../ui/Loader";
import { useSelector } from "react-redux";
import { useGetTransactionAmountByVendorQuery } from "../../../features/transactions/transactionAPI";
import { SearchIcon } from "lucide-react";
import { LinkActions } from "../../ui/LinkActions";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import ViewBookingModal from "./BookingViewModal";
import { StatCard } from "../dashboard/StatCard";

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const DEFAULT_ITEMS_PER_PAGE = 10;

const statusOptions = [
  { label: "All", value: "ALL", style: "bg-blue-50 text-blue-700" },
  { label: "Upcoming", value: "PENDING", style: "bg-amber-100 text-amber-700" },
  {
    label: "Confirmed",
    value: "CONFIRMED",
    style: "bg-green-100 text-green-700",
  },
  {
    label: "Completed",
    value: "COMPLETED",
    style: "bg-gray-100 text-gray-600",
  },
  { label: "Cancelled", value: "CANCELLED", style: "bg-red-100 text-red-700" },
];

export function Bookings() {
  const vendor = useSelector(
    (state: { vendor: { vendor: { id: string } } }) => state.vendor.vendor,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [statusFilter, setStatusFilter] = useState("ALL");
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
  const { data: getTransactionsHistoryByVendor } =
    useGetTransactionAmountByVendorQuery(vendor?.id, {
      skip: !vendor?.id,
    });
  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();
  const [rescheduleBooking, { isLoading: rescheduleLoading }] =
    useRescheduleBookingMutation();
  const [markBookingAsCompleted, { isLoading: markingLoading }] =
    useMarkBookingAsCompletedMutation();

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

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(searchFilter.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilter]);

  if (getBookingsDataLoading) {
    return <Loader />;
  }

  return (
    <div className="py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Bookings</h1>
          <p className="text-sm text-gray-500">
            Track upcoming and past appointments.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-[10px] border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Export
          </button>
          <button className="rounded-[10px] bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800">
            New Booking
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-6">
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
          title="This Month Revenue"
          value={`₦ ${getTransactionsHistoryByVendor?.data?.total?.toLocaleString() || "0"}`}
          isLoadingStats={dashboardStatsLoading}
        />
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm mt-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`rounded-full px-4 py-1 text-sm font-medium tracking-tight ${option.style} ${
                  statusFilter === option.value ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setStatusFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <input
              placeholder="Search bookings"
              className="w-full rounded-[10px] border border-gray-200 px-3 py-2 text-sm md:w-64"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <SearchIcon
              size={30}
              className="border border-gray-200 p-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 overflow-visible">
          {getBookingsDataLoading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-[700px] text-left">
              <thead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
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
              <tbody className="text-sm text-gray-700">
                {getBookingsData?.data?.map((b: any) => (
                  <tr className="border-b last:border-b-0 relative">
                    <td className="px-3 py-4 font-medium text-gray-900">
                      {b.clientName || "Client Name"}
                    </td>
                    <td className="px-3 py-4 text-gray-600">
                      {b.services?.name}
                    </td>
                    <td className="px-3 py-4 text-gray-600">
                      {formatDate(b.date, "DD/MM/YYYY")}
                    </td>
                    <td className="px-3 py-4 text-gray-600">
                      {formatTimeFromISO(b.startTime as string)}
                    </td>
                    <td className="px-3 py-4 font-semibold text-gray-900 tracking-tight">
                      N {Number(b.services?.price)?.toLocaleString()}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          statusStyles[b.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {b.status}
                      </span>
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
      />
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Cancel Booking"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setCancelOpen(false)}
            >
              Keep Booking
            </button>
            <button
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              onClick={handleCancel}
              disabled={cancelLoading}
            >
              {cancelLoading ? "Cancelling..." : "Cancel Booking"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={openMark}
        onClose={() => setOpenMark(false)}
        title="Mark Booking as Complete"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to mark this booking as completed? This action
            cannot be undone.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setOpenMark(false)}
            >
              No I am not
            </button>
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={handleMarkAsCompleted}
              disabled={markingLoading}
            >
              {markingLoading ? "Marking..." : "Mark Booking"}
            </button>
          </div>
        </div>
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
