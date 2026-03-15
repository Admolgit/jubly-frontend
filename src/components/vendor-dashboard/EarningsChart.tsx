import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function EarningsChart() {
  const data = [
    { month: "Jan", earnings: 20000 },
    { month: "Feb", earnings: 35000 },
    { month: "Mar", earnings: 28000 },
    { month: "Apr", earnings: 50000 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Earnings</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="earnings" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
