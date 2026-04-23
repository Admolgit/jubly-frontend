import { Search, SlidersHorizontal } from "lucide-react";

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
      <div className="flex items-center gap-2 flex-wrap">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setStatusFilter(option.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              statusFilter === option.value
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
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
