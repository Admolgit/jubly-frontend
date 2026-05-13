/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, CheckCircle, CheckSquare, Clock, Search, SlidersHorizontal, XCircle } from "lucide-react";

type Props = {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  statusOptions: {
    label: string;
    value: string;
  }[];
};

const statusConfig: Record<
  any,
  { icon: JSX.Element; active: string }
> = {
  ALL: {
    icon: <Calendar size={16} />,
    active: "bg-blue-50 text-blue-600 border-blue-200",
  },
  PENDING: {
    icon: <Clock size={16} />,
    active: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
  CONFIRMED: {
    icon: <CheckCircle size={16} />,
    active: "bg-green-50 text-green-600 border-green-200",
  },
  COMPLETED: {
    icon: <CheckSquare size={16} />,
    active: "bg-gray-100 text-gray-700 border-gray-200",
  },
  CANCELLED: {
    icon: <XCircle size={16} />,
    active: "bg-red-50 text-red-600 border-red-200",
  },
};

export default function BookingFilters({
  statusFilter,
  statusOptions,
  setStatusFilter,
  searchFilter,
  setSearchFilter,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-[#F8F8FE] border rounded-2xl px-4 py-3 shadow-sm">
      {/* Tabs */}
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

      {/* Search + Filter */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        {/* Search Input */}
        <div className="flex items-center gap-2 border rounded-full px-3 py-2 w-full md:w-72 bg-gray-50">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search vendor or service..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Filter Icon Button */}
        <button className="border rounded-full p-2 bg-gray-50 hover:bg-gray-100">
          <SlidersHorizontal size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
