/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CalendarDays,
  Clock3,
  MessageSquareText,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

const bookingSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  service: z.string().min(1, "Service is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm({
  setBookingOpen,
  handleCreateBooking,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    const dateTime = new Date(`${data.date}T${data.time}`);

    handleCreateBooking({
      ...data,
      dateTime,
    });
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-gray-100 px-8 py-0 md:py-4 lg:py-4">
        <div className="flex items-start gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
            <CalendarDays className="h-7 w-7 text-purple-600" />
          </div>

          <div>
            <p className="mt-2 text-lg text-gray-500">
              Fill in the details below to create a new booking.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-0 md:space-y-4 lg:space-y-4 py-4">
          {/* Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Client Name */}
            <div>
              <Input
                label="Client Name"
                {...register("clientName")}
                placeholder="Enter client name"
                className="h-12 relative rounded-2xl border-gray-200 pl-14 text-base shadow-none focus:border-purple-500"
                icon={<UserRound className="text-purple-500" />}
              />

              {errors.clientName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.clientName.message}
                </p>
              )}
            </div>

            <div>
              <Select
                label="Service"
                icon={<CalendarDays className="h-5 w-5 text-purple-500" />}
                options={[
                  { label: "Hair Styling", value: "hair-styling" },
                  { label: "Makeup", value: "makeup" },
                  { label: "Nails", value: "nails" },
                ]}
                placeholder="Select service"
                className="h-12 relative rounded-2xl border-gray-200 pl-14 text-base shadow-none focus:border-purple-500"
              />

              {errors.service && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.service.message}
                </p>
              )}
            </div>
          </div>

          {/* Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Date */}
            <div>
              <Input
                label="Date"
                type="date"
                {...register("date")}
                className="h-12 rounded-2xl border-gray-200 pl-14 text-base shadow-none focus:border-purple-500"
                icon={<CalendarDays className="text-purple-500" />}
              />

              {errors.date && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Time */}
            <div>
              <Input
                label="Time"
                type="time"
                {...register("time")}
                className="h-12 rounded-2xl border-gray-200 pl-14 text-base shadow-none focus:border-purple-500"
                icon={<Clock3 className="text-purple-500" />}
              />

              {errors.time && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Textarea
              label="Notes (Optional)"
              placeholder="Add any additional notes..."
              icon={<MessageSquareText className="h-5 w-5 text-purple-500" />}
              className="min-h-[120px] rounded-2xl border-gray-200 py-4 pl-14 text-base shadow-none focus:border-purple-500"
              {...register("notes")}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t border-[#F2F4F7] px-8 py-7">
          <button
            type="button"
            onClick={() => setBookingOpen(false)}
            className="h-10 rounded-2xl border border-[#E4E7EC] bg-white px-8 text-sm font-medium text-[#111827] transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-10 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#5B3DF5] to-[#6D5DFB] px-10 text-sm font-semibold text-white shadow-lg shadow-[#6D5DFB]/25 transition hover:scale-[1.02] disabled:opacity-50"
          >
            <Sparkles className="h-5 w-5" />
            {isSubmitting ? "Creating..." : "Create Booking →"}
          </button>
        </div>
      </form>
    </div>
  );
}
