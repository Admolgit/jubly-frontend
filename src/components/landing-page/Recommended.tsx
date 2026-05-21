/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { useGetAllVendorsQuery } from "../../features/vendor/vendorApi";
import { useGetUserIdMutation } from "../../features/users/userApi";
import { useNavigate } from "react-router-dom";

export default function RecommendedSection() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState("");

  const { data: vendorsData, isLoading } = useGetAllVendorsQuery({});
  const [getUserId] = useGetUserIdMutation({});

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const vendors = vendorsData?.data?.vendors || [];

  useEffect(() => {
    const fetchUserId = async () => {
      if (userId.length > 0) {
        const res = await getUserId(userId).unwrap();
        console.log({ res });

        if (res.status === 200) {
          navigate(`/vendor-booking/${res.data.slug}`);
        }
      }
    };

    fetchUserId();
  }, [userId, navigate, getUserId]);

  return (
    <section className="py-24 bg-[#F8F6F7]">
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest text-purple-700 uppercase">
            Services
          </p>
          <h2 className="text-2xl font-semibold text-gray-800">Recommended</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Discover thoughtfully crafted services designed to meet your needs
            with excellence and attention to detail.
          </p>
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronRight size={20} />
        </button>

        {/* <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        > */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500">Loading vendors...</p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
            >
              {vendors.map((vendor: any) => (
                <motion.div
                  key={vendor.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-[320px] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={
                        vendor.profileImage ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                      }
                      alt={vendor.businessName}
                      className="h-56 w-full object-cover"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-purple-700 backdrop-blur">
                      {vendor?.isApproved
                        ? "Verified Vendor"
                        : "Unverified Vendor"}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-semibold">4.8</span>
                      </div>

                      <span className="text-sm text-gray-400">
                        120+ bookings
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-gray-900">
                      {vendor.businessName}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-purple-600">
                      {vendor.category}
                    </p>
                    <div className="mt-3 flex items-start gap-2 text-sm text-gray-500">
                      <MapPin size={16} className="mt-0.5" />

                      <span>
                        {vendor.city}, {vendor.state}, {vendor.country}
                      </span>
                    </div>
                    <button
                      onClick={() => setUserId(vendor.userId)}
                      className="mt-5 w-full border border-purple-500 text-purple-900 py-2 rounded-lg hover:text-purple-700 transition"
                    >
                      BOOK NOW
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      {/* </div> */}
    </section>
  );
}
