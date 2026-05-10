/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useGetClientsVendorStatsQuery } from "../../features/booking/bookingApi";
import { useLazyGetVendorClientsQuery } from "../../features/users/userApi";
import Loader from "../ui/Loader";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateFormatter";
import { StatCard } from "./dashboard/StatCard";
import { Calendar, CheckCircle, Clock, ReplaceAll, ShieldHalfIcon, UserPlus2Icon } from "lucide-react";
import BookingSearch from "./booking/BookingSearch";

const statusConfig: Record<
  any,
  { icon: JSX.Element; active: string }
> = {
  ALL: {
    icon: <Calendar size={16} />,
    active: "bg-blue-50 text-blue-600 border-blue-200",
  },
  REPEAT: {
    icon: <Clock size={16} />,
    active: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
  NEW: {
    icon: <CheckCircle size={16} />,
    active: "bg-green-50 text-green-600 border-green-200",
  },
};

export function Clients() {
  const vendor = useSelector(
    (state: { vendor: { vendor: any } }) => state.vendor.vendor,
  );
  const { data: clientsStatsData, isLoading: clientsStatsLoading } =
    useGetClientsVendorStatsQuery({});
  const [getClients, { data: clientsData, isLoading }] =
    useLazyGetVendorClientsQuery();

  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    if (vendor?.id) {
      getClients(vendor.id);
    }
  }, [vendor?.id]);

  const clients = clientsData?.data?.clients;

  const statusOptions = [
    {
      label: "All",
      value: "ALL",
      style: "bg-blue-50 text-blue-700",
      // count: statusFilterData?.data?.all,
    },
    {
      label: "Repeat",
      value: "REPEAT",
      style: "bg-amber-100 text-amber-700",
      // count: statusFilterData?.data?.pending,
    },
    {
      label: "New",
      value: "NEW",
      style: "bg-green-100 text-green-700",
      // count: statusFilterData?.data?.confirmed,
    },
  ];

  if (clientsStatsLoading) {
    return <Loader />;
  }

  return (
    <div className="py-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Clients</h1>
          <p className="text-sm text-gray-500">
            Stay in touch with your regulars and leads.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-600 shadow-sm transition hover:bg-purple-50">
            Export
          </button>
          <button className="rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90">
            + Add Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 my-6">
        <StatCard
          title="Total Clients"
          value={clientsStatsData?.data?.totalClients.toString() || "0"}
          icon={<UserPlus2Icon className="w-5 h-5" />}
          color="purple"
          change="12% from last month"
        />
        <StatCard
          title="Repeat Clients"
          value={`${clientsStatsData?.data?.repeatRate || "0"}%`}
          icon={<ReplaceAll className="w-5 h-5" />}
          color="purple"
          change="12% from last month"
        />
        <StatCard
          title="Avg. Booking Value"
          value={`${clientsStatsData?.data?.avgBookingValue?.toLocaleString() || "0"}`}
          icon={<ShieldHalfIcon className="w-5 h-5" />}
          color="purple"
          change="12% from last month"
        />
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <BookingSearch
          // value={searchFilter}
          // setSearchFilter={setSearchFilter}
          />
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
                  {/* <span
                    className={`
                      ml-1 rounded-full px-2 py-0.5 text-xs font-semibold
                      ${isActive ? "bg-white/70" : "bg-gray-100 text-gray-600"}
                    `}
                  >
                    {option.count ?? 0}
                  </span> */}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-[640px] text-left">
              <thead className="text-xs uppercase text-gray-400">
                <tr className="border-b">
                  <th className="px-3 py-3">Client</th>
                  <th className="px-3 py-3">Contact</th>
                  <th className="px-3 py-3">Bookings</th>
                  <th className="px-3 py-3">Last Visit</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {clients?.map((client: any) => (
                  <tr key={client.email} className="border-b last:border-b-0">
                    <td className="px-3 py-4 font-medium text-gray-900">
                      {client.firstName} {client.lastName}
                    </td>
                    <td className="px-3 py-4 text-gray-600">
                      <div>{client.email}</div>
                      <div className="text-xs text-gray-400">
                        {client.phone}
                      </div>
                    </td>
                    <td className="px-3 py-4 font-semibold text-gray-900">
                      {client.bookings}
                    </td>
                    <td className="px-3 py-4 text-gray-600">
                      {formatDate(client.lastLogin)}
                    </td>
                    <td className="px-3 py-4">
                      <button className="text-sm font-semibold text-blue-700 hover:underline">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
