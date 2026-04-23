/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loader from "../ui/Loader";
import { formatDate } from "../utils/dateFormatter";
import { formatTimeFromISO } from "../utils/timeFormatter";
import { useGetClientCalendarListQuery } from "../../features/calendar/calendarAPI";
import React from "react";
import { useGetClientUpcomingBookingsQuery } from "../../features/booking/bookingApi";

const localizer = momentLocalizer(moment);

const now = new Date();

export function ClientCalendar() {
  const { data: bookingCalendarData, isLoading: isBookingCalendarLoading } =
    useGetClientCalendarListQuery({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    });
  const { data: vendorUpcomingData, isLoading: vendorUpcomingLoading } =
    useGetClientUpcomingBookingsQuery({});
  const upcomingList = vendorUpcomingData?.data || [];

  const events = React.useMemo(() => {
    if (!bookingCalendarData?.data?.calendar) return [];

    return Object.values(bookingCalendarData.data.calendar)
      .flat()
      .map((booking: any) => ({
        title: booking.customer || "Booking",
        start: new Date(booking.startTime),
        end: new Date(booking.endTime),
        status: booking.status,
      }));
  }, [bookingCalendarData]);

  if (isBookingCalendarLoading || vendorUpcomingLoading) {
    return <Loader />;
  }

  return (
    <div className="py-6">
      <div>
        <h1 className="text-2xl font-semibold">Booking Calendar</h1>
        <p className="text-sm text-gray-500">
          View all your booked sessions in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 520 }}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Upcoming Bookings</h3>
            <div className="mt-4 space-y-3">
              {upcomingList.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming bookings.</p>
              ) : (
                upcomingList.map((booking: any) => (
                  <div
                    key={booking.id}
                    className="rounded-xl border border-gray-100 p-3"
                  >
                    <p className="text-sm font-semibold text-gray-900">
                      {booking?.services?.name || "Service"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(booking?.vendor?.businessName ||
                        booking?.vendorName ||
                        "Vendor") +
                        " • " +
                        formatDate(booking.date, "DD/MM/YYYY")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeFromISO(booking.startTime as string)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Legend</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Confirmed
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Pending
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Cancelled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
