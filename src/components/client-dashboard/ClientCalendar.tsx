/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loader from "../ui/Loader";
import { formatDate } from "../utils/dateFormatter";
import { formatTimeFromISO } from "../utils/timeFormatter";
import { useGetClientCalendarListQuery } from "../../features/calendar/calendarAPI";
import React, { useState } from "react";
import { useGetClientUpcomingBookingsQuery } from "../../features/booking/bookingApi";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const now = new Date();

function ClientCalendar() {
  const navigate = useNavigate();
  const [view, setView] = useState("");
  const { data: bookingCalendarData, isLoading: isBookingCalendarLoading } =
    useGetClientCalendarListQuery({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      view: view.trim() === "" ? "month" : view,
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

  console.log({ bookingCalendarData, events });

  const stats = {
    confirmed: events.filter((e) => e.status === "CONFIRMED").length,
    completed: events.filter((e) => e.status === "COMPLETED").length,
    pending: events.filter((e) => e.status === "PENDING").length,
    cancelled: events.filter((e) => e.status === "CANCELLED").length,
  };

  if (isBookingCalendarLoading || vendorUpcomingLoading) {
    return <Loader />;
  }

  return (
    <div className="py-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-950">
          Booking Calendar
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View all your booked sessions in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.8fr] gap-6 pt-6">
        {/* CALENDAR */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 520 }}
            onView={(newView) => {
              setView(newView);
            }}
            onNavigate={(date) => {
              console.log("Current date:", date);
            }}
            eventPropGetter={(event: any) => {
              return {
                style: {
                  backgroundColor:
                    event.status === "CONFIRMED"
                      ? "#7c3aed"
                      : event.status === "COMPLETED"
                        ? "#333333"
                        : event.status === "PENDING"
                          ? "yellow"
                          : "red",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                },
              };
            }}
          />

          {/* FOOTER STATS */}
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span className="text-green-600 font-medium">
              {stats.confirmed} Confirmed
            </span>
            <span className="text-grey-600 font-medium">
              {stats.completed} Completed
            </span>
            <span className="text-amber-500 font-medium">
              {stats.pending} Pending
            </span>
            <span className="text-red-500 font-medium">
              {stats.cancelled} Cancelled
            </span>
            <span className="font-semibold text-gray-800">
              {events.length} Total
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {/* UPCOMING */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Upcoming Bookings</h3>
              <button
                className="text-sm text-purple-600"
                onClick={() => navigate("/client-dashboard/bookings")}
              >
                View all
              </button>
            </div>
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

export default ClientCalendar;
