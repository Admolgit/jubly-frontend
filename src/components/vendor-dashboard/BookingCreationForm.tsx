/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";

const bookingSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  service: z.string().min(1, "Service is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm({ setBookingOpen, handleCreateBooking }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    // Optional: combine date + time into a single ISO datetime
    const dateTime = new Date(`${data.date}T${data.time}`);

    handleCreateBooking({
      ...data,
      dateTime,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Input label="Client Name" {...register("clientName")} />
          {errors.clientName && (
            <p className="text-sm text-red-500">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <Input label="Service" {...register("service")} />
          {errors.service && (
            <p className="text-sm text-red-500">{errors.service.message}</p>
          )}
        </div>

        <div>
          <Input type="date" label="Date" {...register("date")} />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div>
          <Input type="time" label="Time" {...register("time")} />
          {errors.time && (
            <p className="text-sm text-red-500">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div>
        <Input label="Notes" {...register("notes")} />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setBookingOpen(false)}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Booking"}
        </button>
      </div>
    </form>
  );
}
