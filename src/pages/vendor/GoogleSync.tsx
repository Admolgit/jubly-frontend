import Button from "../../components/ui/Button";

export default function GoogleSync() {
  const connectGoogle = () => {
    window.location.href = "http://localhost:4001/api/v1/google/calendar";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Sync With Google Calendar</h3>

      <p className="text-gray-600 mb-4">
        Sync your Google Calendar to prevent booking conflicts.
      </p>

      <Button
        onClick={connectGoogle}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        Connect Google Calendar
      </Button>
    </div>
  );
}
