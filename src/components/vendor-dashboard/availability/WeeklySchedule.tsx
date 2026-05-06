/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DayRow from "./DayRow";
import AdditionalOption from "./AdditionalOption";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeeklySchedule({ onValue, setSelectedDays, selectedDays }: any) {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  console.log(setActivePreset);

  const applyPreset = (type: "weekday" | "weekPlusSaturday") => {
    if (type === "weekday") {
      setSelectedDays([1, 2, 3, 4, 5]);

      onValue("startTime", "09:00");
      onValue("endTime", "17:00");
    }

    if (type === "weekPlusSaturday") {
      setSelectedDays([1, 2, 3, 4, 5, 6]);

      onValue("startTime", "10:00");
      onValue("endTime", "18:00");
    }
  };

  const clearAll = () => {
    setSelectedDays([]);
    onValue("startTime", "");
    onValue("endTime", "");
  };

  const toggleDay = (day: number) => {
    setSelectedDays((prev: any) =>
      prev?.includes(day) ? prev?.filter((d: any) => d !== day) : [...prev, day],
    );
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-700">Weekly Schedule</h2>

        {days?.map((day, index) => (
          <DayRow
            key={day}
            day={day}
            dayIndex={index + 1} // 1 = Monday, etc.
            onToggle={toggleDay}
            selectedDays={selectedDays}
          />
        ))}

        {/* Quick presets */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="font-semibold text-lg">Quick Setups</h3>
          <p className="text-sm text-gray-500 mb-4">
            Use a preset to quickly set your availability.
          </p>

          <div className="flex flex-wrap gap-3">
            {/* Mon - Fri */}
            <button
              type="button"
              onClick={() => applyPreset("weekday")}
              className={`px-4 py-2 rounded-lg border ${
                activePreset === "weekday" ? "bg-blue-500 text-white" : ""
              }`}
            >
              📅 Mon – Fri (9AM – 5PM)
            </button>

            {/* Mon - Sat */}
            <button
              type="button"
              onClick={() => applyPreset("weekPlusSaturday")}
              className={`px-4 py-2 rounded-lg border ${
                activePreset === "weekday" ? "bg-blue-500 text-white" : ""
              }`}
            >
              📅 Mon – Sat (10AM – 6PM)
            </button>

            {/* Clear */}
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition"
            >
              🗑 Clear All
            </button>
          </div>
        </div>
      </div>
      <AdditionalOption />
    </>
  );
}
