/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import {
  useGetClientsVendorStatsQuery,
  useLazyGetClientBookingStatQuery,
} from "../../../features/booking/bookingApi";
import { useLazyGetVendorClientsQuery } from "../../../features/users/userApi";
import Loader from "../../ui/Loader";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateFormatter";
import { StatCard } from "../dashboard/StatCard";
import {
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Search,
  ShieldHalfIcon,
  ReplaceAll,
  UserPlus2Icon,
} from "lucide-react";
import SelectLimit from "../../utils/selectLimit";
import Pagination from "../../utils/pagination";
import Modal from "../../ui/Modal";
import ClientProfileModal from "./ClientProfileModal";

const DEFAULT_ITEMS_PER_PAGE = 10;

export function Clients() {
  const vendor = useSelector(
    (state: { vendor: { vendor: any } }) => state.vendor.vendor,
  );
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  const { data: clientsStatsData, isLoading: clientsStatsLoading } =
    useGetClientsVendorStatsQuery({});

  const [getClients, { data: clientsData, isLoading }] =
    useLazyGetVendorClientsQuery();

  const [getClientBookingStats, { data: clientStatsData, isLoading: clientStatsLoading }] =
    useLazyGetClientBookingStatQuery();

  // const [statusFilter, setStatusFilter] = useState("ALL");

  const handleItemsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    getClientBookingStats(
      {
        vendorId: vendor?.id,
        clientEmail: selectedClient?.email,
      }
    );
  }, [selectedClient?.email]);

  useEffect(() => {
    if (vendor?.id) {
      getClients(vendor.id);
    }
  }, [vendor?.id]);

  const clients = clientsData?.data?.clients || [];
  const totalPages = Math.ceil(clientsData?.meta?.total / itemsPerPage);

  if (clientsStatsLoading || clientStatsLoading) {
    return <Loader />;
  }

  return (
    <div className=" pb-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900">Clients</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and view all your clients
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50">
            Export
          </button>

          <button className="rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90">
            + Add Client
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Clients"
          value={clientsStatsData?.data?.totalClients?.value.toString() || "0"}
          icon={<UserPlus2Icon className="h-5 w-5" />}
          color="purple"
          change={`${clientsStatsData?.data?.totalClients?.growth || 0}% from last month`}
        />

        <StatCard
          title="Repeat Clients"
          value={`${clientsStatsData?.data?.repeatClients?.value || "0"}`}
          icon={<ReplaceAll className="h-5 w-5" />}
          color="purple"
          change={`${clientsStatsData?.data?.repeatClients?.growth || 0}% from last month`}
        />

        <StatCard
          title="Avg. Booking Value"
          value={`₦${clientsStatsData?.data?.avgBookingValue?.value?.toLocaleString() || "0"}`}
          icon={<ShieldHalfIcon className="h-5 w-5" />}
          color="purple"
          change={`${clientsStatsData?.data?.avgBookingValue?.growth || 0}% from last month`}
        />
      </div>
      
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm mt-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search clients..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-400"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <span>All Clients</span>
              <ChevronDown size={18} />
            </button>

            <button className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <CalendarDays size={18} />
              <span>Last 30 days</span>
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="min-w-[700px] w-full text-left">
              <thead className="text-sm bg-gray-50 text-gray-500 uppercase tracking-wider">
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-3 py-3">Client</th>

                  <th className="px-3 py-3">Contact</th>

                  <th className="px-3 py-3">Bookings</th>

                  <th className="px-3 py-3">Last Visit</th>

                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="text-md text-gray-700 relative">
                {clients?.map((client: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-slate-200 transition hover:bg-slate-50/50"
                  >
                    <td className="px-2 py-2 ">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 text-xl font-bold text-blue-600">
                          {client?.firstName?.charAt(0)}
                        </div>

                        <div>
                          <p className="text-[16px] font-semibold text-slate-900">
                            {client.firstName} {client.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-slate-800">
                          <Mail size={14} className="text-slate-400" />
                          <span>{client.email}</span>
                        </div>

                        <div className="flex items-center gap-3 text-slate-500">
                          <Phone size={14} className="text-blue-500" />
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                          {client.bookings}
                        </div>

                        <p className="font-medium text-sm text-slate-500">
                          Total
                        </p>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 font-medium text-slate-800">
                          <Calendar size={20} className="text-slate-400" />

                          <span>{formatDate(client.lastLogin)}</span>
                        </div>

                        <div className="inline-flex items-center text-sm rounded-xl bg-green-100 px-4 py-2 font-semibold text-green-700">
                          • Recent
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <button
                        className="flex h-10 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 font-semibold text-blue-600 transition hover:bg-blue-50"
                        onClick={() => {
                          setSelectedClient(client);
                          setOpenProfile(true);
                        }}
                      >
                        <span>View Profile</span>

                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {clients?.length > 0 && (
          <div className="mt-4 px-4 flex items-center text-sm align-center justify-between">
            <SelectLimit
              ITEMS_OPTIONS={[5, 10, 20, 50]}
              itemsPerPage={itemsPerPage}
              handleItemsChange={handleItemsChange}
              text="Clients"
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
      <Modal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        title="Client Profile"
        size="lg"
      >
        <ClientProfileModal
          client={selectedClient}
          clientStatsData={clientStatsData}
        />
      </Modal>
    </div>
  );
}
