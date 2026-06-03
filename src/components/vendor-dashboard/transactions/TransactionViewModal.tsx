/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Clock3,
  Copy,
  CreditCard,
  Download,
  User2,
  Wallet,
} from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import { formatTimeFromISO } from "../../utils/timeFormatter";

interface TransactionViewModalProps {
  transaction: any;
  onClose: () => void;
}

export default function TransactionViewModal({
  transaction,
  onClose,
}: TransactionViewModalProps) {
  if (!open || !transaction) return null;

  const fee = Number(transaction?.amount) * Number(transaction?.percentageFee);

  const vendorAmount = Number(transaction?.amount) - fee;

  const transactionStatus = transaction?.status;

  const lastStep =
    transactionStatus === "CANCELLED"
      ? {
          title: "Booking Cancelled",
          description: "This booking was cancelled",
          active: true,
          cancelled: true,
        }
      : transactionStatus === "COMPLETED"
        ? {
            title: "Completed",
            description: "Service completed successfully",
            active: true,
            completed: true,
          }
        : {
            title: "Fund held",
            description: "Mark as completed after service",
            warning: true,
          };

  const timeline = [
    {
      title: "Payment Initiated",
      description: new Date(transaction?.createdAt).toLocaleString(),
      active: true,
      warning: false,
    },
    {
      title: "Payment Confirmed",
      description: new Date(transaction?.paidAt).toLocaleString(),
      active:
        transactionStatus === "PENDING" ||
        transactionStatus === "COMPLETED" ||
        transactionStatus === "CANCELLED",
      // warning: false,
    },
    lastStep,
  ];

  return (
    <div className="w-full">
      <div>
        <div className="space-y-2 p-2">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <Wallet className="h-7 w-7 text-violet-600" />
              </div>

              <div>
                <p className="mb-1 text-xs text-gray-500">Transaction ID</p>

                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {transaction?.id}
                  </h3>

                  <Copy className="h-4 w-4 cursor-pointer text-gray-400" />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {formatDate(transaction?.paidAt)} •{" "}
                  {formatTimeFromISO(transaction?.paidAt)}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500">Status</p>

              <div
                className={`${transaction?.status === "CONFIRMED" ? "bg-green-100 text-green-700" : transaction?.status === "PENDING" ? "bg-blue-100 text-blue-700" : transaction?.status === "COMPLETED" ? "bg-gray-100 text-gray-700" : ""} inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold`}
              >
                <span
                  className={`${transaction?.status === "CONFIRMED" ? "bg-green-500" : transaction?.status === "PENDING" ? "bg-blue-500" : transaction?.status === "COMPLETED" ? "bg-gray-500" : ""} h-2 w-2 rounded-full `}
                />

                {transaction?.status}
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Payment confirmed and secured
              </p>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-3xl border border-gray-200">
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Amount Summary
              </h3>
            </div>

            <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-4 md:divide-x md:divide-y-0">
              {/* Total */}
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                  <Wallet className="h-5 w-5 text-violet-600" />
                </div>

                <p className="text-xs text-gray-500">Total Amount</p>

                <h4 className="mt-2 text-xl font-semibold text-gray-900">
                  ₦{transaction?.amount?.toLocaleString()}
                </h4>
              </div>
              
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>

                <p className="text-xs text-gray-500">
                  Platform Fee ({transaction?.percentageFee * 100}
                  %)
                </p>

                <h4 className="mt-2 text-xl font-semibold text-gray-900">
                  ₦{fee.toLocaleString()}
                </h4>
              </div>
              
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>

                <p className="text-xs text-gray-500">Vendor Amount</p>

                <h4 className="mt-2 text-xl font-semibold text-gray-900">
                  ₦{vendorAmount?.toLocaleString()}
                </h4>
              </div>

              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                  <Clock3 className="h-5 w-5 text-blue-600" />
                </div>

                <p className="text-xs text-gray-500">Settlement Status</p>

                <h4 className="mt-2 text-lg font-semibold text-orange-500">
                  {transaction?.status !== "COMPLETED" ? "HELD" : "SETTLED"}
                </h4>

                <p className="mt-1 text-xs text-gray-400">
                  {transaction?.status !== "COMPLETED"
                    ? "Will be settled on completion."
                    : "Settled to vendor account."}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-gray-200">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-900">
                  Payment Information
                </h3>
              </div>

              <div className="space-y-2 p-2">
                <InfoRow label="Payment Method" value="Paystack" />

                <InfoRow
                  label="Provider Reference"
                  value={transaction?.providerRef}
                />

                <InfoRow
                  label="Paid At"
                  value={new Date(transaction?.paidAt).toLocaleString()}
                />

                <InfoRow label="Currency" value={transaction?.currency} />

                <InfoRow
                  label="Percentage Fee"
                  value={`${transaction?.percentageFee * 100}%`}
                />
              </div>
            </div>
            
            <div className="overflow-hidden rounded-3xl border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-900">
                  Sender Information
                </h3>

                <User2 className="h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-2 p-2">
                <InfoRow
                  label="Name"
                  value={transaction?.senderDetails?.senderName}
                />

                <InfoRow
                  label="Description"
                  value={transaction?.senderDetails?.senderDescription}
                />

                <InfoRow
                  label="Sender Details ID"
                  value={transaction?.senderDetails?.id}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-gray-200">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-900">
                  Related Booking
                </h3>
              </div>

              <div className="space-y-2 p-2">
                <InfoRow label="Booking ID" value={transaction?.booking?.id} />
                <InfoRow
                  label="Client Email"
                  value={transaction?.booking?.clientEmail}
                />
                <InfoRow
                  label="Client Name"
                  value={transaction?.booking?.clientName}
                />
                <InfoRow
                  label="Booking Name"
                  value={transaction?.booking?.services?.name}
                />
                <InfoRow
                  label="Booking Description"
                  value={transaction?.booking?.services?.description}
                />
                <InfoRow
                  label="Duration"
                  value={
                    transaction?.booking?.services?.durationMins % 60 !== 0
                      ? ` ${transaction?.booking?.services?.durationMins / 60} hours`
                      : ` ${transaction?.booking?.services?.durationMins / 60} hours`
                  }
                />
              </div>
            </div>
            
            <div className="overflow-hidden rounded-3xl border border-gray-200">
              <div className="border-b border-gray-100 px-6 py-5">
                <h3 className="text-sm font-semibold text-gray-900">
                  Timeline
                </h3>
              </div>

              <div className="space-y-4 p-2">
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    active={item.active}
                    warning={item.warning}
                    isLast={index === timeline.length - 1}
                    cancelled={transactionStatus === "CANCELLED"}
                    completed={transactionStatus === "COMPLETED"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 border-t border-gray-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100">
            <Download className="h-4 w-4" />
            Download Receipt
          </button>

          <button
            onClick={onClose}
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <p className="text-xs text-gray-500">{label}</p>

      <p className="text-right font-medium text-gray-900">{value}</p>
    </div>
  );
}

type TimelineItemProps = {
  title: string;
  description: string;
  active?: boolean;
  warning?: boolean;
  cancelled?: boolean;
  completed?: boolean;
  isLast?: boolean;
};

export function TimelineItem({
  title,
  description,
  active,
  warning,
  isLast,
  cancelled,
  completed,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-4 pb-8">
      {!isLast && (
        <div
          className={`absolute left-5 top-10 w-[2px] h-full
            ${
              cancelled
                ? "bg-red-500"
                : completed
                  ? "bg-gray-500"
                  : active
                    ? "bg-green-500"
                    : "bg-gray-200"
            }`}
        />
      )}

      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4
          ${
            cancelled
              ? "border-red-100 bg-red-500"
              : completed
                ? "border-gray-200 bg-gray-500"
                : active
                  ? "border-green-100 bg-green-500"
                  : warning
                    ? "border-orange-100 bg-orange-400"
                    : "border-gray-100 bg-gray-300"
          }`}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>

        <p className="mt-1 text-xs leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
