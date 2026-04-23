/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useSetVendorAvailabilityMutation } from "../../features/availability/availability";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAvailability } from "../../features/availability/availabilitySlice";

const days = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export default function VendorAvailability() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [setVendorAvailability, { isLoading }] =
    useSetVendorAvailabilityMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const onSubmit = async (data: any) => {
    if (selectedDays.length === 0) {
      alert("Please select at least one day");
      return;
    }

    try {
      const payload = {
        availabilities: selectedDays.map((day) => ({
          dayOfWeek: day,
          startTime: data.startTime,
          endTime: data.endTime,
        })),
      };

      console.log("Payload:", payload);

      const res = await setVendorAvailability(payload).unwrap();

      dispatch(
        setAvailability({ availability: res.data.updatedAvailabilities }),
      );

      navigate("/vendor-sync");
    } catch (error) {
      console.error("Availability error:", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Set Your Availability</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="py-6">
        {/* Days */}
        <div>
          <p className="font-medium mb-3">Select Available Days</p>

          <div className="grid grid-cols-2 gap-3">
            {days.map((day) => (
              <button
                type="button"
                key={day.value}
                onClick={() => toggleDay(day.value)}
                className={`p-3 rounded-lg border transition ${
                  selectedDays.includes(day.value)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* Start Time */}
        <Input
          label="Start Time"
          type="time"
          {...register("startTime", {
            required: "Start time is required",
          })}
          error={errors.startTime?.message as string}
        />

        {/* End Time */}
        <Input
          label="End Time"
          type="time"
          {...register("endTime", {
            required: "End time is required",
          })}
          error={errors.endTime?.message as string}
        />

        <Button type="submit" disabled={isLoading} className="mt-6">
          {isLoading ? "Saving..." : "Save Availability"}
        </Button>
      </form>
    </div>
  );
}
