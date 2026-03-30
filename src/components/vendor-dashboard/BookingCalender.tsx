import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "John Doe Booking",
    start: new Date(2026, 3, 20, 14, 0),
    end: new Date(2026, 3, 20, 15, 0),
    status: "Confirmed",
  },
  {
    title: "Sarah Smith Booking",
    start: new Date(2026, 3, 21, 10, 0),
    end: new Date(2026, 3, 21, 11, 0),
    status: "Pending",
  },
  {
    title: "Kemi Lawal Booking",
    start: new Date(2026, 3, 22, 16, 0),
    end: new Date(2026, 3, 22, 17, 0),
    status: "Confirmed",
  },
];

export function BookingCalendar() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Booking Calendar</h1>
          <p className="text-sm text-gray-500">
            View your schedule and manage availability.
          </p>
        </div>
        <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800">
          Sync Calendar
        </button>
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
              {events.map((event, index) => (
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
