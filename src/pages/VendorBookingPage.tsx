/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock3,
  Facebook,
  Gift,
  Instagram,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Timer,
  Wand2,
  Crown,
} from "lucide-react";

import Footer from "../components/booking/Footer";
import Loader from "../components/ui/Loader";
import { useGetUserBySlugMutation } from "../features/vendor/vendorApi";

export default function VendorBookingPage() {
  const slug = useParams().slug;

  const [getUserBySlug, { isLoading }] = useGetUserBySlugMutation();

  const [vendorDetails, setVendorDetails] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserBySlug({ slug }).unwrap();

        if (res.status === 200) {
          setVendorDetails(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [slug, getUserBySlug]);

  const vendor = vendorDetails?.vendor;
  const services = vendorDetails?.services;

  useEffect(() => {
    if (vendor?.portfolioImages?.length > 0) {
      const randomImage =
        vendor.portfolioImages[
          Math.floor(Math.random() * vendor.portfolioImages.length)
        ];

      localStorage.setItem("vendorRandomImage", randomImage);
    }
  }, [vendor]);

  useEffect(() => {
    localStorage.setItem("businessName", JSON.stringify(vendor?.businessName));
  }, [vendor]);

  const vendorUser = {
    businessName: vendor?.businessName,
    email: vendor?.user?.email,
    phone: vendor?.user?.phone,
    city: vendor?.city,
    state: vendor?.state,
    country: vendor?.country,
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const stats = [
    {
      icon: <Star className="w-5 h-5 text-violet-600" />,
      title: "50+",
      subtitle: "Happy Clients",
    },
    {
      icon: <Calendar className="w-5 h-5 text-violet-600" />,
      title: "5+",
      subtitle: "Years Experience",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-violet-600" />,
      title: "100%",
      subtitle: "Satisfaction",
    },
    {
      icon: <Timer className="w-5 h-5 text-violet-600" />,
      title: "Fast",
      subtitle: "Response",
    },
  ];

  const getServiceIcon = (name: string) => {
    const lower = name?.toLowerCase();

    if (lower?.includes("birthday")) {
      return <Gift className="w-7 h-7 text-violet-600" />;
    }

    if (lower?.includes("wedding")) {
      return <Crown className="w-7 h-7 text-violet-600" />;
    }

    return <Wand2 className="w-7 h-7 text-violet-600" />;
  };

  return (
    <div className="min-h-screen bg-[#f8f8fc] overflow-x-hidden">
      <section className="relative overflow-hidden border-b border-violet-100 bg-gradient-to-br from-[#f7f4ff] via-[#f9f8ff] to-[#f1edff]">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-100 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-10 items-center">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <img
                  src={vendor?.profileImage || "/default-avatar.png"}
                  alt={vendor?.businessName}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-xl"
                />

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  Available
                </div>
              </div>

              <div className="pt-3">
                <h1 className="text-2xl md:text-5xl font-semibold text-gray-900">
                  {vendor?.businessName}
                </h1>

                <p className="mt-2 text-lg font-medium text-violet-600">
                  {vendor?.category || "Makeup Artist"}
                </p>

                <div className="flex items-center gap-2 mt-4 text-gray-500">
                  <MapPin className="w-4 h-4" />

                  <span>
                    {vendor?.city}, {vendor?.state}, {vendor?.country}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mt-5">
                  <button className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-violet-50 transition">
                    <Instagram className="w-4 h-4 text-gray-700" />
                  </button>

                  <button className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-violet-50 transition">
                    <Phone className="w-4 h-4 text-gray-700" />
                  </button>

                  <button className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-violet-50 transition">
                    <Facebook className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm border border-violet-100 rounded-3xl shadow-sm p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-14 h-14 rounded-full border border-violet-100 bg-violet-50 flex items-center justify-center mb-3">
                      {item.icon}
                    </div>

                    <h3 className="font-semibold text-xl text-gray-900">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-8 rounded-full bg-violet-600" />

            <h2 className="text-2xl font-semibold text-gray-900">About</h2>
          </div>

          <p className="text-gray-600 leading-8 text-[15px]">
            {vendor?.bio || "Best makeup artist in Surulere"}
          </p>
        </section>
        
        {vendor?.portfolioImages?.length > 0 && (
          <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 rounded-full bg-violet-600" />

                <h2 className="text-2xl font-semibold text-gray-900">
                  Portfolio
                </h2>
              </div>

              <button className="border border-violet-300 text-violet-600 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-violet-50 transition">
                View all
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vendor?.portfolioImages?.map((img: string) => (
                <div
                  key={img}
                  className="group overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt="portfolio"
                    className="w-full h-44 object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        
        <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full bg-violet-600" />

            <h2 className="text-2xl font-semibold text-gray-900">Services</h2>
          </div>

          {services?.length === 0 ? (
            <p className="text-gray-400">No services added yet</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {services?.map((service: any) => (
                <div
                  key={service?.id}
                  onClick={() =>
                    window.open(`/${slug}/${service?.id}`, "_blank")
                  }
                  className="group border border-gray-100 rounded-2xl p-6 cursor-pointer hover:border-violet-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center shrink-0">
                      {getServiceIcon(service?.name)}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {service?.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-2 text-gray-500">
                        <Clock3 className="w-4 h-4" />

                        <span className="text-sm">
                          {service?.durationMins} minutes
                        </span>
                      </div>

                      <p className="mt-4 text-2xl font-semibold text-gray-900">
                        ₦{Number(service?.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="preview"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-cover shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white text-black w-10 h-10 rounded-full shadow-lg font-semibold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer user={vendorUser} />
    </div>
  );
}
