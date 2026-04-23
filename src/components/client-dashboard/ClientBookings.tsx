/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCancelBookingMutation,
  useGetClientsBookingsQuery,
  useGetClientsBookingStatsQuery,
  useMarkBookingAsCompletedMutation,
  useRescheduleBookingMutation,
} from "../../features/booking/bookingApi";
import { formatDate } from "../utils/dateFormatter";
import { formatTimeFromISO } from "../utils/timeFormatter";
import Pagination from "../utils/pagination";
import SelectLimit from "../utils/selectLimit";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { useSelector } from "react-redux";
import { LinkActions } from "../ui/LinkActions";
import ViewModal from "../ui/viewModal";
import BookingFilters from "../utils/BookingFilters";

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-600",
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

export function ClientBookings() {
  const navigate = useNavigate();
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
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
    useGetClientsBookingsQuery({
      email: user?.email,
      page: currentPage,
      limit: itemsPerPage,
      status: statusFilter === "ALL" ? "" : statusFilter,
      dateFilter: undefined,
      search: searchValue || undefined,
      date: undefined,
    });

  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();
  const [rescheduleBooking, { isLoading: rescheduleLoading }] =
    useRescheduleBookingMutation();
  const [markBookingAsCompleted, { isLoading: markingLoading }] =
    useMarkBookingAsCompletedMutation();
  const { data: bookingStats, isLoading: bookingStatsIsLoading } =
    useGetClientsBookingStatsQuery({})

  const totalPages = Math.ceil(
    (getBookingsData?.meta?.total || 0) / itemsPerPage,
  );

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchValue(searchFilter.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilter]);

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

  const bookingRows = useMemo(
    () => getBookingsData?.data || [],
    [getBookingsData],
  );

  if (bookingStatsIsLoading || getBookingsDataLoading) {
    return <Loader />
  }
    return (
      <div className="py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Your Bookings</h1>
            <p className="text-sm text-gray-500">
              Manage your appointments, track vendor status, and schedule new
              beauty sessions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="bg-blue-700 px-4 rounded-[10px] py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
              onClick={() => navigate("/booking")}
            >
              + Book a Service
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pb-6">
          <div className="p-4 border bg-white rounded-xl">
            <p className="text-sm text-[#7F55E0]">Total Spent</p>
            <h2 className="text-xl font-bold">
              {`₦ ${bookingStats?.data?.total?.toLocaleString() || "0"}`}
            </h2>
          </div>
          <div className="p-4 border bg-white rounded-xl">
            <p className="text-sm text-[#E86992]">Active Sessions</p>
            <h2 className="text-xl font-bold">
              {bookingStats?.data?.activeBooking ?? "0"} Bookings
            </h2>
          </div>
          <div className="p-4 border bg-white rounded-xl">
            <p className="text-sm text-[#45D4BE]">Loyalty Points</p>
            <h2 className="text-xl font-bold">1,450 pts</h2>
          </div>
        </div>

        <div className="rounded-2xl p-4 shadow-sm">
          <BookingFilters
            statusFilter={statusFilter}
            statusOptions={statusOptions}
            setStatusFilter={setStatusFilter}
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          />

          <div className="mt-4 z-10 overflow-x-auto">
            {getBookingsDataLoading ? (
              <Loader />
            ) : (
              <table className="w-full min-w-[900px] text-left bg-white">
                <thead className="text-xs uppercase text-gray-400">
                  <tr className="border-b">
                    <th className="px-3 py-3">Vendor</th>
                    <th className="px-3 py-3">Service</th>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Time</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bookingRows.map((b: any) => (
                    <tr key={b.id} className="border-b last:border-b-0">
                      <td className="px-3 py-4 font-medium text-gray-900">
                        {b.vendor?.businessName || b.vendorName || "Vendor"}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {b.services?.name || "Service"}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {formatDate(b.date, "DD/MM/YYYY")}
                      </td>
                      <td className="px-3 py-4 text-gray-600">
                        {formatTimeFromISO(b.startTime as string)}
                      </td>
                      <td className="px-3 py-4 font-semibold text-gray-900">
                        ₦{" "}
                        {Number(
                          b.services?.price || b.amount || 0,
                        ).toLocaleString()}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={
                            "rounded-full px-3 py-1 text-xs font-semibold " +
                            (statusStyles[b.status] ||
                              "bg-gray-100 text-gray-600")
                          }
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
          {bookingRows.length > 0 && (
            <div className="mt-4 bg-[#F8F8FE] flex items-center align-center justify-between">
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

        <ViewModal
          setViewVendorOpen={setViewVendorOpen}
          viewVendorOpen={viewVendorOpen}
          booking={selectedView}
        />

        <Modal
          open={cancelOpen}
          onClose={() => setCancelOpen(false)}
          title="Cancel Booking"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
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
              Are you sure you want to mark this booking as completed? This
              action cannot be undone.
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
