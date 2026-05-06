/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "../../ui/Loader";
import { formatTimeFromISO } from "../../utils/timeFormatter";
import { CalendarDays, ChevronRight } from "lucide-react";

export function TodaySchedule({
  upcomingBookingsData,
  upcomingIsLoading,
}: {
  upcomingBookingsData: any;
  upcomingIsLoading: boolean;
}) {
  const bookings = upcomingBookingsData?.data || [];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
            <CalendarDays className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-semibold text-gray-950">
            Today's Schedule
          </h3>
        </div>

        <span className="text-sm text-purple-600 font-medium">
          {bookings.length} bookings
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 overflow-x-auto">
        {upcomingIsLoading ? (
          <Loader />
        ) : bookings.length === 0 ? (
          <p className="text-sm text-gray-500">No bookings today</p>
        ) : (
          bookings.map((item: any, index: number) => (
            <div
              key={item.id}
              className="flex min-w-[180px] flex-col gap-1 rounded-xl bg-gray-50/80 p-3"
            >
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

              <p className="text-sm text-gray-600 truncate">
                {item.services?.name || "Service"}
              </p>
            </div>
          ))
        )}
        {!upcomingIsLoading && bookings.length > 0 && (
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-purple-600">
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
