/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { useGetVendorServicesQuery } from "../../features/services/servicesAPI";
import Loader from "../ui/Loader";
import Pagination from "../utils/pagination";

const DEFAULT_ITEMS_PER_PAGE = 6;

export function Services() {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    durationMins: "",
    category: "",
    description: "",
  });
  const [activeView, setActiveView] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const [updateService, { isLoading: updating }] = useUpdateServiceMutation();

  const { data: servicesData, isLoading: servicesLoading } =
    useGetVendorServicesQuery({
      page: currentPage,
      limit: DEFAULT_ITEMS_PER_PAGE,
      search: activeView,
    });
  console.log({ servicesData });
  const servicesList = servicesData?.data || [];

  const totalPages = Math.ceil(
    servicesData?.meta?.totalCount / DEFAULT_ITEMS_PER_PAGE,
  );

  const handleEditChange = (field: string, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateService = async () => {
    // try {
    //   await updateService({
    //     id: editData.id,
    //     ...editForm,
    //     price: Number(editForm.price),
    //     durationMins: Number(editForm.durationMins),
    //   }).unwrap();
    //   setOpenEdit(false);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  console.log({editForm})

  return (
    <div className="space-y-0">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between relative">
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
            onClick={() => {
              setServiceOpen(true);
            }}
          >
            Add Service
          </button>
        </div>
      </div>

      <div className="pt-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700">
                All
              </button>
              <button
                className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600"
                onClick={() => setActiveView("true")}
              >
                Active
              </button>
              <button
                className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600"
                onClick={() => setActiveView("false")}
              >
                Paused
              </button>
            </div>
            <input
              placeholder="Search services"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 pt-4">
        {servicesLoading ? (
          <Loader />
        ) : (
          servicesList?.map((service: any) => (
            <div
              key={service.name}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {service.durationMins} mins
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    service.active === true
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {service.active ? "Active" : "Paused"}
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
                    {service._count.booking}
                  </p>
                </div>
                <button
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setOpenEdit(true);

                    setEditForm({
                      name: service.name || "",
                      price: service.price || "",
                      durationMins: service.durationMins || "",
                      category: service.category || "",
                      description: service.description || "",
                    });
                  }}
                >
                  Edit Service
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {!servicesLoading && servicesList?.length > 0 && (
        <div className="flex items-center justify-center absolute bottom-0 left-0 right-0 py-4">
          <Pagination
            currentPage={Number(currentPage)}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <Modal
        open={serviceOpen}
        onClose={() => setServiceOpen(false)}
        title="Add Service"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Service Name"
              placeholder="Bridal Makeup"
              value={editForm.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />

            <Input
              label="Price"
              placeholder="NGN 10,000"
              value={editForm.price}
              onChange={(e) => handleEditChange("price", e.target.value)}
            />

            <Input
              label="Duration"
              placeholder="90 min"
              value={editForm.durationMins}
              onChange={(e) => handleEditChange("durationMins", e.target.value)}
            />

            <Input
              label="Category"
              placeholder="Makeup"
              value={editForm.category}
              onChange={(e) => handleEditChange("category", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              placeholder="Describe the service"
              value={editForm.description}
              onChange={(e) => handleEditChange("description", e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
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
              Create Service
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit Service"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Service Name"
              value={editForm.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />

            <Input
              label="Price"
              value={editForm.price}
              onChange={(e) => handleEditChange("price", e.target.value)}
            />

            <Input
              label="Duration"
              value={editForm.durationMins}
              onChange={(e) => handleEditChange("durationMins", e.target.value)}
            />

            <Input
              label="Category"
              value={editForm.category}
              onChange={(e) => handleEditChange("category", e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              value={editForm.description}
              onChange={(e) => handleEditChange("description", e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setOpenEdit(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateService}
              // disabled={updating}
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              {/* {updating ? "Saving..." : "Save Service"} */}
              Save Service
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
