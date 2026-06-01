import { CalendarDays, Clock, Globe } from "lucide-react";
import PreferenceItem from "./PreferenceItem";

export default function BookingPreferences() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm dark:bg-black">
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 mb-4 dark:text-white">
        Booking Preferences
      </h3>

      <div className="space-y-4">
        {/* Advance Notice */}
        <PreferenceItem
          icon={<CalendarDays size={18} />}
          title="Advance Notice"
          description="Clients can book up to 30 days in advance"
        />

        {/* Minimum Notice */}
        <PreferenceItem
          icon={<Clock size={18} />}
          title="Minimum Notice"
          description="Clients must book at least 2 hours in advance"
        />

        {/* Timezone */}
        <PreferenceItem
          icon={<Globe size={18} />}
          title="Timezone"
          description="(GMT+01:00) West Africa Time"
        />
      </div>
    </div>
  );
}
