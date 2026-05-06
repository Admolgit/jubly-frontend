// components/availability/DayPreviewRow.tsx
export function DayPreviewRow({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Status dot */}
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            active ? "bg-green-500" : "bg-gray-300"
          }`}
        />

        {/* Day */}
        <span className="text-gray-700 font-medium">{label}</span>
      </div>

      {/* RIGHT */}
      {active ? (
        <span className="text-gray-900 font-medium">9:00 AM – 5:00 PM</span>
      ) : (
        <span className="text-gray-400">Unavailable</span>
      )}
    </div>
  );
}
