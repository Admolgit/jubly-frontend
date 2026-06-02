/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChevronDown,
  Download,
  CalendarDays,
  Check,
  Clock3,
  X,
  Landmark,
  CheckCircle2,
} from "lucide-react";
import { StatCard } from "../dashboard/StatCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useExportTransactionsCSVMutation,
  useGetTransactionDashStatsQuery,
  useGetTransactionHistoryByVendorQuery,
  useRefundClientTransactionMutation,
} from "../../../features/transactions/transactionAPI";
import Loader from "../../ui/Loader";
import { formatDate } from "../../utils/dateFormatter";
import { formatTimeFromISO } from "../../utils/timeFormatter";
import SelectLimit from "../../utils/selectLimit";
import Pagination from "../../utils/pagination";
import { LinkActions } from "../../ui/LinkActions";
import BookingSearch from "../booking/BookingSearch";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import TransactionViewModal from "./TransactionViewModal";
import Dialog from "../../ui/Dialog";

const DEFAULT_ITEMS_PER_PAGE = 10;

export default function TransactionsPage() {
  const vendor = useSelector(
    (state: { vendor: { vendor: { id: string } } }) => state.vendor.vendor,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedView, setSelectedView] = useState(null);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  console.log(setSearchFilter);
  console.log(selectedView);

  const { data: transactionsList, isLoading } =
    useGetTransactionHistoryByVendorQuery(
      {
        vendorId: vendor?.id,
        page: currentPage,
        limit: itemsPerPage,
        search: searchValue,
      },
      {
        skip: !vendor?.id,
      },
    );
  const { data: transactionDashStats, isLoading: statsLoading } =
    useGetTransactionDashStatsQuery({});

  const transactions = transactionsList?.data?.transactions || [];

  const statusStyles: any = {
    CONFIRMED: {
      wrapper: "bg-green-100 text-green-700",
      icon: "fill-green-600 text-white",
    },
    PENDING: {
      wrapper: "bg-blue-100 text-blue-600",
      icon: "text-blue-500",
    },
    COMPLETED: {
      wrapper: "bg-grey-100 text-grey-700",
      dot: "bg-grey-500",
    },
    FAILED: {
      wrapper: "bg-red-100 text-red-600",
      icon: "text-red-500",
    },
    REFUND_PENDING: {
      wrapper: "bg-orange-100 text-orange-600",
      icon: "text-orange-500",
    },
    CANCELLED: {
      wrapper: "bg-red-100 text-red-700",
      dot: "bg-red-500",
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

  const [exportTransactionsCSV, { isLoading: isExporting }] =
    useExportTransactionsCSVMutation();
  const [refundClientTransaction, { isLoading: isRefunding }] =
    useRefundClientTransactionMutation();

  const handleExportTransactions = async () => {
    try {
      const blob = await exportTransactionsCSV({}).unwrap();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", `transactions-${Date.now()}.csv`);

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Transactions exported successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to export transactions");
    }
  };

  const openRefundTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setOpenRefund(true);
  };

  const handleRefund = async () => {
    try {
      const payload = {
        providerRef: selectedTransaction?.providerRef,
        bookingId: selectedTransaction?.bookingId,
        amount: selectedTransaction?.amount,
      };
      console.log({ selectedTransaction });
      await refundClientTransaction(payload).unwrap();
      toast.success("Refund initiated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to refund transactions");
    }
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Payouts"
          value={Number(transactionDashStats.totalPayouts).toLocaleString()}
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
      <div className="sm:flex sm:items-center sm:justify-between xl:flex xl:justify-between mb-6 rounded-2xl bg-white p-4 shadow-sm mt-6">
        {/* <div className="grid grid-cols-1 justify-content justify-between gap-4 sm:grid-cols-2 xl:grid-cols-2 mb-6 rounded-2xl bg-white p-4 shadow-sm mt-6"> */}
        <div className="flex items-center gap-4 mb-4 sm:mb-0 xl:mb-0">
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

        <div className="flex items-center gap-2">
          <BookingSearch value={searchValue} setSearchFilter={setSearchValue} />

          {/* EXPORT */}
          <button
            className="h-12 px-6 rounded-2xl border border-[#C7BFFF] text-[#6D4AFF] font-semibold text-sm flex items-center gap-3 hover:bg-[#f7f5ff] transition"
            onClick={handleExportTransactions}
            disabled={isExporting}
          >
            <Download size={18} />
            {isExporting ? "Exporting..." : "Export CSV"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-4 w-full">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="min-w-[700px] w-full text-left rounded-xl border border-gray-200 text-sm">
            <thead className="text-md bg-gray-50 text-gray-500 uppercase tracking-wider">
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
              {transactions?.map((item: any, i: number) => (
                <tr
                  key={i}
                  className="border-b border-[#EAECF0] last:border-none hover:bg-[#FAFAFB] transition"
                >
                  <td className="px-6 py-4">
                    {item?.senderDetails?.senderName}
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#101828] mb-1">
                      {formatDate(item?.createdAt)}
                    </div>

                    <div className="text-xs text-[#667085] font-medium">
                      {formatTimeFromISO(item?.createdAt)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-[#101828] mb-1">
                      {item?.senderDetails?.senderDescription}
                    </div>

                    <div className="text-xs text-[#667085] font-medium">
                      {item?.bank || "N/A"}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-[#101828]">
                    ₦{Number(item?.amount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-semibold ${
                        statusStyles[item?.status]?.wrapper
                      }`}
                    >
                      {item?.status === "CONFIRMED" && (
                        <CheckCircle2
                          size={14}
                          className={statusStyles[item?.status]?.icon}
                        />
                      )}

                      {item?.status === "PENDING" && (
                        <Clock3
                          size={14}
                          className={statusStyles[item?.status]?.icon}
                        />
                      )}

                      {item?.status === "FAILED" && (
                        <Clock3
                          size={14}
                          className={statusStyles[item?.status]?.icon}
                        />
                      )}
                      {item?.status === "CANCELLED" && (
                        <X
                          size={14}
                          className={statusStyles[item?.status]?.icon}
                        />
                      )}

                      {item?.status}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-sm font-medium text-[#344054]">
                      <Landmark size={18} />
                      {item?.method || "N/A"}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-[#475467]">
                    {item?.providerRef}
                  </td>

                  <td className="px-6 py-4">
                    <LinkActions
                      setSelectedView={setSelectedView}
                      link={item}
                      component="transaction"
                      setViewVendorOpen={setOpenTransaction}
                      onReschedule={openRefundTransaction}
                    />
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
      <Modal
        open={openTransaction}
        onClose={() => setOpenTransaction(false)}
        title="Transaction Details"
        size="lg"
      >
        <TransactionViewModal
          transaction={selectedView}
          onClose={() => setOpenTransaction(false)}
        />
      </Modal>
      <Modal
        open={openRefund}
        onClose={() => setOpenRefund(false)}
        title="Refund Transaction"
        size="md"
      >
        <Dialog
          setCancelOpen={setOpenRefund}
          cancelLoading={isRefunding}
          handleCancel={() => handleRefund()}
          headerText="Are you sure you want to refund this transaction? This action cannot be undone."
          btnCancelText="No, keep it"
          btnKeepText="Yes, refund"
        />
      </Modal>
    </div>
  );
}
