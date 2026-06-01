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

  // 👇 single UI source of truth
  const [availabilityByDay, setAvailabilityByDay] = useState<any>({});

  // -------------------------
  // PRESET 1
  // -------------------------
  const applyPreset = () => {
    setActivePreset("weekday");

    const selected = [1, 2, 3, 4, 5, 6]; // Mon–Sat
    setSelectedDays(selected);

    const newAvailabilities = selected.map((day) => ({
      dayOfWeek: day,
      startTime: "09:00",
      endTime: "17:00",
    }));

    const mapped = Object.fromEntries(
      newAvailabilities.map((a) => [a.dayOfWeek, a]),
    );

    setAvailabilityByDay(mapped);
    onValue("availabilities", newAvailabilities);
  };

  // -------------------------
  // PRESET 2
  // -------------------------
  const applyPresetOne = () => {
    setActivePresetOne("weekPlusSunday");

    const selected = [0, 2, 3, 4, 5, 6]; // Tue–Sun
    setSelectedDays(selected);

    const newAvailabilities = selected.map((day) => ({
      dayOfWeek: day,
      startTime: "10:00",
      endTime: "18:00",
    }));

    const mapped = Object.fromEntries(
      newAvailabilities.map((a) => [a.dayOfWeek, a]),
    );

    setAvailabilityByDay(mapped);
    onValue("availabilities", newAvailabilities);
  };

  // -------------------------
  // CLEAR ALL
  // -------------------------
  const clearAll = () => {
    setSelectedDays([]);
    setActivePreset(null);
    setActivePresetOne(null);
    setAvailabilityByDay({});
    onValue("availabilities", []);
  };

  // -------------------------
  // TOGGLE DAY
  // -------------------------
  const toggleDay = (day: number) => {
    const current = selectedDays || [];

    const exists = current.includes(day);

    const updated = exists
      ? current.filter((d: number) => d !== day)
      : [...current, day];

    setSelectedDays(updated);
  };

  // -------------------------
  // UPDATE TIME PER DAY
  // -------------------------
  const handleTimeChange = (day: number, start: string, end: string) => {
    setAvailabilityByDay((prev: any) => ({
      ...prev,
      [day]: {
        startTime: start,
        endTime: end,
      },
    }));

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

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 dark:bg-black">
        <h2 className="text-sm font-medium text-gray-700">Weekly Schedule</h2>

        {days.map((day) => {
          const dayTime = availabilityByDay[day.value];

          return (
            <DayRow
              key={day.value}
              day={day.label}
              dayIndex={day.value}
              startTime={dayTime?.startTime || ""}
              endTime={dayTime?.endTime || ""}
              onToggle={toggleDay}
              selectedDays={selectedDays}
              onTimeChange={handleTimeChange}
            />
          );
        })}

        {/* ---------------- QUICK SETUPS ---------------- */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 dark:bg-black">
          <h3 className="font-semibold text-lg">Quick Setups</h3>
          <p className="text-sm text-gray-500 mb-4">
            Use a preset to quickly set your availability.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={applyPreset}
              className={`px-4 py-2 rounded-lg border ${
                activePreset === "weekday" ? "bg-blue-500 text-white" : ""
              }`}
            >
              📅 Mon – Saturday (9AM – 5PM)
            </button>

            <button
              type="button"
              onClick={applyPresetOne}
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
