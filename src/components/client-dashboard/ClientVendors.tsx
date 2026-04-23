/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useGetSearchedVendorMutation } from "../../features/vendor/vendorApi";
import { useGetUserByIdMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";

interface Vendor {
  id: string;
  businessName: string;
  city: string;
  category: string;
  portfolioImages: string[];
  description: string;
  userId: string;
}

const businessTypes = [
  "Makeup Artist",
  "Catering",
  "Photography",
  "Events",
  "Bakery",
];
const limits = [6, 12, 24];

export function ClientVendors() {
  const navigate = useNavigate();
  const [getSearchedVendor, { isLoading }] = useGetSearchedVendorMutation();
  const [getUserById] = useGetUserByIdMutation();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [totalVendors, setTotalVendors] = useState(0);
  const [searchType, setSearchType] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const fetchVendors = async () => {
    try {
      const res = await getSearchedVendor({
        name: searchName,
        location: searchLocation,
        type: searchType,
        page,
        limit,
      });

      if (res.data?.status === 200) {
        setVendors(res.data.data.data);
        setTotalVendors(res.data.data.total);
      }
    } catch (err) {
      console.error("Error fetching vendors", err);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchVendors, 500), [
    searchName,
    searchLocation,
    searchType,
    page,
    limit,
  ]);

  const isSearched =
    searchName.trim() !== "" ||
    searchLocation.trim() !== "" ||
    searchType.trim() !== "";

  const handleVendorClick = async (userId: string) => {
    try {
      const res = await getUserById({ userId });

      if (res?.data?.status === 200) {
        const slug = res.data.data.user.slug;
        navigate("/vendor-booking/" + slug);
      }
    } catch (error) {
      console.error("Failed to fetch vendor slug", error);
    }
  };

  useEffect(() => {
    if (!isSearched) {
      setVendors([]);
      return;
    }

    debouncedFetch();
  }, [searchName, searchLocation, searchType, page, limit]);

  return (
    <div className="py-6">
      <div>
        <h1 className="text-2xl font-semibold">Find Vendors</h1>
        <p className="text-sm text-gray-500">
          Search for trusted vendors and view their details.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <input
            type="text"
            placeholder="Business Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All Types</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {limits.map((l) => (
              <option key={l} value={l}>
                Show {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        {isLoading ? (
          <Loader />
        ) : !isSearched ? (
          <p>Please enter your search on the search bar.</p>
        ) : vendors.length === 0 ? (
          <p className="text-gray-500">No vendors found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {vendor.businessName}
                </h2>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Location:</span> {vendor.city}
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Type:</span> {vendor.category}
                </p>
                <p className="text-gray-700 mt-2">
                  {vendor.description || "No description provided."}
                </p>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => handleVendorClick(vendor.userId)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}

        {totalVendors > limit && (
          <div className="mt-6 flex items-center justify-between">
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">Page {page}</span>
            <button
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page * limit >= totalVendors}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
