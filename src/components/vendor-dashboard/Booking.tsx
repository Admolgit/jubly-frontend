
const statusStyles: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

export function Bookings() {
  const bookings = [
    {
      id: 1,
      client: "John Doe",
      service: "Bridal Makeup",
      date: "May 22, 2026",
      time: "2:00 PM",
      amount: "NGN 12,000",
      status: "Confirmed",
    },
    {
      id: 2,
      client: "Sarah Smith",
      service: "Hair Styling",
      date: "May 23, 2026",
      time: "11:00 AM",
      amount: "NGN 8,000",
      status: "Pending",
    },
    {
      id: 3,
      client: "Jane Kim",
      service: "Natural Glam",
      date: "May 24, 2026",
      time: "4:30 PM",
      amount: "NGN 10,000",
      status: "Cancelled",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <p className="text-sm text-gray-500">
            Track upcoming and past appointments.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Export
          </button>
          <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800">
            New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Bookings</p>
          <p className="mt-2 text-xl font-semibold">124</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Upcoming</p>
          <p className="mt-2 text-xl font-semibold">18</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">This Month Revenue</p>
          <p className="mt-2 text-xl font-semibold">NGN 420,000</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700">
              All
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600">
              Upcoming
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600">
              Completed
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600">
              Cancelled
            </button>
          </div>
          <input
            placeholder="Search bookings"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:w-64"
          />
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="text-xs uppercase text-gray-400">
              <tr className="border-b">
                <th className="px-3 py-3">Client</th>
                <th className="px-3 py-3">Service</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Time</th>
                <th className="px-3 py-3">Amount</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {bookings.map((b) => (
                <tr key={b.id} className="border-b last:border-b-0">
                  <td className="px-3 py-4 font-medium text-gray-900">
                    {b.client}
                  </td>
                  <td className="px-3 py-4 text-gray-600">{b.service}</td>
                  <td className="px-3 py-4 text-gray-600">{b.date}</td>
                  <td className="px-3 py-4 text-gray-600">{b.time}</td>
                  <td className="px-3 py-4 font-semibold text-gray-900">
                    {b.amount}
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[b.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <button className="text-sm font-semibold text-blue-700 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
