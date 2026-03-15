export function Clients() {
  const clients = [
    { name: "John Doe", email: "john@email.com", bookings: 3 },
    { name: "Sarah Smith", email: "sarah@email.com", bookings: 1 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Clients</h1>

      <div className="space-y-3">
        {clients.map((c, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">{c.name}</h3>
            <p className="text-sm">{c.email}</p>
            <p className="text-sm text-gray-500">Bookings: {c.bookings}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
