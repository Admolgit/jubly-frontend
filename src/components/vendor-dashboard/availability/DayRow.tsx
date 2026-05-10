/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Trash2, GripVertical } from "lucide-react";

type Props = {
  day: string;
  dayIndex: number;
  onToggle: (day: number) => void;
  selectedDays: number[];
  onTimeChange?: (day: number, start: string, end: string) => void;
  setStartTime?: any;
  setEndTime?: any;
  startTime: string;
  endTime: string;
};

export default function DayRow({
  day,
  dayIndex,
  onToggle,
  selectedDays,
  onTimeChange,
  startTime,
  endTime,
}: Props) {
  const isActive = selectedDays?.includes(dayIndex);

  const handleStartChange = (value: string) => {
    onTimeChange?.(dayIndex, value, endTime);
  };

  const handleEndChange = (value: string) => {
    onTimeChange?.(dayIndex, startTime, value);
  };

  const handleToggle = () => {
    onToggle(dayIndex);

    if (!isActive) {
      onTimeChange?.(dayIndex, startTime, endTime);
    }
  };

  const handleDelete = () => {
    if (isActive) onToggle(dayIndex);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer
      ${isActive ? "bg-blue-50 border-blue-300" : "border-gray-200 hover:bg-gray-50"}
    `}
    >
      <div className="flex items-center gap-3">
        <GripVertical size={16} className="text-gray-400" />

        <input type="checkbox" checked={isActive} onChange={handleToggle} />

        <span className="text-sm font-medium text-gray-900">{day}</span>
      </div>

      {isActive ? (
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={startTime}
            onChange={(e) => handleStartChange(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          />

          <span>—</span>

          <input
            type="time"
            value={endTime}
            onChange={(e) => handleEndChange(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          />

          <button onClick={handleDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <span className="text-xs text-gray-400">Unavailable</span>
      )}
    </div>
  );
}