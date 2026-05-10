/* eslint-disable @typescript-eslint/no-explicit-any */
import AvailabilitySummary from "./AvailabilitySummary";
import AvailabilityPreview from "./AvilabilityPreview";
import BookingPreferences from "./BookingPreference";
import SaveBar from "./SaveBar";
import WeeklySchedule from "./WeeklySchedule";
import { useState } from "react";
import HelpCard from "./HelpCard";
import { useGetVendorAvailabilityQuery } from "../../../features/availability/availability";
import Loader from "../../ui/Loader";
import { useSetVendorAvailabilityMutation } from "../../../features/vendor/vendorApi";
import { setAvailability } from "../../../features/availability/availabilitySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function AvailabilityPage() {
  const dispatch = useDispatch();
  const {
    data: availabilityData,
    refetch,
    isLoading: availabilityLoading,
  } = useGetVendorAvailabilityQuery({});
  const [setVendorAvalaibility, { isLoading: setAvailabilityLoading }] =
    useSetVendorAvailabilityMutation();
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [availabilities, setAvailabilities] = useState<any[]>([]);
  const grouped = availabilityData?.data?.grouped || {};

  const onSubmit = async () => {
    const safeAvailability = Array.isArray(availabilities)
      ? availabilities
      : [];

    const payload = {
      availabilities: selectedDays.map((day: number) => {
        const availability = safeAvailability.find(
          (item: any) => item.dayOfWeek === day,
        );

        return {
          dayOfWeek: day,
          startTime: availability?.startTime || "09:00",
          endTime: availability?.endTime || "17:00",
        };
      }),
    };

    const res = await setVendorAvalaibility(payload);

    dispatch(setAvailability({ availability: res.data.updatedAvailabilities }));

    toast.success("Availability updated successfully.");
    refetch();
  };

  if (availabilityLoading) {
    return <Loader />;
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

        <div onClick={onSubmit}>
          <SaveBar loading={setAvailabilityLoading} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <AvailabilitySummary grouped={grouped} />
          <WeeklySchedule
            onValue={(key: string, value: any) => {
              if (key === "availabilities") {
                setAvailabilities(value);
              }
            }}
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
