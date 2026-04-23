/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useGetBookingsQuery,
  useGetDashboardStartsQuery,
} from "../../features/booking/bookingApi";
import { formatDate } from "../utils/dateFormatter";
import Pagination from "../utils/pagination";
import SelectLimit from "../utils/selectLimit";
import { formatTimeFromISO } from "../utils/timeFormatter";
import Loader from "../ui/Loader";
import { useSelector } from "react-redux";
import { useGetTransactionAmountByVendorQuery } from "../../features/transactions/transactionAPI";

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

  const { data: getBookingsData, isLoading: getBookingsDataLoading } =
    useGetBookingsQuery({
      page: currentPage,
      limit: itemsPerPage,
      status: statusFilter === "ALL" ? "" : statusFilter?.toUpperCase(),
      dateFilter: undefined,
      search: searchValue || undefined,
      date: undefined,
    });
  const { data: dashboardStats } = useGetDashboardStartsQuery(vendor?.id, {
    skip: !vendor?.id,
  });
  const { data: getTransactionsHistoryByVendor } =
    useGetTransactionAmountByVendorQuery(vendor?.id, {
      skip: !vendor?.id,
    });

  const totalPages = Math.ceil(getBookingsData?.meta?.total / itemsPerPage);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    console.log("Debounced search value:", value);
    setSearchValue(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(searchFilter.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilter]);

  return (
    <div className="py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <p className="text-sm text-gray-500">
            Track upcoming and past appointments.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Export
          </button>
          <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800">
            New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Bookings</p>
          <p className="mt-2 text-xl font-semibold">
            {dashboardStats?.data?.bookingCount?.toString() || "0"}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Upcoming</p>
          <p className="mt-2 text-xl font-semibold">
            {dashboardStats?.data?.upcomingBooking?.toString() || "0"}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">This Month Revenue</p>
          <p className="mt-2 text-xl font-semibold">{`₦ ${getTransactionsHistoryByVendor?.data?.total?.toLocaleString() || "0"}`}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`rounded-full px-4 py-1 text-xs font-semibold ${option.style} ${
                  statusFilter === option.value ? "ring-2 ring-blue-500" : ""
                }`}
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
            <table className="w-full min-w-[700px] text-left">
              <thead className="text-xs uppercase text-gray-400">
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
              <tbody className="text-sm">
                {getBookingsData?.data?.map((b: any) => (
                  <tr key={b.id} className="border-b last:border-b-0">
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
                    <td className="px-3 py-4 font-semibold text-gray-900">
                      N {Number(b.services?.price)?.toLocaleString()}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[b.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <button className="text-sm font-semibold text-blue-700 hover:underline">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {getBookingsData?.data?.length > 0 && (
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
    </div>
  );
}
