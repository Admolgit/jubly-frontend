/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronDown,
  Download,
  Search,
  CalendarDays,
  Check,
  Clock3,
  X,
  Landmark,
} from "lucide-react";
import { StatCard } from "./dashboard/StatCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useGetTransactionDashStatsQuery,
  useGetTransactionHistoryByVendorQuery,
} from "../../features/transactions/transactionAPI";
import Loader from "../ui/Loader";
import { formatDate } from "../utils/dateFormatter";
import { formatTimeFromISO } from "../utils/timeFormatter";
import SelectLimit from "../utils/selectLimit";
import Pagination from "../utils/pagination";
import { LinkActions } from "../ui/LinkActions";

const DEFAULT_ITEMS_PER_PAGE = 10;

export default function TransactionsPage() {
  const vendor = useSelector(
    (state: { vendor: { vendor: { id: string } } }) => state.vendor.vendor,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");

  console.log(setSearchFilter)

  const { data: transactionsList, isLoading } =
    useGetTransactionHistoryByVendorQuery(
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
  const { data: transactionDashStats, isLoading: statsLoading } =
    useGetTransactionDashStatsQuery({});

  const transactions = transactionsList?.data?.transactions || [];
  console.log({ transactionDashStats });

  const statusStyles: any = {
    CONFIRMED: {
      wrapper: "bg-green-100 text-green-700",
      icon: "text-green-600",
    },
    PENDING: {
      wrapper: "bg-orange-100 text-orange-600",
      icon: "text-orange-500",
    },
    FAILED: {
      wrapper: "bg-red-100 text-red-600",
      icon: "text-red-500",
    },
  };

  const totalPages = Math.ceil(transactionsList?.meta?.total / itemsPerPage);

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    console.log(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(searchFilter.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchFilter]);

  if (isLoading || statsLoading) {
    return <Loader />;
  }

  return (
    <div className="py-4">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>

          <p className="text-sm text-gray-500">
            View and track all your payout transactions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Payouts"
          value={Number(
            transactionDashStats.totalPayouts,
          ).toLocaleString()}
          icon={<Download className="w-5 h-5" />}
          color="purple"
          change={`${transactionDashStats.totalGrowth}% from last month`}
        />
        <StatCard
          title="Completed"
          value={Number(transactionDashStats.completed).toLocaleString()}
          icon={<Check className="w-5 h-5" />}
          color="green"
          change={`${transactionDashStats.completedGrowth}% from last month`}
        />
        <StatCard
          title="Processing"
          value={Number(transactionDashStats.processing).toLocaleString()}
          icon={<Clock3 className="w-5 h-5" />}
          color="blue"
          change={`${transactionDashStats.processingGrowth}% from last month`}
        />
        <StatCard
          title="Failed"
          value={Number(transactionDashStats.failed).toLocaleString()}
          icon={<X className="w-5 h-5" />}
          color="orange"
          change={`${transactionDashStats.failedGrowth}% from last month`}
        />
      </div>

      {/* FILTERS */}
      <div className="flex items-center justify-between mb-6 rounded-2xl bg-white p-4 shadow-sm mt-6">
        <div className="flex items-center gap-4">
          <button className="h-12 px-5 bg-white border border-[#EAECF0] rounded-2xl flex items-center gap-2 text-sm font-medium text-[#344054]">
            <CalendarDays size={20} />
            Apr 1, 2026 – May 12, 2026
            <ChevronDown size={18} />
          </button>

          <button className="h-12 px-5 bg-white border border-[#EAECF0] rounded-2xl flex items-center gap-2 text-sm font-medium text-[#344054]">
            All Status
            <ChevronDown size={18} />
          </button>

          <button className="h-12 px-5 bg-white border border-[#EAECF0] rounded-2xl flex items-center gap-2 text-sm font-medium text-[#344054]">
            All Methods
            <ChevronDown size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <div className="w-[340px] h-12 px-5 bg-white border border-[#EAECF0] rounded-2xl flex items-center gap-3">
            <Search className="text-[#98A2B3]" size={20} />

            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full bg-transparent outline-none text-sm placeholder:text-[#98A2B3]"
            />
          </div>

          {/* EXPORT */}
          <button className="h-12 px-6 rounded-2xl border border-[#C7BFFF] text-[#6D4AFF] font-semibold text-sm flex items-center gap-3 hover:bg-[#f7f5ff] transition">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-[#EAECF0] rounded-[28px] overflow-hidden shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <table className="w-full">
          <thead className="bg-[#FCFCFD] border-b border-[#EAECF0]">
            <tr>
              {[
                "Client",
                "Date",
                "Description",
                "Amount",
                "Status",
                "Method",
                "Reference",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-left text-xs font-semibold text-[#667085]"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transactions.map((item: any, i: number) => (
              <tr
                key={i}
                className="border-b border-[#EAECF0] last:border-none hover:bg-[#FAFAFB] transition"
              >
                <td className="px-6 py-4">{item.senderDetails.senderName}</td>
                {/* DATE */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-[#101828] mb-1">
                    {formatDate(item.createdAt)}
                  </div>

                  <div className="text-xs text-[#667085] font-medium">
                    {formatTimeFromISO(item.createdAt)}
                  </div>
                </td>

                {/* DESCRIPTION */}
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-[#101828] mb-1">
                    {item.senderDetails.senderDescription}
                  </div>

                  <div className="text-xs text-[#667085] font-medium">
                    {item.bank || "N/A"}
                  </div>
                </td>

                {/* AMOUNT */}
                <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                  ₦{Number(item.amount).toLocaleString()}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold ${
                      statusStyles[item.status].wrapper
                    }`}
                  >
                    {item.status === "CONFIRMED" && (
                      <Check
                        size={14}
                        className={statusStyles[item.status].icon}
                      />
                    )}

                    {item.status === "PENDING" && (
                      <Clock3
                        size={14}
                        className={statusStyles[item.status].icon}
                      />
                    )}

                    {item.status === "FAILED" && (
                      <X size={14} className={statusStyles[item.status].icon} />
                    )}

                    {item.status}
                  </div>
                </td>

                {/* METHOD */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-[#344054]">
                    <Landmark size={18} />
                    {item.method || "N/A"}
                  </div>
                </td>

                {/* REF */}
                <td className="px-6 py-4 text-sm font-medium text-[#475467]">
                  {item.providerRef}
                </td>

                {/* ACTION */}
                <td className="px-6 py-4">
                  <LinkActions />
                  {/* <button className="text-[#667085] hover:text-[#111827] transition">
                    <MoreHorizontal size={22} />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length > 0 && (
          <div className="mt-4 px-6 flex items-center align-center justify-between">
            <SelectLimit
              ITEMS_OPTIONS={[5, 10, 20, 50]}
              itemsPerPage={itemsPerPage}
              handleItemsChange={handleItemsChange}
              text="Transactions"
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
