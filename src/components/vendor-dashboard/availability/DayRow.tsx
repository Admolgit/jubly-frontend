// components/availability/DayRow.tsx
import { DeleteIcon, GripVertical } from "lucide-react";
import { useState } from "react";

export default function DayRow({ day }: { day: string }) {
  const [enabled, setEnabled] = useState(
    day !== "Saturday" && day !== "Sunday",
  );
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <GripVertical size={18} />
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        <span className="text-sm font-medium text-gray-900">{day}</span>
      </div>

      {/* RIGHT */}
      {enabled ? (
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          />
          <span className="text-gray-400">—</span>
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          />
          <button className="px-3 py-1 text-xs bg-gray-100 rounded-full">
            <DeleteIcon size={20} />
          </button>
        </div>
      ) : (
        <span className="text-xs text-gray-400">Unavailable</span>
      )}
    </div>
  );
}
