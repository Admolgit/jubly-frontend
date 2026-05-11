/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { StatCard } from "../dashboard/StatCard";
import { CurrencyIcon, StampIcon, Wallet2Icon } from "lucide-react";
import PayoutSummary from "./PayoutSummary";

export function Wallet() {
  const totalEarned = useSelector(
    (state: any) => state.transactions.transactions,
  );

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

  return (
    <div className="py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Wallet</h1>
          <p className="text-sm text-gray-500">
            Track balances, payouts, and earnings.
          </p>
        </div>
        <button className="rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90">
          Withdraw to Bank
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 my-6">
        <StatCard
          title="Total Earned"
          value={`₦${Number(totalEarned).toLocaleString()}`}
          icon={<Wallet2Icon className="w-5 h-5" />}
          color="green"
          change="12% from last month"
        />
        <StatCard
          title="Available"
          value="₦140,000"
          icon={<CurrencyIcon className="w-5 h-5" />}
          color="purple"
          change="12% from last month"
        />
        <StatCard
          title="Pending"
          value="₦20,000"
          icon={<StampIcon className="w-5 h-5" />}
          color="purple"
          change="12% from last month"
        />
      </div>

      <div className="my-6 grid grid-cols-1 gap-6 xl:grid-cols-[0.65fr_0.35fr]">
        {/* Recent Payouts */}
        <div className="rounded-3xl border border-[#F1F1F4] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F3FF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#6D5DFB]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h3 className="text-md font-semibold text-[#111827]">
                Recent Payouts
              </h3>
            </div>

            <button className="flex items-center gap-2 rounded-xl border border-[#E7E4FF] px-4 py-2 text-xs font-medium text-[#6D5DFB] transition hover:bg-[#F8F7FF]">
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {payouts.map((payout) => (
              <div
                key={payout.id}
                className="flex items-center justify-between rounded-2xl border border-[#F3F4F6] bg-white px-5 py-5 transition hover:border-[#E9E9EF]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      payout.status === "Completed"
                        ? "bg-[#ECFDF3]"
                        : "bg-[#FFF7E8]"
                    }`}
                  >
                    {payout.status === "Completed" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#16A34A]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 10h18M7 15h.01M11 15h2m-9 4h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#F59E0B]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold tracking-tight text-[#111827]">
                      {payout.amount}
                    </p>

                    <p className="mt-1 text-xs text-[#667085]">{payout.date}</p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium ${
                    payout.status === "Completed"
                      ? "bg-[#ECFDF3] text-[#16A34A]"
                      : "bg-[#FFF7E8] text-[#D97706]"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  {payout.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Account */}
        <div className="rounded-3xl border border-[#F1F1F4] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F3FF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6D5DFB]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h3 className="text-md font-semibold text-[#111827]">
              Payout Account
            </h3>
          </div>

          <div className="mt-8 space-y-7">
            <div>
              <p className="text-xs text-[#98A2B3]">Bank</p>
              <p className="mt-1 text-sm font-semibold tracking-tight text-[#111827]">
                Jubly Bank
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#98A2B3]">Account Number</p>
                <p className="mt-1 text-md font-semibold tracking-wide text-[#111827]">
                  0123456789
                </p>
              </div>

              <button className="rounded-lg p-2 text-[#667085] transition hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            <div>
              <p className="text-sm text-[#98A2B3]">Account Name</p>
              <p className="mt-1 text-md font-semibold tracking-tight text-[#111827]">
                Jubly Beauty
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-[#F2F4F7] pt-6">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#D9D6FE] bg-white px-5 py-3 text-xs font-semibold text-[#6D5DFB] transition hover:bg-[#F8F7FF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5h2m-1-1v2m0 12v2m-7-9H3m18 0h-2M5.636 5.636l1.414 1.414m11.314 11.314l-1.414-1.414M5.636 18.364l1.414-1.414m11.314-11.314l-1.414 1.414"
                />
              </svg>
              Update Bank Details
            </button>
          </div>
        </div>
      </div>

      <PayoutSummary />
    </div>
  );
}
