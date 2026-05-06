/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loader from "../ui/Loader";

export function EarningsChart({
  transactionsAnalytics,
  loadingTransactionsAnalyics,
  setChangeView,
}: {
  transactionsAnalytics: any;
  loadingTransactionsAnalyics: boolean;
  setChangeView: (value: any) => void;
}) {
  const data =
    transactionsAnalytics?.data?.data?.map(
      (item: { label: string; amount: number }) => ({
        month: item.label,
        earnings: item.amount,
      }),
    ) || [];
  const total = transactionsAnalytics?.data?.total || 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-950">
            Earnings Overview
          </h3>
          <select
            className="mt-4 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100"
            defaultValue="month"
            onChange={(e) => {
              setChangeView(e.target.value);
            }}
          >
            <option value="year">This Year</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="day">Today</option>
          </select>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="mt-1 text-2xl font-bold text-purple-600">
            ₦{total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6">
        {loadingTransactionsAnalyics ? (
          <Loader />
        ) : total === 0 ? (
          <div className="flex h-[260px] items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-500">
            No analytics to display yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={data}
              margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="earningsLine" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#475569", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#475569", fontSize: 12 }}
                tickFormatter={(value) =>
                  Number(value) >= 1000 ? `${Number(value) / 1000}K` : value
                }
              />
              <Tooltip
                formatter={(value) => [`₦${Number(value).toLocaleString()}`, "Earnings"]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #ede9fe",
                  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
                }}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#6d28d9"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: "#ffffff" }}
                activeDot={{ r: 6, fill: "#6d28d9" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
