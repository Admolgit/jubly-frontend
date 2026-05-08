/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DayRow from "./DayRow";
import AdditionalOption from "./AdditionalOption";

const days = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 0 },
];

export default function WeeklySchedule({
  onValue,
  setSelectedDays,
  selectedDays,
}: any) {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [activePresetOne, setActivePresetOne] = useState<string | null>(null);
  console.log(setActivePreset);

  const applyPreset = (type: "weekday") => {
    setActivePreset(type);

    if (type === "weekday") {
      // Mon → Fri
      setSelectedDays([1, 2, 3, 4, 5, 6]);

      onValue("startTime", "09:00");
      onValue("endTime", "17:00");
    }
  };

  const applyPresetOne = (type: "weekPlusSunday") => {
    setActivePresetOne(type);

    if (type === "weekPlusSunday") {
      // Mon → Sat
      setSelectedDays([0, 2, 3, 4, 5, 6]);

      onValue("startTime", "10:00");
      onValue("endTime", "18:00");
    }
  };

  const clearAll = () => {
    setSelectedDays([]);
    setActivePreset("");
    setActivePresetOne("");
    onValue("startTime", "");
    onValue("endTime", "");
  };

  const toggleDay = (day: number) => {
    const current = selectedDays || [];

    const exists = current.includes(day);

    if (exists) {
      setSelectedDays(current.filter((d: number) => d !== day));
    } else {
      setSelectedDays([...current, day]);
    }
  };

  const handleTimeChange = (day: number, start: string, end: string) => {
    onValue("availabilities", (prev: any[] = []) => {
      const filtered = prev.filter((item) => item.dayOfWeek !== day);

      return [
        ...filtered,
        {
          dayOfWeek: day,
          startTime: start,
          endTime: end,
        },
      ];
    });
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-700">Weekly Schedule</h2>

        {days.map((day) => (
          <DayRow
            key={day.value}
            day={day.label}
            dayIndex={day.value}
            onToggle={toggleDay}
            selectedDays={selectedDays}
            onTimeChange={handleTimeChange}
          />
        ))}

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h3 className="font-semibold text-lg">Quick Setups</h3>
          <p className="text-sm text-gray-500 mb-4">
            Use a preset to quickly set your availability.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => applyPreset("weekday")}
              className={`px-4 py-2 rounded-lg border ${
                activePreset === "weekday" ? "bg-blue-500 text-white" : ""
              }`}
            >
              📅 Mon – Saturday (9AM – 5PM)
            </button>

            <button
              type="button"
              onClick={() => applyPresetOne("weekPlusSunday")}
              className={`px-4 py-2 rounded-lg border ${
                activePresetOne === "weekPlusSunday"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              📅 Tuesday – Sunday (10AM – 6PM)
            </button>

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
