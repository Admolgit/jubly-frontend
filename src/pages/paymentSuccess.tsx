/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useVerifyTransactionMutation } from "../features/paystack/paystackApi";

export default function PaymentSuccessPage() {
  const reference = localStorage.getItem("paymentReference") || "";

  const [verifyTransaction, { isLoading }] = useVerifyTransactionMutation();

  React.useEffect(() => {
    const verifyPayment = async () => {
      try {
        await verifyTransaction({ reference: reference });
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };

    if (reference) {
      verifyPayment();
      localStorage.removeItem("paymentReference");
    }
  }, [reference, verifyTransaction]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.getElementById("receipt");

    if (!element) return;

    // const options = {
    //   margin: 0.5,
    //   filename: `JubPay_Receipt_${transaction.reference}.pdf`,
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: {
    //     scale: 2,
    //     useCORS: true,
    //   },
    //   jsPDF: {
    //     unit: "in",
    //     format: "a4",
    //     orientation: "portrait",
    //   },
    // };

    // html2pdf()
    //   .set(options as any)
    //   .from(element)
    //   .save();
  };

  const handleShare = async () => {
    // if (navigator.share && transaction) {
    //   await navigator.share({
    //     title: "Payment Receipt",
    //     text: `Payment of ₦${transaction.amount / 100} was successful`,
    //   });
    // }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Verifying payment...</p>;
  }

  // if (!transaction) {
  //   return <p className="text-center mt-10 text-red-500">Payment not found.</p>;
  // }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded p-6 print:shadow-none">
      <h1 className="text-green-600 text-2xl font-semibold text-center mb-4">
        Payment Successful
      </h1>

      {/* Receipt */}
      <div className="border rounded p-4 text-sm" id="receipt">
        <div className="mb-6 flex flex-col items-center text-center">
          <div>
            {/* <h2 className="text-xl font-bold">{subaccountInfo}</h2>
            <p className="text-gray-600">
              {transaction?.metadata?.description}
            </p> */}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Payment Receipt</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your payment. Below are the details of your
              transaction.
            </p>
          </div>
        </div>
        {/* <ReceiptRow label="Reference" value={transaction.reference} /> */}
        {/* <ReceiptRow
          label="Amount Paid"
          value={`₦${transaction.amount / 100}`}
        /> */}
        {/* <ReceiptRow label="Fees" value={`₦${transaction.fees / 100}`} />
        <ReceiptRow label="Currency" value={transaction.currency} />
        <ReceiptRow label="Status" value={transaction.status} />
        <ReceiptRow label="Payment Channel" value={transaction.channel} />
        <ReceiptRow
          label="Card Type"
          value={transaction.authorization?.brand}
        />
        <ReceiptRow
          label="Card Last 4"
          value={transaction.authorization?.last4}
        />
        <ReceiptRow label="Bank" value={transaction.authorization?.bank} />
        <ReceiptRow
          label="Customer Email"
          value={transaction.customer?.email}
        />
        <ReceiptRow
          label="Paid At"
          value={new Date(transaction.paid_at).toLocaleString()}
        /> */}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-6 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-900 text-white rounded"
        >
          Print
        </button>

        <button
          onClick={handleShare}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Share
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-400"
        >
          Download
        </button>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// function ReceiptRow({ label, value }: { label: string; value?: string }) {
//   return (
//     <div className="flex justify-between py-1 border-b last:border-b-0">
//       <span className="text-gray-600">{label}</span>
//       <span className="font-medium">{value || "-"}</span>
//     </div>
//   );
// }
