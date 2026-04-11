/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCancelBookingMutation,
  useGetClientsBookingsQuery,
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
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleStartTime, setRescheduleStartTime] = useState("");
  const [rescheduleEndTime, setRescheduleEndTime] = useState("");
  const [viewVendorOpen, setViewVendorOpen] = useState(false);
  const [ selectedView, setSelectedView] = useState(null);

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
      toast.error(error?.data?.message || "Failed to reschedule booking");
    }
  };

  const bookingRows = useMemo(
    () => getBookingsData?.data || [],
    [getBookingsData],
  );

  return (
    <div className="space-y-0">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Your Bookings</h1>
          <p className="text-sm text-gray-500">
            Track, reschedule, or cancel your appointments.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
            onClick={() => navigate("/booking")}
          >
            Book a Service
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={
                  "rounded-full px-4 py-1 text-xs font-semibold " +
                  option.style +
                  (statusFilter === option.value ? " ring-2 ring-blue-500" : "")
                }
                onClick={() => setStatusFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <input
            placeholder="Search bookings"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:w-64"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

        <div className="mt-4 overflow-x-auto">
          {getBookingsDataLoading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-[900px] text-left">
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
                      N{" "}
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
                        setSelectedView={setSelectedView}
                      />
                      {/* <div className="flex flex-wrap gap-2">
                        <button
                          className="text-sm font-semibold text-blue-700 hover:underline"
                          onClick={() => handleViewVendor(b)}
                        >
                          View Vendor
                        </button>
                        <button
                          className="text-sm font-semibold text-amber-700 hover:underline"
                          onClick={() => openReschedule(b)}
                          disabled={b.status === "CANCELLED" || b.status === "COMPLETED"}
                        >
                          Reschedule
                        </button>
                        <button
                          className="text-sm font-semibold text-red-600 hover:underline"
                          onClick={() => openCancel(b)}
                          disabled={b.status === "CANCELLED" || b.status === "COMPLETED"}
                        >
                          Cancel
                        </button>
                      </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {bookingRows.length > 0 && (
          <div className="mt-4 flex items-center align-center justify-between">
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
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              onClick={handleReschedule}
              disabled={rescheduleLoading}
            >
              {rescheduleLoading ? "Rescheduling..." : "Confirm Reschedule"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
