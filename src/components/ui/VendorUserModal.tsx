/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  Wallet,
  Calendar,
  Shield,
  CheckCircle2,
  User,
} from "lucide-react";
import Input from "./Input";
import { formatDate } from "../utils/dateFormatter";
import { useGetActivityLogsQuery } from "../../features/users/userApi";

interface VendorUserModalProps {
  vendor: any;
  onSave?: (data: any) => void;
  user?: any;
  handleSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VendorUserModal({
  vendor,
  onSave,
  user,
  handleSelectImage,
}: VendorUserModalProps) {
  const { data: activityLogs } = useGetActivityLogsQuery({});
  const [activeTab, setActiveTab] = useState<"info" | "activity">("info");

  const [formData, setFormData] = useState({
    businessName: vendor?.businessName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: vendor?.address || "",
    city: vendor?.city || "",
    state: vendor?.state || "",
    country: vendor?.country || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-600";
      case "purple":
        return "bg-purple-100 text-purple-600";
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "indigo":
        return "bg-indigo-100 text-indigo-600";
      case "pink":
        return "bg-pink-100 text-pink-600";
      case "red":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex items-start justify-between border-b px-8 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Vendor Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and update vendor details
          </p>
        </div>
      </div>

      <div className="grid min-h-[650px] grid-cols-[300px_1fr]">
        <div className="border-r bg-gray-50 p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              {vendor?.profileImage ? (
                <img
                  src={vendor.profileImage}
                  alt="profile image"
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-100 text-3xl font-bold text-purple-600"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-100 text-3xl font-bold text-purple-600">
                  {vendor?.businessName?.split(" ")?.[0]?.charAt(0) ||
                    user?.firstName?.split(" ")?.[0]?.charAt(0)}
                  {vendor?.businessName?.split(" ")?.[1]?.charAt(0) ||
                    user?.lastName?.split(" ")?.[0]?.charAt(0)}
                </div>
              )}

              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleSelectImage}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 rounded-full border bg-white p-2 shadow hover:bg-gray-50"
                >
                  <Camera size={14} />
                </button>
              </>
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              {vendor?.businessName}
            </h3>

            <span className="mt-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Active
            </span>

            <p className="mt-4 text-sm text-gray-500">
              {user?.role === "CLIENT" ? "Client" : "Vendor"} since{" "}
              {formatDate(user?.createdAt)}
            </p>
          </div>

          <div className="my-6 border-t" />

          <div className="space-y-5">
            <InfoItem
              icon={<Shield size={18} />}
              label={user?.role === "CLIENT" ? "User ID" : "Vendor ID"}
              value={user?.role === "CLIENT" ? user?.id : vendor?.id}
            />

            <InfoItem
              icon={<Mail size={18} />}
              label="Email"
              value={user?.email}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Phone"
              value={user?.phone}
            />

            <InfoItem
              icon={<Calendar size={18} />}
              label="Bookings"
              value={vendor?.bookingsCount || 0}
            />

            <InfoItem
              icon={<Wallet size={18} />}
              label="Revenue"
              value={`₦${Number(vendor?.revenue || 0).toLocaleString()}`}
            />
          </div>

          <div className="mt-8 rounded-2xl border bg-white p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-600" />

              <span className="font-medium text-green-700">
                {user?.role === "CLIENT" ? "" : "Verified Vendor"}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              This {user?.role === "CLIENT" ? "client" : "vendor"} can{" "}
              {user?.role === "CLIENT" ? "initiate" : "receive"} bookings and
              payments.
            </p>
          </div>

          {/* <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-600 hover:bg-red-50">
            <Trash2 size={16} />
            Deactivate Vendor
          </button> */}
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center justify-between border-b px-8">
            <div className="flex gap-10">
              <button
                onClick={() => setActiveTab("info")}
                className={`border-b-2 py-5 text-sm font-medium ${
                  activeTab === "info"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500"
                }`}
              >
                Edit Information
              </button>

              <button
                onClick={() => setActiveTab("activity")}
                className={`border-b-2 py-5 text-sm font-medium ${
                  activeTab === "activity"
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500"
                }`}
              >
                Activity Log
              </button>
            </div>

            {/* <button className="flex items-center gap-2 rounded-xl border border-purple-200 px-4 py-2 text-sm font-medium text-purple-600">
              <ExternalLink size={16} />
              View Vendor
            </button> */}
          </div>

          {activeTab === "info" ? (
            <div className="grid grid-cols-2 gap-5 p-8">
              <Input
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />

              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              {/* <div className="col-span-2">
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div> */}
            </div>
          ) : (
            <div className="space-y-4 p-8">
              {activityLogs?.data?.map((activity: any, index: number) => {
                return (
                  <div key={index} className="rounded-2xl border p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ${getColor(
                            activity.color,
                          )}`}
                        >
                          <User size={18} />
                        </div>

                        <div>
                          <h4 className="font-semibold">{activity.action}</h4>

                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatDate(activity.createdAt)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {activity.actor}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "info" && (
            <div className="flex justify-end gap-4 border-t px-8 py-5">
              <button
                onClick={() => onSave?.(formData)}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-white"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>

        <p className="font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}
