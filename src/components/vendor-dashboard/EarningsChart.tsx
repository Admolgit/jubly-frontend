import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function EarningsChart() {
  const data = [
    { month: "Jan", earnings: 20000 },
    { month: "Feb", earnings: 35000 },
    { month: "Mar", earnings: 28000 },
    { month: "Apr", earnings: 50000 },
    { month: "May", earnings: 42000 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Earnings</h3>
          <p className="text-xs text-gray-500">Last 5 months</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-semibold text-gray-900">NGN 175,000</p>
        </div>
      </div>
      <div className="mt-4">
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
      </div>
    </div>
  );
}
