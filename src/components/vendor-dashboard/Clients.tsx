/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useGetClientsVendorStatsQuery } from "../../features/booking/bookingApi";
import { useLazyGetVendorClientsQuery } from "../../features/users/userApi";
import Loader from "../ui/Loader";
import { useEffect } from "react";
import { formatDate } from "../utils/dateFormatter";

export function Clients() {
  const vendor = useSelector(
    (state: { vendor: { vendor: any } }) => state.vendor.vendor,
  );
  const { data: clientsStatsData, isLoading: clientsStatsLoading } =
    useGetClientsVendorStatsQuery({});
  const [getClients, { data: clientsData, isLoading }] =
    useLazyGetVendorClientsQuery();

  useEffect(() => {
    if (vendor?.id) {
      getClients(vendor.id);
    }
  }, [vendor?.id]);

  const clients = clientsData?.data?.clients;

  console.log({ clients, vendor });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Clients</h1>
          <p className="text-sm text-gray-500">
            Stay in touch with your regulars and leads.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Export
          </button>
          <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800">
            Add Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Clients</p>
          <p className="mt-2 text-xl font-semibold">
            {clientsStatsLoading ? (
              <Loader />
            ) : clientsStatsData?.data?.totalClients ? (
              clientsStatsData?.data?.totalClients.toString()
            ) : (
              "0"
            )}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Repeat Clients</p>
          <p className="mt-2 text-xl font-semibold">
            {clientsStatsLoading ? (
              <Loader />
            ) : clientsStatsData?.data?.repeatRate ? (
              `${clientsStatsData?.data?.repeatRate}%`
            ) : (
              "0%"
            )}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg. Booking Value</p>
          <p className="mt-2 text-xl font-semibold">
            {clientsStatsLoading ? (
              <Loader />
            ) : clientsStatsData?.data?.avgBookingValue ? (
              `₦ ${clientsStatsData?.data?.avgBookingValue?.toLocaleString()}`
            ) : (
              "0"
            )}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            placeholder="Search clients"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm md:w-64"
          />
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700">
              All
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600">
              Repeat
            </button>
            <button className="rounded-full bg-gray-100 px-4 py-1 text-xs font-semibold text-gray-600">
              New
            </button>
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
