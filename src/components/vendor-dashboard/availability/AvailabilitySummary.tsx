import { CalendarDays } from "lucide-react";

// components/availability/AvailabilitySummary.tsx
export default function AvailabilitySummary() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="rounded-full bg-[#EEEAFC] p-8 text-[#533BD3] ">
          <CalendarDays size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Current Availability
          </p>
          <p className="text-md font-semibold text-gray-900 mt-1">
            Mon – Fri: 9:00 AM – 5:00 PM
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Clients can only book during these hours
          </p>
        </div>
      </div>

      <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
        Active
      </span>
    </div>
  );
}
