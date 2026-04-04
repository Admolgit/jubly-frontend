/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useConnectCalenderMutation } from "../../features/auth/authApi";
import Loader from "../ui/Loader";

export function CalendarSyncStatus({ data, isLoading }: { data: any; isLoading: boolean }) {
  const connected = data?.data?.linked.linked || false;
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
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold">Google Calendar</h3>
        <p className="text-sm text-gray-500">
          {isLoading ? (
            <Loader />
          ) : connected ? (
            "Calendar Connected"
          ) : (
            "Not Connected"
          )}
        </p>
      </div>

      {isLoading ? (
        <Loader />
      ) : connected ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Connected
        </span>
      ) : (
        <button
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
          onClick={handleConnect}
        >
          Connect
        </button>
      )}
    </div>
  );
}
