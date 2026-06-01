type Props = {
  label: string;
  active: boolean;
  slots?: {
    startTime: string;
    endTime: string;
  }[];
};

export function DayPreviewRow({ label, active, slots = [] }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            active ? "bg-green-500" : "bg-gray-300"
          }`}
        />

        <span className="text-sm font-medium text-gray-800 dark:text-white">{label}</span>
      </div>

      <div className="text-sm text-gray-500">
        {active ? (
          <div className="flex flex-col items-end">
            {slots.map((slot, index) => (
              <span key={index}>
                {slot.startTime} - {slot.endTime}
              </span>
            ))}
          </div>
        ) : (
          "Unavailable"
        )}
      </div>
    </div>
  );
}
