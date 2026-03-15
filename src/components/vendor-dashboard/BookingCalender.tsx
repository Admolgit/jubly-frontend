import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export function BookingCalendar() {
  const events = [
    {
      title: "John Doe Booking",
      start: new Date(2026, 3, 20, 14, 0),
      end: new Date(2026, 3, 20, 15, 0),
    },
    {
      title: "Sarah Smith Booking",
      start: new Date(2026, 3, 21, 10, 0),
      end: new Date(2026, 3, 21, 11, 0),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Booking Calendar</h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
