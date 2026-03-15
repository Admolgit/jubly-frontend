/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/booking/Footer";

export default function VendorBookingPage() {
  const slug = useParams().slug;
  const [vendorDetails, setVendorDetails] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URi}/vendor/booking-vendor/${slug}`)
      .then((res: any) => {
        setVendorDetails(res.data.data);
      });
  }, [slug]);

  const vendor = vendorDetails?.vendor;
  const services = vendorDetails?.services;
  
  
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

  if (!vendorDetails) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Cover Image */}

      <div
        className="h-64 w-full bg-gray-300 relative"
        style={{
          backgroundImage: `url(${vendor.coverImage || "/default-cover.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Profile Image */}

        <div className="absolute -bottom-12 left-10">
          <img
            src={vendor.profileImage || "/default-avatar.png"}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Vendor Info */}

      <div className="max-w-6xl mx-auto mt-16 px-6">
        <h1 className="text-3xl font-bold">{vendor.businessName}</h1>

        <p className="text-gray-500">{vendor.category}</p>

        <p className="text-gray-400">
          {vendor.city}, {vendor.state}, {vendor.country}
        </p>

        {/* Bio */}

        <div className="mt-6">
          <h2 className="font-semibold mb-2">About</h2>

          <p className="text-gray-600">{vendor.bio}</p>
        </div>

        {/* Portfolio */}

        {vendor.portfolioImages.length > 0 && (
          <div className="mt-8">
            <h2 className="font-semibold mb-3">Portfolio(s)</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {vendor.portfolioImages.map((img: string) => (
                <img
                  key={img}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className="rounded-lg object-cover h-40 w-full cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>
        )}

        {/* Services */}

        <div className="mt-10">
          <h2 className="font-semibold text-xl mb-4">Services</h2>

          {services.length === 0 ? (
            <p className="text-gray-400">No services added yet</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service: any) => (
                <div
                  key={service.id}
                  className="border rounded-lg p-4"
                  onClick={() =>
                    window.open(`/${slug}/${service.id}`, "_blank")
                  }
                >
                  <h3 className="font-semibold">{service.name}</h3>

                  <p className="text-sm text-gray-500">
                    {service.durationMins} minutes
                  </p>

                  <p className="font-medium">₦{service.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white text-3xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Booking Section */}

        {/* <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>

          Your booking component here
        </div> */}
      </div>
      <Footer user={vendorUser} />
    </div>
  );
}
