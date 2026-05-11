/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useGetServiceByIdQuery } from "../features/vendor/vendorApi";
import { useState } from "react";
import { useGetVendorAvailabilitySlotsQuery } from "../features/availability/availability";
import { BookingFormModal } from "../components/vendor-dashboard/BookingForm";
import Loader from "../components/ui/Loader";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Shield,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";

export default function ServiceBookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = window.location.pathname;
  console.log(location.split("/"));
  const { data, isLoading } = useGetServiceByIdQuery(serviceId as string);

  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [openBooking, setOpenBooking] = useState(false);
  const service = data?.data?.service;

  const shouldSkip =
    !selectedDate || !service?.id || !data?.data?.service?.userId;

  const { data: slotsData, isLoading: slotsIsLoading } =
    useGetVendorAvailabilitySlotsQuery(
      {
        vendorId: data?.data?.service?.userId,
        serviceId: service?.id,
        date: selectedDate,
      },
      {
        skip: shouldSkip,
        refetchOnMountOrArgChange: true,
      },
    );

  const handleBooking = async () => {
    setOpenBooking(true);
  };

  const handleBack = () => {
    navigate(`/booking-vendor/${location.split("/")[1]}`, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  console.log({ slotsData });

  return (
    <div className="min-h-screen bg-[#faf7ff] px-4 py-5 md:px-8">
      {/* Header */}
      <div className="mx-auto mb-6 flex max-w-6xl items-center justify-between rounded-3xl border border-[#efe7ff] bg-white px-6 py-5 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            className="flex h-8 w-10 items-center justify-center rounded-2xl border border-[#ece3ff] text-[#7c3aed] transition hover:bg-[#f7f2ff]"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <h1 className="text-xl font-bold text-[#111827] md:text-2xl">
            Book {JSON.parse(localStorage.getItem("businessName") || "")}
          </h1>
        </div>

        <div className="hidden items-center gap-2 text-[#7c3aed] md:flex">
          <Shield className="h-5 w-5 fill-[#7c3aed]" />
          <p className="font-medium text-sm">Secure booking</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.95fr]">
        <div className="space-y-6">
          {/* Service Card */}
          <div className="rounded-[32px] border border-[#efe7ff] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Image */}
              <div className="relative">
                <div className="absolute -left-3 -top-3 h-full w-full rounded-[30px] bg-[#f4ecff]" />

                <img
                  src={
                    localStorage.getItem("vendorRandomImage") ||
                    "/default-avatar.png"
                  }
                  alt={service?.name}
                  className="relative h-[250px] w-full rounded-[30px] object-cover lg:w-[250px]"
                />

                <div className="absolute -bottom-5 -left-5 flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-[#f4ecff] shadow-lg">
                  <Sparkles className="h-9 w-9 text-[#7c3aed]" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#111827]">
                  {service?.name}
                </h2>

                <p className="mt-2 text-lg leading-relaxed text-[#6b7280]">
                  {service?.description ||
                    "The best make up artist to your service"}
                </p>

                <div className="mt-8 space-y-5">
                  {/* Duration */}
                  <div className="flex items-center justify-between border-b border-[#f3f4f6] pb-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f0ff]">
                        <Clock3 className="h-5 w-5 text-[#7c3aed]" />
                      </div>

                      <span className="text-md text-[#4b5563]">Duration</span>
                    </div>

                    <span className="text-xl font-semibold text-[#111827]">
                      {service?.durationMins} mins
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f0ff]">
                        <Tag className="h-5 w-5 text-[#7c3aed]" />
                      </div>

                      <span className="text-md text-[#4b5563]">Price</span>
                    </div>

                    <span className="text-xl font-bold text-[#111827]">
                      ₦{Number(service?.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#efe7ff] bg-white p-7 shadow-sm">
            <h3 className="mb-10 text-xl font-bold text-[#111827]">
              Why book here?
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Card */}
              <div className="flex flex-col items-center border-r border-[#f3f4f6] px-4 text-center last:border-none">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5eeff]">
                  <Zap className="h-8 w-8 text-[#7c3aed]" />
                </div>

                <h4 className="text-lg font-semibold text-[#111827]">
                  Instant confirmation
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                  Get confirmation instantly
                </p>
              </div>

              {/* Card */}
              <div className="flex flex-col items-center border-r border-[#f3f4f6] px-4 text-center last:border-none">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5eeff]">
                  <Shield className="h-8 w-8 text-[#7c3aed]" />
                </div>

                <h4 className="text-lg font-semibold text-[#111827]">
                  Secure booking
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                  Your information is protected
                </p>
              </div>

              {/* Card */}
              <div className="flex flex-col items-center px-4 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5eeff]">
                  <Calendar className="h-8 w-8 text-[#7c3aed]" />
                </div>

                <h4 className="text-lg font-semibold text-[#111827]">
                  Easy rescheduling
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                  Reschedule or cancel with ease
                </p>
              </div>
            </div>

            {/* Bottom Notice */}
            <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-[#f7f2ff] px-5 py-4 text-center text-[#7c3aed]">
              <Shield className="h-5 w-5 fill-[#7c3aed]" />

              <p className="text-lg font-medium">
                Your booking is safe and secure with us
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-[32px] border border-[#efe7ff] bg-white p-7 shadow-sm">
            <h2 className="text-xl mb-2 font-bold text-[#111827]">
              Select Date & Time
            </h2>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-12 mb-4 w-full rounded-2xl border border-[#d9c7ff] px-5 text-md outline-none transition focus:border-[#7c3aed]"
            />

            <div className="grid grid-cols-3 gap-3">
              {slotsIsLoading
                ? "Loading"
                : slotsData?.data?.availableSlots?.map((slot: any) => {
                    const start = new Date(slot.startTime);

                    const formatted = start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <button
                        key={slot.startTime}
                        onClick={() => setSelectedSlot(slot)}
                        className={`h-[60px] w-[95px] rounded-2xl border text-lg font-medium transition ${
                          selectedSlot?.startTime === slot.startTime
                            ? "border-[#7c3aed] bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white shadow-lg"
                            : "border-[#e5e7eb] bg-white text-[#111827] hover:border-[#c4b5fd] hover:bg-[#faf5ff]"
                        }`}
                      >
                        {formatted}
                      </button>
                    );
                  })}
            </div>

            <button
              disabled={!selectedSlot}
              className="mt-10 flex h-10 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#9333ea] font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={handleBooking}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {openBooking && (
        <BookingFormModal
          slot={selectedSlot}
          dayofWeek={selectedDate}
          vendorId={data?.data?.service?.vendorId}
          serviceId={service?.id}
          open={openBooking}
          onClose={() => setOpenBooking(false)}
        />
      )}
    </div>
  );
}
