import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";

export function Services() {
  const services = [
    {
      name: "Hair Styling",
      price: "NGN 5,000",
      duration: "60 min",
      status: "Active",
      bookings: 24,
    },
    {
      name: "Makeup",
      price: "NGN 8,000",
      duration: "90 min",
      status: "Active",
      bookings: 18,
    },
    {
      name: "Nail Art",
      price: "NGN 4,000",
      duration: "45 min",
      status: "Paused",
      bookings: 6,
    },
  ];

  const [serviceOpen, setServiceOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="text-sm text-gray-500">
            Manage your service catalog and pricing.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Import
          </button>
          <button
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
            onClick={() => setServiceOpen(true)}
          >
            Add Service
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700">
              All
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600">
              Active
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600">
              Paused
            </button>
          </div>
          <input
            placeholder="Search services"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500">{service.duration}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  service.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {service.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-lg font-semibold text-gray-900">
                  {service.price}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Bookings</p>
                <p className="text-lg font-semibold text-gray-900">
                  {service.bookings}
                </p>
              </div>
              <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Edit Service
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={serviceOpen}
        onClose={() => setServiceOpen(false)}
        title="Add Service"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Service Name" placeholder="Bridal Makeup" />
            <Input label="Price" placeholder="NGN 10,000" />
            <Input label="Duration" placeholder="90 min" />
            <Input label="Category" placeholder="Makeup" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              placeholder="Describe the service"
              className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setServiceOpen(false)}
            >
              Cancel
            </button>
            <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
              Save Service
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
