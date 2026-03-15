export function Services() {
  const services = [
    { name: "Hair Styling", price: "₦5000", duration: "60 min" },
    { name: "Makeup", price: "₦8000", duration: "90 min" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Services</h1>

      <div className="space-y-3">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-sm text-gray-500">{s.duration}</p>
            </div>
            <p className="font-bold">{s.price}</p>
          </div>
        ))}
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Add Service
      </button>
    </div>
  );
}
