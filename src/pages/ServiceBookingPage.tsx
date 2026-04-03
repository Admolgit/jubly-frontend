/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetServiceByIdQuery } from "../features/vendor/vendorApi";
import { useEffect, useState } from "react";
import { useGetVendorAvailabilitySlotsMutation } from "../features/availability/availability";
import { BookingFormModal } from "../components/vendor-dashboard/BookingForm";
import Loader from "../components/ui/Loader";

export default function ServiceBookingPage() {
  const { serviceId } = useParams();

  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [slotsData, setSlotsData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [openBooking, setOpenBooking] = useState(false);

  const { data, isLoading } = useGetServiceByIdQuery(serviceId as string);
  const [getVendorAvailabilitySlots, { isLoading: slotsIsLoading }] =
    useGetVendorAvailabilitySlotsMutation();
  const service = data?.data?.service;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getVendorAvailabilitySlots({
        vendorId: data?.data?.service?.vendorId,
        serviceId: service?.id,
        date: selectedDate,
      }).unwrap();

      if (res) {
        setSlotsData(res.data.availableSlots);
      }
    };
    fetchData();
  }, [selectedDate, data, getVendorAvailabilitySlots, service]);

  const handleBooking = async () => {
    setOpenBooking(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Book {JSON.parse(localStorage.getItem("businessName") || "")}
          </h1>
          <p className="text-sm text-gray-500">Secure booking</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 p-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold">{service?.name}</h2>

            <p className="text-gray-500 mt-3">{service?.description}</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium">
                  {service?.durationMins} mins
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Price</span>
                <span className="font-semibold text-lg">
                  ₦{Number(service?.price).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-2">Why book here?</h3>

            <ul className="text-sm text-gray-500 space-y-2">
              <li>✔ Instant confirmation</li>
              <li>✔ Secure booking</li>
              <li>✔ Easy rescheduling</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 sticky top-10 h-fit">
          <h2 className="text-xl font-semibold mb-5">Select Date & Time</h2>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border w-full rounded-lg p-3 mb-6"
          />

          <div className="grid grid-cols-3 gap-3">
            {slotsIsLoading
              ? "Loading"
              : slotsData?.map((slot: any) => {
                  const start = new Date(slot.startTime);

                  const formatted = start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <button
                      key={slot.startTime}
                      onClick={() => setSelectedSlot(slot)}
                      className={`border rounded-lg p-3 text-sm transition
                    ${
                      selectedSlot?.startTime === slot.startTime
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    >
                      {formatted}
                    </button>
                  );
                })}
          </div>

          <button
            disabled={!selectedSlot}
            className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg hover:transparent disabled:opacity-50"
            onClick={handleBooking}
          >
            Continue
          </button>
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
