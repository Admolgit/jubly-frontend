export function CalendarSyncStatus() {
  const connected = true;

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Google Calendar</h3>
        <p className="text-sm text-gray-500">
          {connected ? "Calendar Connected" : "Not Connected"}
        </p>
      </div>

      {connected ? (
        <span className="text-green-600 font-semibold">● Connected</span>
      ) : (
        <a
          href="/api/v1/google/auth"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Connect
        </a>
      )}
    </div>
  );
}
