/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../ui/Loader";

export function EarningsChart({
  transactionsAnalytics,
  loadingTransactionsAnalyics,
  setChangeView,
}: any) {
  const data = transactionsAnalytics?.data?.data?.map((item: any) => ({
    month: item.label,
    earnings: item.amount,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Earnings</h3>
          <select
            className="text-xs text-gray-500 border border-gray-300 rounded-md px-2 py-1"
            defaultValue={"month"}
            onChange={(e) => {
              setChangeView(e.target.value);
            }}
          >
            <option value="year">This Year</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="day">This Day</option>
          </select>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-semibold text-gray-900">
            NGN {transactionsAnalytics?.data?.total?.toLocaleString() || "0"}
          </p>
        </div>
      </div>
      <div className="mt-4">
        {loadingTransactionsAnalyics ? (
          <Loader />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#1d4ed8"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
