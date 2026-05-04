import DayRow from "./DayRow";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklySchedule() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
      <h2 className="text-sm font-medium text-gray-700">Weekly Schedule</h2>

      {days.map((day) => (
        <DayRow key={day} day={day} />
      ))}

      {/* Quick presets */}
      <div className="flex gap-2 pt-4">
        <button className="px-3 py-1 text-xs bg-gray-100 rounded-full">
          Mon–Fri 9–5
        </button>
        <button className="px-3 py-1 text-xs bg-gray-100 rounded-full">
          Clear all
        </button>
      </div>
    </div>
  );
}
