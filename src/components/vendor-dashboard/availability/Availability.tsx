import { useForm } from "react-hook-form";
import AvailabilitySummary from "./AvailabilitySummary";
import AvailabilityPreview from "./AvilabilityPreview";
import BookingPreferences from "./BookingPreference";
import SaveBar from "./SaveBar";
import WeeklySchedule from "./WeeklySchedule";
import { useState } from "react";
import HelpCard from "./HelpCard";

export default function AvailabilityPage() {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const {
    // register,
    // handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm();
  console.log({ selectedDays });
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Availability</h1>
          <p className="text-sm text-gray-500">
            Set when clients can book your services
          </p>
        </div>

        <SaveBar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <AvailabilitySummary />
          <WeeklySchedule
            onValue={setValue}
            setSelectedDays={setSelectedDays}
          />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <AvailabilityPreview />
          <BookingPreferences />
          <HelpCard />
        </div>
      </div>
    </div>
  );
}
