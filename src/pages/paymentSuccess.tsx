/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  CheckCircle2,
  Download,
  Printer,
  Share2,
  Copy,
  ArrowLeft,
  CreditCard,
  ReceiptText,
} from "lucide-react";
import { useVerifyTransactionMutation } from "../features/paystack/paystackApi";

export default function PaymentSuccessPage() {
  const reference = localStorage.getItem("paymentReference") || "";

  const [verifyTransaction, { isLoading }] = useVerifyTransactionMutation();

  const [verifyData, setVerifyData] = useState<any>();

  React.useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await verifyTransaction({ reference });

        if (response.data.status === "success") {
          console.log({ response });
          setVerifyData(response);
        }
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
    if (navigator.share) {
      await navigator.share({
        title: "Payment Receipt",
        text: "Your payment was successful",
      });
    }
  };

  const transaction = {
    receipt: `JUB-${verifyData?.data?.reference}-${new Date().toLocaleString()}`,
    amount: verifyData?.data?.amount,
    status: verifyData?.data?.status === "success" ? "Paid" : "Failed",
    customer: verifyData?.customer?.first_name,
    email: verifyData?.customer?.email,
    service: "Payment for service",
    date: new Date().toLocaleString(),
    method: verifyData?.authorization?.brand,
    txId: "txn_8F72K3L9eXJ2Pq",
    // response.data.metadata.description
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb]">
        <div className="rounded-2xl bg-white px-6 py-5 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-14">
      <div className="mx-auto max-w-4xl">
        {/* Success Header */}
        <div className="rounded-[28px] border border-gray-100 bg-white px-6 py-12 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Success Icon */}
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-100 opacity-40" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-100">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#0f172a]">
              Payment Successful!
            </h1>

            <p className="mt-3 max-w-xl text-base text-gray-500">
              Thank you for your payment. Your transaction has been completed
              successfully and your receipt is ready below.
            </p>
          </div>
        </div>

        {/* Receipt */}
        <div
          id="receipt"
          className="mt-8 rounded-[28px] border border-gray-100 bg-white shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Payment Receipt
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Receipt details for your completed transaction.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {transaction.status}
            </div>
          </div>

          {/* Receipt Top */}
          <div className="flex flex-col gap-6 px-8 py-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <ReceiptText className="h-8 w-8 text-blue-600" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#0f172a]">
                  Receipt #{transaction.receipt}
                </h3>

                <p className="mt-1 text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid gap-6 border-t border-gray-100 px-8 py-8 md:grid-cols-3">
            {/* Billed To */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Billed To
              </p>

              <div className="space-y-1">
                <h4 className="font-semibold text-[#0f172a]">
                  {transaction.customer}
                </h4>

                <p className="text-sm text-gray-500">{transaction.email}</p>

                <p className="text-sm text-gray-500">Lagos, Nigeria</p>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Payment Method
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                </div>

                <div>
                  <p className="font-medium text-[#0f172a]">
                    {transaction.method}
                  </p>

                  <p className="text-sm text-gray-500">Expires 09/29</p>
                </div>
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Transaction ID
              </p>

              <div className="flex items-center gap-2">
                <p className="font-medium text-[#0f172a]">{transaction.txId}</p>

                <button className="text-gray-400 transition hover:text-gray-700">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="px-8 pb-8">
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              {/* Table Header */}
              <div className="grid grid-cols-12 border-b border-gray-100 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-500">
                <div className="col-span-7">Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-3 text-right">Amount</div>
              </div>

              {/* Table Body */}
              <div className="grid grid-cols-12 items-center border-b border-gray-100 px-6 py-5">
                <div className="col-span-7">
                  <h4 className="font-medium text-[#0f172a]">
                    {transaction.service}
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Annual SaaS subscription payment
                  </p>
                </div>

                <div className="col-span-2 text-center font-medium text-[#0f172a]">
                  1
                </div>

                <div className="col-span-3 text-right font-semibold text-[#0f172a]">
                  {transaction.amount}
                </div>
              </div>

              {/* Totals */}
              <div className="flex justify-end bg-white px-6 py-6">
                <div className="w-full max-w-sm space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>

                    <span className="font-medium text-[#0f172a]">
                      {transaction.amount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tax</span>

                    <span className="font-medium text-[#0f172a]">₦0</span>
                  </div>

                  <div className="border-t border-dashed pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#0f172a]">
                        Total Paid
                      </span>

                      <span className="text-2xl font-bold text-green-600">
                        {transaction.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-2xl bg-[#0f172a] px-6 py-4 text-sm font-medium text-white shadow-lg shadow-slate-200 transition hover:scale-[1.02]"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-medium text-[#0f172a] transition hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-medium text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            <Share2 className="h-4 w-4" />
            Share Receipt
          </button>
        </div>

        {/* Back */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
