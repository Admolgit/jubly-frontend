export function Bookings() {
  const bookings = [
    {
      id: 1,
      client: "John Doe",
      date: "May 22",
      time: "2pm",
      status: "Confirmed",
    },
    {
      id: 2,
      client: "Sarah Smith",
      date: "May 23",
      time: "11am",
      status: "Pending",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Bookings</h1>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-3">{b.client}</td>
              <td className="p-3">{b.date}</td>
              <td className="p-3">{b.time}</td>
              <td className="p-3">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
