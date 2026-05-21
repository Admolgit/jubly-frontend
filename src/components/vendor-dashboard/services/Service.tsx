/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../ui/Modal";
import {
  useCreateServiceMutation,
  useGetVendorServicesQuery,
  useUpdateActiveStatusMutation,
} from "../../../features/services/servicesAPI";
import Loader from "../../ui/Loader";
import Pagination from "../../utils/pagination";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import BookingSearch from "../booking/BookingSearch";
import ServiceForm from "./ServiceCreationForm";
import toast from "react-hot-toast";
import EditServiceForm from "./ServiceEditForm";
import { useSelector } from "react-redux";
import { ServiceActions } from "../../ui/ServiceActions";
import ConfirmationModal from "../../utils/ConfirmationModal";

const DEFAULT_ITEMS_PER_PAGE = 6;

const statusConfig: Record<any, { icon: JSX.Element; active: string }> = {
  ALL: {
    icon: <Calendar size={16} />,
    active: "bg-blue-50 text-blue-600 border-blue-200",
  },
  ACTIVE: {
    icon: <Clock size={16} />,
    active: "bg-green-50 text-green-600 border-green-200",
  },
  PAUSED: {
    icon: <CheckCircle size={16} />,
    active: "bg-yellow-50 text-yellow-600 border-yell100",
  },
};

