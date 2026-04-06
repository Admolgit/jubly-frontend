/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  useGetCalendarLinkedQuery,
  useGetCalendarListQuery,
} from "../../features/calendar/calendarAPI";
import { useSelector } from "react-redux";
import React from "react";
import { useConnectCalenderMutation } from "../../features/auth/authApi";
import Loader from "../ui/Loader";

const localizer = momentLocalizer(moment);

export function BookingCalendar() {
  const vendor = useSelector(
    (state: { vendor: { vendor: any } }) => state.vendor.vendor,
  );
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const now = new Date();

  const { data: bookingCalendarData, isLoading: isBookingCalendarLoading } =
    useGetCalendarListQuery({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      vendorId: vendor.id,
    });
  const [connectCalender] = useConnectCalenderMutation();
  const { data: calendarLinkedData, isLoading: calendarLinkedLoading } =
    useGetCalendarLinkedQuery(vendor?.userId, {
      skip: !vendor?.userId,
    });

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

  const handleConnect = async () => {
    const response = await connectCalender({
      userId: user?.id,
    }).unwrap();
    if (response.url) {
      window.location.href = response.url;
    }
  };

  console.log({ calendarLinkedData, bookingCalendarData });
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Booking Calendar</h1>
          <p className="text-sm text-gray-500">
            View your schedule and manage availability.
          </p>
        </div>
        {calendarLinkedLoading ? (
          <Loader />
        ) : calendarLinkedData?.data?.linked?.linked ? (
          <button
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
          >
            Calendar Synced
          </button>
        ) : (
          <button
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
            onClick={handleConnect}
          >
            Sync Calendar
          </button>
        )}
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
              {events.slice(0, 5).map((event, index) => (
                <div
                  key={`${event.title}-${index}`}
                  className="rounded-xl border border-gray-100 p-3"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {moment(event.start).format("ddd, MMM D - h:mm A")}
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {event.status}
                  </span>
                </div>
              ))}
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
