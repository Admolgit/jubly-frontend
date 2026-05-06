/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import Button from "../../components/ui/Button";
import { useConnectCalenderMutation } from "../../features/auth/authApi";

export default function GoogleSync() {
    const [connectCalender] = useConnectCalenderMutation();
  
    const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  
    const handleConnect = async () => {
      const response = await connectCalender({
        userId: user?.id,
      }).unwrap();
      if (response.url) {
        window.location.href = response.url;
      }
    };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Sync With Google Calendar</h3>

      <p className="text-gray-600 mb-4">
        Sync your Google Calendar to prevent booking conflicts.
      </p>

      <Button
        onClick={handleConnect}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        Connect Google Calendar
      </Button>
    </div>
  );
}
