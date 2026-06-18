import { Search, MapPin } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/10 flex flex-col lg:flex-row gap-3">
      <div className="flex items-center gap-3 flex-1">
        <Search className="text-white" />
        <input
          placeholder="Search services"
          className="bg-transparent w-full outline-none text-white"
        />
      </div>

      <div className="flex items-center gap-3 flex-1">
        <MapPin className="text-white" />
        <input
          placeholder="Location"
          className="bg-transparent w-full outline-none text-white"
        />
      </div>

      <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 rounded-2xl text-white font-semibold">
        Search
      </button>
    </div>
  );
}