export function Services() {
  const vendor = useSelector(
    (state: { vendor: { vendor: { id: string } } }) => state.vendor.vendor,
  );
  const [serviceOpen, setServiceOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reactivationOpen, setReactivationOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    durationMins: "",
    description: "",
  });
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);

  const [updateService, { isLoading: updating }] = useCreateServiceMutation();

  const {
    data: servicesData,
    isLoading: servicesLoading,
    refetch,
  } = useGetVendorServicesQuery({
    page: currentPage,
    limit: DEFAULT_ITEMS_PER_PAGE,
    search: searchFilter,
  });

  const [createService, { isLoading: createServiceIsLoading }] =
    useCreateServiceMutation();

  const [updateActiveStatus, { isLoading: activeUpdating }] =
    useUpdateActiveStatusMutation();

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

  const active = servicesData?.data?.filter(
    (data: { active: boolean }) => data.active,
  ).length;
  const inactive = servicesData?.data?.filter(
    (data: { active: boolean }) => data.active !== true,
  ).length;

  const statusOptions = [
    {
      label: "All",
      value: "ALL",
      style: "bg-blue-50 text-blue-700",
      count: servicesData?.meta?.totalCount,
    },
    {
      label: "Active",
      value: "ACTIVE",
      style: "bg-green-100 text-green-700",
      count: active,
    },
    {
      label: "Paused",
      value: "PAUSED",
      style: "bg-amber-100 text-amber-700",
      count: inactive,
    },
  ];

  const handleCreateService = async (data: any) => {
    try {
      const response = await createService({
        services: [
          {
            price: Number(data.price),
            description: data.description,
            durationMins: Number(data.durationMins),
            name: data.name,
          },
        ],
      }).unwrap();

      if (response.status === 201) {
        toast.success("Service created.");
        refetch();
      }

      setServiceOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateService = async () => {
    const payload = {
      services: [
        {
          ...editForm,
          price: Number(editForm.price),
          vendorId: vendor?.id,
          durationMins: Number(editForm.durationMins),
        },
      ],
    };
    try {
      const res = await updateService(payload).unwrap();

      if (res.status === 201) {
        toast.success("Service updated successfully");
        refetch();
      }
      setOpenEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReactivation = async () => {
    try {
      const res = await updateActiveStatus({
        serviceId: selectedService?.id,
        active: "true",
      }).unwrap();

      if (res.status === 200) {
        toast.success(res.message);
        refetch();
      }

      setReactivationOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeactivation = async () => {
    try {
      const res = await updateActiveStatus({
        serviceId: selectedService?.id,
        active: "false",
      }).unwrap();

      if (res.status === 200) {
        toast.success(res.message);
        refetch();
      }

      setCancelOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between relative">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="text-sm text-gray-500">
            Manage your service catalog and pricing.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50">
            Import
          </button>
          <button
            className="rounded-[10px] px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm transition hover:opacity-90"
            onClick={() => {
              setServiceOpen(true);
            }}
          >
            + Add Service
          </button>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((option) => {
              const isActive = statusFilter === option.value;
              const config = statusConfig[option.value as any];

              return (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition 
                    ${isActive ? config.active + " shadow-sm" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}
                  `}
                >
                  <span className="opacity-90">{config.icon}</span>
                  <span>{option.label}</span>
                  <span
                    className={`
                      ml-1 rounded-full px-2 py-0.5 text-xs font-semibold
                      ${isActive ? "bg-white/70" : "bg-gray-100 text-gray-600"}
                    `}
                  >
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>
          <BookingSearch
            value={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        {servicesLoading ? (
          <Loader />
        ) : (
          servicesList?.map((service: any) => (
            <div
              key={service.name}
              className="relative overflow-hidden rounded-[32px] border border-[#F0F2F5] bg-white px-8 py-8 shadow-[0_2px_10px_rgba(16,24,40,0.04)] transition hover:shadow-[0_8px_30px_rgba(16,24,40,0.08)]"
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6">
                  {/* ICON */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F5F1FF]">
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 3L7 5L19 17L21 15L9 3Z" />
                      <path d="M5 7L3 9L15 21L17 19L5 7Z" />
                    </svg>
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-xl leading-none font-semibold tracking-[-1.4px] text-[#111827]">
                      {service.name}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-[#667085]">
                      {service.durationMins} mins
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-5">
                  <span
                    className={`rounded-full px-5 py-2 text-xs font-semibold ${
                      service.active
                        ? "bg-[#DCFCE7] text-[#15803D]"
                        : "bg-[#FEF3C7] text-[#B45309]"
                    }`}
                  >
                    {service.active ? "Active" : "Paused"}
                  </span>

                  <div>
                    <ServiceActions
                      link={service}
                      onReactivate={() => {
                        setReactivationOpen(true);
                        setSelectedService(service);
                      }}
                      onDeactivate={() => {
                        setCancelOpen(true);
                        setSelectedService(service);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="mt-20 flex items-center justify-between">
                {/* STATS */}
                <div className="flex items-center">
                  {/* PRICE */}
                  <div className="pr-16">
                    <p className="mb-3 text-sm font-medium text-[#667085]">
                      Price
                    </p>

                    <h2 className="text-xl leading-none font-semibold tracking-[-2px] text-[#7C3AED]">
                      ₦{Number(service.price)?.toLocaleString()}
                    </h2>
                  </div>

                  {/* BOOKINGS */}
                  <div>
                    <p className="mb-3 text-sm font-medium text-[#667085]">
                      Bookings
                    </p>

                    <h2 className="text-2xl leading-none font-semibold tracking-[-2px] text-[#111827]">
                      {service._count.booking}
                    </h2>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  className="h-10 rounded-2xl border border-[#D0D5DD] bg-white px-10 text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB]"
                  onClick={() => {
                    setOpenEdit(true);

                    setEditForm({
                      name: service.name || "",
                      price: service.price || "",
                      durationMins: service.durationMins || "",
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
        <ServiceForm
          setServiceOpen={setServiceOpen}
          handleCreateService={handleCreateService}
          createServiceIsLoading={createServiceIsLoading}
          vendor={vendor}
        />
      </Modal>
      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit Service"
      >
        <EditServiceForm
          editForm={editForm}
          handleEditChange={handleEditChange}
          handleUpdateService={handleUpdateService}
          setOpenEdit={setOpenEdit}
          updating={updating}
          vendor={vendor}
        />
      </Modal>
      <ConfirmationModal
        setCancelOpen={setCancelOpen}
        cancelOpen={cancelOpen}
        message={"Are you sure you want to deactivate this service."}
        onSubmit={handleDeactivation}
        onSubmitLoading={activeUpdating}
        btnText={"Deactivate"}
        btnTextLoading={"Deactivating..."}
      />
      <ConfirmationModal
        setCancelOpen={setReactivationOpen}
        cancelOpen={reactivationOpen}
        message={"Are you sure you want to reactivate this service."}
        onSubmit={handleReactivation}
        onSubmitLoading={activeUpdating}
        btnText={"Reactivate"}
        btnTextLoading={"Reactivating..."}
      />
    </div>
  );
}
