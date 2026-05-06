/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useConnectCalenderMutation } from "../../features/auth/authApi";
import Loader from "../ui/Loader";
import { CalendarCheck, CheckCircle2 } from "lucide-react";

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
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-yellow-400 to-green-500 text-white">
          <CalendarCheck className="h-6 w-6" />
        </div>

        <div className="min-w-0">
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

      {isLoading ? (
        <Loader />
      ) : connected ? (
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          <CheckCircle2 className="h-4 w-4 fill-green-600 text-white" />
          Connected
        </span>
      ) : (
        <button
          onClick={handleConnect}
          className="shrink-0 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          Connect
        </button>
      )}
    </div>
  );
}
