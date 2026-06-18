/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  User2Icon,
  LockIcon,
  SettingsIcon,
  Mail,
  MessageSquare,
  Bell,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import ChangePassword from "../../pages/ChangePassword";
import VendorUserModal from "../ui/VendorUserModal";
import { useSelector } from "react-redux";
import {
  useGetNotificationQuery,
  useUpdateNotificationMutation,
  useUpdateProfileImageMutation,
} from "../../features/users/userApi";
import toast from "react-hot-toast";
import {
  SectionHeader,
  Toggle,
  type SettingItem,
} from "../vendor-dashboard/Settings";
import Loader from "../ui/Loader";

const notifications: SettingItem[] = [
  {
    title: "Email Notifications",
    desc: "Bookings, offers, and account updates",
    icon: Mail,
  },
  {
    title: "SMS Notifications",
    desc: "Reminders and urgent booking alerts",
    icon: MessageSquare,
  },
  {
    title: "Push Notifications",
    desc: "Instant updates on your dashboard devices",
    icon: Bell,
  },
];

export function ClientSettings() {
  const navigate = useNavigate();
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const vendor = useSelector(
    (state: { vendor: { vendor: any } }) => state.vendor?.vendor,
  );

  const [updateProfileImage] = useUpdateProfileImageMutation();
  const { data: notificationData, isLoading: notificationLoading } =
    useGetNotificationQuery({});
  const [updateNotification, { isLoading: updatingNotification }] =
    useUpdateNotificationMutation({});
  const mainData = notificationData?.data?.result;

  const [openChange, setOpenChange] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    "Email Notifications": mainData?.emailNotifications ?? true,
    "SMS Notifications": mainData?.smsNotifications ?? false,
    "Push Notifications": mainData?.pushNotifications ?? true,
  });
  const [bookingDigest, setBookingDigest] = useState(
    mainData?.bookingDigest ?? "WEEKLY",
  );

  const toggleNotification = (title: keyof typeof notificationSettings) => {
    setNotificationSettings((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  const cards = [
    {
      id: 1,
      title: "Client Profile",
      description: "View and update your personal details",
      url: "profile",
      icon: <User2Icon className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Change Password",
      description: "Update your account password",
      url: "true",
      icon: <LockIcon className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Preferences",
      description: "Manage notifications and app settings",
      url: "notifications",
      icon: <SettingsIcon className="w-5 h-5" />,
    },
  ];

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(e.target.files);
    const payload = {
      profileImage: file,
    };

    const res = await updateProfileImage(payload).unwrap();
    if (res.status === 200) {
      toast.success("Profile image updated successfully");
    }
  };

   const handleNotification = async () => {
      try {
        // if (activeTab === "notifications") {
          const payload = {
            emailNotifications: notificationSettings["Email Notifications"],
            smsNotifications: notificationSettings["SMS Notifications"],
            pushNotifications: notificationSettings["Push Notifications"],
            bookingDigest: bookingDigest,
          };
          const res = await updateNotification(payload).unwrap();
  
          if (res.status === 200) {
            toast.success("Notification set successfully.");
          }
        // }
      } catch (error) {
        console.log(error);
      }
    };

  const handleSaveVendor = (updatedVendor: any) => {
    // Handle the updated vendor information here (e.g., send to API, update state)
    console.log("Updated Vendor Info:", updatedVendor);
    setOpenProfile(false); // Close the modal after saving
  };

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              if (card.url === "true") {
                setOpenChange(true);
              } else if (card.url === "profile") {
                setOpenProfile(true);
              } else if (card.url === "notifications") {
                setActiveTab(true);
              } else {
                navigate(card.url, { replace: true });
              }
            }}
            className="bg-white p-6 rounded-xl border hover:shadow-md transition cursor-pointer group"
          >
            {/* Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      <Modal open={openChange} onClose={() => setOpenChange(false)} title="">
        <ChangePassword setOpenChange={setOpenChange} />
      </Modal>
      <Modal
        title=""
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        size="lg"
      >
        <VendorUserModal
          onSave={handleSaveVendor}
          vendor={vendor}
          user={user}
          handleSelectImage={handleSelectImage}
        />
      </Modal>
      <Modal
        title=""
        open={activeTab}
        onClose={() => setActiveTab(false)}
        size="lg"
      >
        <section className="overflow-hidden md:w-[70%] lg:w-[70%] rounded-[10px] border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
          {/* {activeTab === "notifications" && ( */}
          <>
            <SectionHeader
              title="Notifications"
              description="Choose how Jubly should notify you about bookings, reminders, client actions, and account updates."
            />

            {notificationLoading ? (
              <Loader />
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  const notificationKey =
                    item.title as keyof typeof notificationSettings;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center justify-between gap-4 px-6 py-5"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                          <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-gray-950 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <Toggle
                        enabled={notificationSettings[notificationKey]}
                        onToggle={() => toggleNotification(notificationKey)}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="bg-gray-50 px-6 py-5 dark:bg-gray-900">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-950 dark:text-white">
                      Booking digest
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Receive a daily summary of upcoming bookings and recent
                      client activity.
                    </p>
                  </div>

                  <select
                    value={bookingDigest}
                    onChange={(e) => setBookingDigest(e.target.value)}
                    className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:focus:ring-blue-950"
                  >
                    <option value="EVERY_MORNING">Every morning</option>

                    <option value="EVERY_EVENING">Every evening</option>

                    <option value="WEEKLY">Weekly</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handleNotification}
                className="inline-flex items-center mt-4 gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 h-10 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                {updatingNotification ? "Submitting..." : "Save Changes"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
          {/* )} */}
        </section>
      </Modal>
    </div>
  );
}
