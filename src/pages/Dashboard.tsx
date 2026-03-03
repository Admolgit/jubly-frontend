export default function Dashboard() {
  const stats = [
    { label: "Users", value: 120 },
    { label: "Orders", value: 75 },
    { label: "Revenue", value: "$4,500" },
    { label: "Feedbacks", value: 32 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats cards: responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 bg-white rounded-lg shadow flex flex-col items-center"
          >
            <span className="text-gray-500">{stat.label}</span>
            <span className="text-xl font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-2">
          <li className="border-b py-2">User John Doe logged in</li>
          <li className="border-b py-2">New order #1024 created</li>
          <li className="border-b py-2">Feedback submitted by Alice</li>
          <li className="border-b py-2">User Jane updated profile</li>
        </ul>
      </div>
    </div>
  );
}
