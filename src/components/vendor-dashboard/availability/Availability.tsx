import { useForm } from "react-hook-form";
import AvailabilitySummary from "./AvailabilitySummary";
import AvailabilityPreview from "./AvilabilityPreview";
import BookingPreferences from "./BookingPreference";
import SaveBar from "./SaveBar";
import WeeklySchedule from "./WeeklySchedule";
import { useState } from "react";
import HelpCard from "./HelpCard";
import { useGetVendorAvailabilityQuery } from "../../../features/availability/availability";
import Loader from "../../ui/Loader";

export default function AvailabilityPage() {
  const { data: availabilityData, isLoading: availabilityLoading} = useGetVendorAvailabilityQuery({})
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const {
    // register,
    // handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm();
  // console.log({ selectedDays });
  const grouped = availabilityData?.data?.grouped || {};

  if (availabilityLoading) {
    return <Loader />
  }
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
            <AvailabilitySummary grouped={grouped} />
            <WeeklySchedule
              onValue={setValue}
              setSelectedDays={setSelectedDays}
              selectedDays={selectedDays}
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <AvailabilityPreview availabilityData={availabilityData} />
            <BookingPreferences />
            <HelpCard />
          </div>
        </div>
      </div>
    );
}
