/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "../../ui/Loader";
import { formatTimeFromISO } from "../../utils/timeFormatter";
import { CalendarDays } from "lucide-react";

export function TodaySchedule({
  upcomingBookingsData,
  upcomingIsLoading,
}: {
  upcomingBookingsData: any;
  upcomingIsLoading: boolean;
}) {
  const bookings = upcomingBookingsData?.data || [];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-purple-600 w-5 h-5" />
          <h3 className="text-lg font-semibold">Today's Schedule</h3>
        </div>

        <span className="text-sm text-purple-600 font-medium">
          {bookings.length} bookings
        </span>
      </div>

      {/* CONTENT */}
      <div className="mt-4 flex gap-3 overflow-x-auto">
        {upcomingIsLoading ? (
          <Loader />
        ) : bookings.length === 0 ? (
          <p className="text-sm text-gray-500">No bookings today</p>
        ) : (
          bookings.map((item: any, index: number) => (
            <div
              key={item.id}
              className="min-w-[180px] bg-gray-50 rounded-xl p-3 flex flex-col gap-1"
            >
              {/* TIME */}
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <span
                  className={`w-2 h-2 rounded-full ${
                    index === 0
                      ? "bg-purple-500"
                      : index === 1
                        ? "bg-blue-500"
                        : "bg-pink-500"
                  }`}
                ></span>
                {formatTimeFromISO(item.startTime)}
              </div>

              {/* SERVICE */}
              <p className="text-sm text-gray-600 truncate">
                {item.services?.name || "Service"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
