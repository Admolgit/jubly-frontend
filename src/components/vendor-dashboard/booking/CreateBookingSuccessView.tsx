import { CheckCircle2, Copy, ExternalLink, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

export type CreateBookingSuccessResult = {
  paymentOption: "PAY_BY_LINK" | "PAID_BY_HAND";
  paymentUrl?: string;
  clientName: string;
  serviceName: string;
  dateLabel: string;
  timeLabel: string;
  amount: number;
};

export default function CreateBookingSuccessView({
  result,
  onDone,
  onViewBooking,
}: {
  result: CreateBookingSuccessResult;
  onDone: () => void;
  onViewBooking: () => void;
}) {
  const isPayByLink = result.paymentOption === "PAY_BY_LINK";

  const handleCopyLink = async () => {
    if (!result.paymentUrl) return;

    try {
      await navigator.clipboard.writeText(result.paymentUrl);
      toast.success("Payment link copied");
    } catch {
      toast.error("Could not copy link. Please copy it manually.");
    }
  };

  const handleShareWhatsApp = () => {
    if (!result.paymentUrl) return;

    const message = `Hi ${result.clientName}, your booking for ${result.serviceName} has been created on Jubly. Complete your payment here: ${result.paymentUrl}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="flex flex-col items-center py-2 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-9 w-9 text-green-600" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-gray-900">
        {isPayByLink ? "Booking created" : "Booking created successfully"}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {isPayByLink
          ? "Payment is awaiting your client."
          : "This booking is confirmed on your calendar."}
      </p>

      <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <SummaryField label="Client" value={result.clientName} />
          <SummaryField label="Service" value={result.serviceName} />
          <SummaryField label="Date" value={result.dateLabel} />
          <SummaryField label="Time" value={result.timeLabel} />
          <SummaryField
            label="Amount"
            value={`₦${Number(result.amount || 0).toLocaleString()}`}
          />
          <SummaryField
            label="Payment"
            value={isPayByLink ? "Awaiting client payment" : "Paid outside Jubly"}
          />
        </div>
      </div>

      {isPayByLink && result.paymentUrl && (
        <div className="mt-5 w-full rounded-2xl border border-purple-100 bg-purple-50 p-4">
          <p className="mb-3 truncate text-xs text-purple-700">
            {result.paymentUrl}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50"
            >
              <Copy className="h-4 w-4" />
              Copy payment link
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50"
            >
              <MessageCircle className="h-4 w-4" />
              Send via WhatsApp
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onViewBooking}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <ExternalLink className="h-4 w-4" />
          View booking
        </button>

        <button
          type="button"
          onClick={onDone}
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}
