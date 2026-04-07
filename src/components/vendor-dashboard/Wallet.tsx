/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { StatCard } from "./StatCard";
import SelectLimit from "../utils/selectLimit";
import Pagination from "../utils/pagination";
import { useEffect, useState } from "react";
import {
  useGetTransactionHistoryByVendorQuery,
} from "../../features/transactions/transactionAPI";
import Loader from "../ui/Loader";

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const DEFAULT_ITEMS_PER_PAGE = 10;

export function Wallet() {
  const vendor = useSelector(
    (state: { vendor: { vendor: { id: string } } }) => state.vendor.vendor,
  );
  const totalEarned = useSelector(
    (state: any) => state.transactions.transactions,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { data: transactionsList, isLoading } = useGetTransactionHistoryByVendorQuery(
    {
      vendorId: vendor?.id,
      page: currentPage,
      limit: itemsPerPage,
      searchValue,
    },
    {
      skip: !vendor?.id,
    },
  );

  const transactions = transactionsList?.data?.transactions || [];

  const payouts = [
    {
      id: 1,
      date: "May 12, 2026",
      amount: "NGN 35,000",
      status: "Completed",
    },
    {
      id: 2,
      date: "May 05, 2026",
      amount: "NGN 18,000",
      status: "Processing",
    },
    {
      id: 3,
      date: "Apr 26, 2026",
      amount: "NGN 22,000",
      status: "Completed",
    },
  ];

  const totalPages = Math.ceil(transactionsList?.meta?.total / itemsPerPage);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(searchFilter.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Wallet</h1>
          <p className="text-sm text-gray-500">
            Track balances, payouts, and earnings.
          </p>
        </div>
        <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700">
          Withdraw to Bank
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Earned"
          value={Number(totalEarned).toLocaleString()}
        />
        <StatCard title="Available" value="NGN 140,000" />
        <StatCard title="Pending" value="NGN 20,000" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.65fr_0.35fr]">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Recent Payouts</h3>
          <div className="mt-4 space-y-3">
            {payouts.map((payout) => (
              <div
                key={payout.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {payout.amount}
                  </p>
                  <p className="text-xs text-gray-500">{payout.date}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    payout.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {payout.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="font-semibold">Payout Account</h3>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div>
              <p className="text-xs text-gray-400">Bank</p>
              <p className="font-medium text-gray-900">Jubly Bank</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Account Number</p>
              <p className="font-medium text-gray-900">0123456789</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Account Name</p>
              <p className="font-medium text-gray-900">Jubly Beauty</p>
            </div>
          </div>
          <button className="mt-5 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Update Bank Details
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <p>Clients transactions view</p>
        </div>
        <input
          placeholder="Search bookings"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:w-64"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>
      <div className="mt-4 overflow-x-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full min-w-[640px] text-left">
            <thead className="text-xs uppercase text-gray-400">
              <tr className="border-b">
                <th className="px-3 py-3">Client</th>
                <th className="px-3 py-3">Contact</th>
                <th className="px-3 py-3">Bookings title</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Paid at</th>
                <th className="px-3 py-3">Booked at</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions?.map((transaction: any) => (
                <tr key={transaction.id} className="border-b last:border-b-0">
                  <td className="px-3 py-4 font-medium text-gray-900">
                    {transaction?.senderDetails?.senderName || "Client Name"}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    <div>
                      {transaction.senderDetails?.phone || "+234 800 000 0000"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {transaction?.title || "Service Booked"}
                    </div>
                  </td>
                  <td className="px-3 py-4 font-semibold text-gray-900">
                    {transaction?.title || "Service Title"}
                  </td>
                  <td className="px-3 py-4 font-semibold text-gray-900">
                    {transaction?.Category || "Service Category"}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    {transaction?.paidAt
                      ? new Date(transaction?.paidAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    {transaction?.createdAt
                      ? new Date(transaction?.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[transaction?.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {transaction?.status}
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
      {transactions.length > 0 && (
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
  );
}
