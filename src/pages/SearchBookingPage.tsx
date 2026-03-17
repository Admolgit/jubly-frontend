/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import Pagination from "../components/Pagination";
import {
  useGetSearchedVendorMutation,
} from "../features/vendor/vendorApi";
import { useGetUserByIdMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";

interface Vendor {
  id: string;
  businessName: string;
  city: string;
  category: string;
  portfolioImages: string[];
  description: string;
  userId: string;
}

// interface VendorResponse {
//   data: Vendor[];
//   total: number;
// }

const businessTypes = [
  "Makeup Artist",
  "Catering",
  "Photography",
  "Events",
  "Bakery",
];
const limits = [5, 10, 20, 50];

const SearchBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [getSearchedVendor, { isLoading }] = useGetSearchedVendorMutation();
  const [getUserById] = useGetUserByIdMutation();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [totalVendors, setTotalVendors] = useState(0);
  const [searchType, setSearchType] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch vendors
  const fetchVendors = async () => {
    try {
      const res = await getSearchedVendor({
        name: searchName,
        location: searchLocation,
        type: searchType,
        page,
        limit,
      });

      if (res.data.status === 200) {
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
      const res = await getUserById({userId});

      if (res?.data?.status === 200) {
        const slug = res.data.data.user.slug;

        navigate(`/vendor-booking/${slug}`);
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Find Your Vendor
      </h1>

      {/* Search + Limit Controls */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
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
            setPage(1); // reset to first page when limit changes
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

      {/* Vendors List */}
      {isLoading ? (
        <p className="text-gray-500">Loading vendors...</p>
      ) : !isSearched || vendors?.length === 0 ? (
        <p className="text-gray-500">No vendors found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors?.map((vendor) => (
              <div
                key={vendor.id}
                className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white"
                onClick={() => handleVendorClick(vendor.userId)}
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
                <p className="text-gray-700 mt-2">{vendor.description}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Go to page
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            total={totalVendors}
            page={page}
            limit={limit}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  );
};

export default SearchBookingPage;
