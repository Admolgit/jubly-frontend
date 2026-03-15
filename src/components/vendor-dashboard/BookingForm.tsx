/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { useCreateBookingPaymentMutation } from "../../features/booking/bookingApi";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

export function BookingFormModal({
  slot,
  dayOfWeek,
  vendorId,
  serviceId,
  open,
  onClose,
}: any) {
  const [createBookingPayment, { isLoading }] =
    useCreateBookingPaymentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  if (!open) return null;

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        vendorId,
        serviceId,
        dayOfWeek,
        clientName: data.name,
        clientEmail: data.email,
        phone: data.phone,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };

      const res = await createBookingPayment(payload).unwrap();

      console.log(res);

      if (res.status === 201) {
        window.open(res.data.authorizationUrl, "_self");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  const start = new Date(slot.startTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const end = new Date(slot.endTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Complete Booking</h3>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* Slot Info */}
          <div className="bg-gray-50 p-3 rounded mb-4 text-sm">
            Selected time:{" "}
            <strong>
              {start} - {end}
            </strong>
          </div>

          {/* Form */}
          <form>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            {/* Name */}
            <Input
              type="text"
              label="Name"
              placeholder="Your Name"
              className="border p-3 rounded w-full mb-1"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-3">{errors.name.message}</p>
            )}

            {/* Email */}
            <Input
              type="email"
              label="Email"
              placeholder="Email Address"
              className="border p-3 rounded w-full mb-1"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-3">
                {errors.email.message}
              </p>
            )}

            {/* Phone */}
            <Input
              type="tel"
              label="Phone"
              placeholder="Enter phone number"
              className="border p-3 rounded w-full mb-1"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mb-3">
                {errors.phone.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="bg-blue-600 text-white w-full py-3 rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Redirecting to payment..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
