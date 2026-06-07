/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  Pencil,
  PlusCircle,
  Scissors,
  Home,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import { formatTimeFromISO } from "../../utils/timeFormatter";

interface ClientProfileModalProps {
  client?: any;
  clientStatsData: any;
}

export default function ClientProfileModal({
  client,
  clientStatsData,
}: ClientProfileModalProps) {
  const initials = `${client?.firstName?.[0] || ""}`;
  const first = clientStatsData?.data?.bookings?.[0];
  const second = clientStatsData?.data?.bookings?.[1];
  const third = clientStatsData?.data?.bookings?.[2];

  const recentBookings = [
    {
      service: first?.services?.name,
      date: formatDate(first?.date),
      time: formatTimeFromISO(first?.date),
      status: first?.status,
      icon: <Scissors className="h-5 w-5 text-blue-600" />,
      bg: "bg-blue-50",
      badge: "bg-green-100 text-green-700",
    },
    {
      service: second?.services?.name,
      date: formatDate(second?.date),
      time: formatTimeFromISO(second?.date),
      status: second?.status,
      icon: <Pencil className="h-5 w-5 text-purple-600" />,
      bg: "bg-purple-50",
      badge: "bg-green-100 text-green-700",
    },
    {
      service: third?.services?.name,
      date: formatDate(third?.date),
      time: formatTimeFromISO(third?.date),
      status: third?.status,
      icon: <Home className="h-5 w-5 text-orange-500" />,
      bg: "bg-orange-50",
      badge: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-6">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-purple-100 text-2xl font-bold text-purple-600">
              {initials}
            </div>

            <span className="absolute top-1/4 right-1 h-6 w-6 rounded-full border-4 border-white bg-green-500"></span>
          </div>

          <div>
            <div className="flex flex-col gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {client?.firstName} {client?.lastName}
                </h1>

                <div className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  • Active
                </div>
              </div>

              <div className="space-y-2 pt-2 text-[12px] text-gray-600">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{client?.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{client?.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>{formatDate(client?.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100">
              <Calendar className="h-4 w-4 text-indigo-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {clientStatsData?.data?.totalBookings || 0}
              </h3>
              <p className="mt-1 text-sm text-gray-500">Total Bookings</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {clientStatsData?.data?.confirmedBookings || 0}
              </h3>
              <p className="mt-1 text-sm text-gray-500">Confirmed Bookings</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-100">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {clientStatsData?.data?.completedBookings || 0}
              </h3>
              <p className="mt-1 text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100">
              <Clock3 className="h-4 w-4 text-orange-500" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {clientStatsData?.data?.upcomingBookings || 0}
              </h3>
              <p className="mt-1 text-sm text-gray-500">Upcoming</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <h3 className="text-md font-semibold text-gray-900">
                Last Visit
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="text-md h-5 w-5 text-gray-400" />
                <span>May 14, 2026</span>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                Recent
              </span>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <Wallet className="text-md h-5 w-5 text-gray-400" />
                <span>Amount spent so far</span>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {clientStatsData?.data?.amountSpent
                  ? `₦${Number(clientStatsData.data.amountSpent).toLocaleString()}`
                  : "NGN 0"}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <Pencil className="h-5 w-5 text-gray-500" />
              <h3 className="text-md font-semibold text-gray-900">Notes</h3>
            </div>

            <p className="text-gray-500">No notes added yet.</p>

            <button className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-blue-600 transition hover:text-blue-700">
              <PlusCircle className="h-4 w-4" />
              Add Note
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <h3 className="text-md font-semibold text-gray-900">
              Recent Bookings
            </h3>

            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>

          <div>
            {recentBookings.map((booking, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-100 px-6 py-5 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${booking.bg}`}
                  >
                    {booking.icon}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {booking.service || "None"}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      {booking.date} • {booking.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.badge}`}
                  >
                    {booking.status}
                  </span>

                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
