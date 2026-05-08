// components/availability/AvailabilityPreview.tsx
import { Info } from "lucide-react";
import { DayPreviewRow } from "./DayPreviewRow";

const daysMap = [
  { key: 1, label: "Mon" },
  { key: 2, label: "Tue" },
  { key: 3, label: "Wed" },
  { key: 4, label: "Thu" },
  { key: 5, label: "Fri" },
  { key: 6, label: "Sat" },
  { key: 0, label: "Sun" },
];

type Props = {
  availabilityData?: {
    data?: {
      grouped?: Record<
        number,
        {
          startTime: string;
          endTime: string;
        }[]
      >;
    };
  };
};

export default function AvailabilityPreview({ availabilityData }: Props) {
  const grouped = availabilityData?.data?.grouped || {};

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Availability Preview
      </h3>

      {/* Days */}
      <div className="space-y-3">
        {daysMap.map((day) => {
          const slots = grouped[day.key] || [];
          return (
            <DayPreviewRow
              key={day.label}
              label={day.label}
              active={slots.length > 0}
              slots={slots}
            />
          );
        })}
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
