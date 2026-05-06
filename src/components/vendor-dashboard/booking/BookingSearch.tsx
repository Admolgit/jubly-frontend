/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, SlidersHorizontal } from "lucide-react";

export default function BookingSearch({ value, setSearchFilter }: any) {
  return (
    <div className="flex items-center gap-3">
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search bookings..."
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm 
          placeholder:text-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e: any) => setSearchFilter(e.target.value)}
        />
      </div>

      {/* Filter Button */}
      <button className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition">
        <SlidersHorizontal size={18} className="text-gray-600" />
      </button>
    </div>
  );
}
