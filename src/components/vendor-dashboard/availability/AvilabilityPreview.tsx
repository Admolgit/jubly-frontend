// components/availability/AvailabilityPreview.tsx
import { Info } from "lucide-react";
import { DayPreviewRow } from "./DayPreviewRow";

const days = [
  { label: "Mon", active: true },
  { label: "Tue", active: true },
  { label: "Wed", active: true },
  { label: "Thu", active: true },
  { label: "Fri", active: true },
  { label: "Sat", active: false },
  { label: "Sun", active: false },
];

export default function AvailabilityPreview() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Availability Preview
      </h3>

      {/* Days */}
      <div className="space-y-3">
        {days.map((day) => (
          <DayPreviewRow key={day.label} {...day} />
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-5 flex gap-3 items-start p-4 rounded-xl bg-indigo-50 border border-indigo-100">
        <div className="mt-0.5">
          <Info size={16} className="text-indigo-500" />
        </div>
        <p className="text-xs text-indigo-700 leading-relaxed">
          Clients will only see available time slots based on this schedule.
        </p>
      </div>
    </div>
  );
}
