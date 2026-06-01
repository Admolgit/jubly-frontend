/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  useBufferVendorAvailabilityMutation,
  useGetBufferVendorAvailabilityQuery,
} from "../../../features/availability/availability";
import toast from "react-hot-toast";

interface AvailabilityForm {
  bufferTime: number;
  slotDuration: number;
}

export default function AdditionalOption() {
  const { data: availabilityData } = useGetBufferVendorAvailabilityQuery({});

  const [bufferVendorAvailability, { isLoading: buffering }] =
    useBufferVendorAvailabilityMutation();

  const existingBuffer = availabilityData?.data?.bufferTime;

  const { register, watch, setValue } = useForm<AvailabilityForm>({
    defaultValues: {
      bufferTime: existingBuffer,
      slotDuration: 90,
    },
  });
  
  const bufferTime = watch("bufferTime");

  const firstRender = useRef(true);

  useEffect(() => {

    if (bufferTime === undefined) {
      setValue("bufferTime", existingBuffer);
    }
  }, [availabilityData, setValue]);

  useEffect(() => {
    // skip initial render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const updateBuffer = async () => {
      try {
        const res = await bufferVendorAvailability({
          bufferTime: Number(bufferTime),
        }).unwrap();
        toast.success(res?.message);
      } catch (error) {
        console.error("Failed to update buffer time", error);
      }
    };

    if (bufferTime !== undefined) {
      updateBuffer();
    }
  }, [bufferTime, bufferVendorAvailability]);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6 dark:bg-black">
      <h2 className="text-lg font-semibold mb-4">Additional Options</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <p className="font-medium">Buffer time between bookings</p>

            <p className="text-sm text-gray-500">
              Add a gap between appointments
            </p>
          </div>

          <div className="flex items-center gap-3">
            {buffering && (
              <span className="text-xs text-blue-500">Saving...</span>
            )}

            <select
              {...register("bufferTime")}
              className="border rounded-lg px-3 py-2"
            >
              <option value={0}>No buffer</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
        </div>
        
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
