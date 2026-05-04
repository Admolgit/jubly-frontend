/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useConnectCalenderMutation } from "../../features/auth/authApi";
import Loader from "../ui/Loader";
import { CalendarCheck } from "lucide-react";

export function CalendarSyncStatus({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  const connected = data?.data?.linked?.linked || false;
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
    <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* ICON */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
          <CalendarCheck className="text-blue-600 w-6 h-6" />
        </div>

        {/* TEXT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Google Calendar
          </h3>
          <p className="text-sm text-gray-500">
            {isLoading
              ? "Checking..."
              : connected
                ? "Calendar Connected"
                : "Not Connected"}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      {isLoading ? (
        <Loader />
      ) : connected ? (
        <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Connected
        </span>
      ) : (
        <button
          onClick={handleConnect}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Connect
        </button>
      )}
    </div>
  );
}
