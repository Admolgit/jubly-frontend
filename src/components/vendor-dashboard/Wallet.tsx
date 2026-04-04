import { StatCard } from "./StatCard";

export function Wallet() {
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
        <StatCard title="Total Earned" value="NGN 1,200,000" />
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
    </div>
  );
}
