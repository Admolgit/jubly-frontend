/* eslint-disable react-hooks/exhaustive-deps */
// components/availability/DayRow.tsx
import { Trash2, GripVertical } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  day: string;
  dayIndex: number;
  onToggle: (day: number) => void;
  selectedDays: number[];
  onTimeChange?: (day: number, start: string, end: string) => void;
};

export default function DayRow({
  day,
  dayIndex,
  onToggle,
  selectedDays,
  onTimeChange,
}: Props) {
  const isActive = selectedDays?.includes(dayIndex);

  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");

  // Sync time with parent if needed
  useEffect(() => {
    if (isActive && onTimeChange) {
      onTimeChange(dayIndex, start, end);
    }
  }, [start, end, isActive]);

  const handleToggle = () => {
    onToggle(dayIndex);
  };

  const handleDelete = () => {
    // remove the day completely
    if (isActive) {
      onToggle(dayIndex);
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer
        ${isActive ? "bg-blue-50 border-blue-300" : "border-gray-200 hover:bg-gray-50"}
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <GripVertical size={16} className="text-gray-400" />

        <input type="checkbox" checked={isActive} onChange={handleToggle} />

        <span className="text-sm font-medium text-gray-900">{day}</span>
      </div>

      {/* RIGHT */}
      {isActive ? (
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <span className="text-gray-400">—</span>

          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <span className="text-xs text-gray-400">Unavailable</span>
      )}
    </div>
  );
}