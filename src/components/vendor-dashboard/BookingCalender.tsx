/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../ui/Loader";

import {
  useGetCalendarLinkedQuery,
  useGetCalendarListQuery,
} from "../../features/calendar/calendarAPI";
import { useConnectCalenderMutation } from "../../features/auth/authApi";
import { useGetVendorUpcomingBookingsQuery } from "../../features/booking/bookingApi";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

export function BookingCalendar() {
  const navigate = useNavigate();
  const vendor = useSelector((state: any) => state.vendor.vendor);
  const user = useSelector((state: any) => state.auth.user);
  const now = new Date();
  const [view, setView] = useState("");

  const { data: bookingCalendarData, isLoading } = useGetCalendarListQuery(
    {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      vendorId: vendor?.id,
      view: view.trim() === "" ? "month" : view,
    },
    {
      skip: !vendor?.id,
    },
  );

  const { data: vendorUpcomingData, isLoading: upcomingLoading } =
    useGetVendorUpcomingBookingsQuery({});

  const { data: calendarLinkedData, isLoading: linkedLoading } =
    useGetCalendarLinkedQuery(vendor?.userId, {
      skip: !vendor?.userId,
    });

  const [connectCalender] = useConnectCalenderMutation();

  const events = React.useMemo(() => {
    if (!bookingCalendarData?.data?.calendar) return [];
    return Object.values(bookingCalendarData.data.calendar)
      .flat()
      .map((b: any) => ({
        title: b.customer || "Booking",
        start: new Date(b.startTime),
        end: new Date(b.endTime),
        status: b.status,
      }));
  }, [bookingCalendarData]);

  console.log({ event });

  const upcomingEvents = React.useMemo(() => {
    if (!vendorUpcomingData?.data) return [];
    return Object.values(vendorUpcomingData.data)
      .flat()
      .map((b: any) => ({
        title: b.services.name || "Booking",
        service: b.clientName || "Service",
        start: new Date(b.startTime),
        status: b.status,
        duration: b.services.durationMins,
      }));
  }, [vendorUpcomingData]);

  const handleConnect = async () => {
    const res = await connectCalender({ userId: user?.id }).unwrap();
    if (res.url) window.location.href = res.url;
  };

  if (isLoading) return <Loader />;

  const stats = {
    confirmed: events.filter((e) => e.status === "CONFIRMED").length,
    completed: events.filter((e) => e.status === "COMPLETED").length,
    pending: events.filter((e) => e.status === "PENDING").length,
    cancelled: events.filter((e) => e.status === "CANCELLED").length,
  };

  return (
    <div className="bg-gray-50 py-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Booking Calendar</h1>
          <p className="mt-1 text-sm text-gray-500">
            View your schedule and manage availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {linkedLoading ? (
            <Loader />
          ) : calendarLinkedData?.data?.linked?.linked ? (
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
              Calendar Synced
            </button>
          ) : (
            <button
              onClick={handleConnect}
              className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50"
            >
              Sync Calendar
            </button>
          )}
        </div>
      </div>

      {/* MAIN GRID */}
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

        {/* SIDEBAR */}
        <div className="space-y-4">
          {/* UPCOMING */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Upcoming Bookings</h3>
              <button
                className="text-sm text-purple-600"
                onClick={() => navigate("/dashboard/bookings")}
              >
                View all
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {upcomingLoading ? (
                <Loader />
              ) : (
                upcomingEvents?.map((b, i) => (
                  <div
                    key={i}
                    className="p-3 border rounded-xl flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm">{b.title}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          b.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : b.status === "PENDING"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{b.service}</p>
                    <p className="text-xs text-gray-400">
                      {moment(b.start).format("MMM D, YYYY • h:mm A")}{" "}
                      <span> • {b.duration} mins</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* LEGEND */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-3">Calendar Legend</h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Confirmed Booking
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Pending Booking
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Cancelled Booking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
