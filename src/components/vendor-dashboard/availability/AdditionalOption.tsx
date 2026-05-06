// import React from 'react'
import { useForm } from 'react-hook-form';

interface AvailabilityForm {
  startTime: string;
  endTime: string;
  bufferTime: number;
  slotDuration: number;
}

export default function AdditionalOption() {
  const {
    register,
    // handleSubmit,
    // setValue,
    // watch,
    // formState: { errors },
  } = useForm<AvailabilityForm>({
    defaultValues: {
      bufferTime: 15,
      slotDuration: 60,
    },
  });
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Additional Options</h2>

      <div className="space-y-4">
        {/* BUFFER TIME */}
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <p className="font-medium">Buffer time between bookings</p>
            <p className="text-sm text-gray-500">
              Add a gap between appointments
            </p>
          </div>

          <select
            {...register("bufferTime")}
            className="border rounded-lg px-3 py-2"
          >
            <option value={0}>No buffer</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
        </div>

        {/* SLOT DURATION */}
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <p className="font-medium">Slot duration</p>
            <p className="text-sm text-gray-500">
              Set how long each booking slot should be
            </p>
          </div>

          <select
            {...register("slotDuration")}
            className="border rounded-lg px-3 py-2"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={90}>90 minutes</option>
          </select>
        </div>
      </div>
    </div>
  );
}
