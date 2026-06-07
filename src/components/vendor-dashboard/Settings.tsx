/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Monitor,
  Palette,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  useGetNotificationQuery,
  useUpdateNotificationMutation,
  useUpdateProfileImageMutation,
} from "../../features/users/userApi";
import Loader from "../ui/Loader";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import PoliciesPage from "../../pages/PrivacyPage";
import TermsOfServicePage from "../../pages/TermsOfServicesPage";
import { useTheme } from "../../theme/ThemeContext";
import { useChangePasswordMutation } from "../../features/auth/authApi";
import { useSelector } from "react-redux";
import VendorUserModal from "../ui/VendorUserModal";

type SettingsTab =
  | "notifications"
  | "password"
  | "security"
  | "account"
  | "appearance"
  | "support";

type SettingItem = {
  title: string;
  desc: string;
  icon: typeof Bell;
};

const tabs: {
  id: SettingsTab;
  label: string;
  description: string;
  icon: typeof Bell;
}[] = [
  {
    id: "notifications",
    label: "Notifications",
    description: "Booking alerts and channel preferences",
    icon: Bell,
  },
  {
    id: "password",
    label: "Change Password",
    description: "Update account access",
    icon: Lock,
  },
  {
    id: "security",
    label: "Security",
    description: "Devices and account protection",
    icon: ShieldCheck,
  },
  {
    id: "account",
    label: "Account Information",
    description: "Profile, address, and payment methods",
    icon: User,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Workspace display preferences",
    icon: Palette,
  },
  {
    id: "support",
    label: "Support & Help",
    description: "Help center, policies, and contact",
    icon: CircleHelp,
  },
];

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

const securityItems: SettingItem[] = [
  {
    title: "Two-Factor Authentication",
    desc: "Add an extra layer of protection",
    icon: Lock,
  },
  {
    title: "Login Activity",
    desc: "Review recent access to your account",
    icon: Clock3,
  },
  {
    title: "Devices",
    desc: "Manage connected sessions and browsers",
    icon: Monitor,
  },
];

const accountItems: SettingItem[] = [
  {
    title: "Personal Details",
    desc: "Name, email, and phone number",
    icon: User,
  },
  {
    title: "Address",
    desc: "Manage your business location",
    icon: MapPin,
  },
  {
    title: "Payment Methods",
    desc: "Manage cards, wallets, and payout options",
    icon: CreditCard,
  },
];

const supportItems: SettingItem[] = [
  {
    title: "Help Center",
    desc: "Browse articles and service guides",
    icon: CircleHelp,
  },
  {
    title: "Contact Support",
    desc: "Get help from the Jubly team",
    icon: MessageCircle,
  },
  {
    title: "Privacy Policy",
    desc: "Review how your business data is handled",
    icon: Shield,
  },
  {
    title: "Terms of Service",
    desc: "Read platform terms and obligations",
    icon: FileText,
  },
];

function Toggle({
  enabled = true,
  onToggle,
}: {
  enabled?: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={onToggle}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "right-1" : "left-1"
        }`}
      />
    </button>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
        {title}
      </h2>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

function ActionList({
  items,
  setPrivacy,
  setTerms,
  setProfileView,
}: {
  items: SettingItem[];
  setPrivacy?: (value: boolean) => void;
  setTerms?: (value: boolean) => void;
  setProfileView?: (value: boolean) => void;
}) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.title}
            type="button"
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-gray-50 dark:hover:bg-gray-900"
            onClick={() => {
              if (item.title === "Privacy Policy") {
                setPrivacy?.(true);
              } else if (item.title === "Terms of Service") {
                setTerms?.(true);
              } else if (item.title === "Personal Details") {
                setProfileView?.(true);
              }
            }}
          >
            <span className="flex min-w-0 items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-medium text-gray-950 dark:text-white">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                  {item.desc}
                </span>
              </span>
            </span>

            <ChevronRight className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-600" />
          </button>
        );
      })}
    </div>
  );
}

export function Settings() {
  const { theme, setTheme } = useTheme();
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const vendor = useSelector(
    (state: { vendor: { vendor: any } }) => state.vendor?.vendor,
  );
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const { data: notificationData, isLoading: notificationLoading } =
    useGetNotificationQuery({});
  const [updateNotification, { isLoading: updatingNotification }] =
    useUpdateNotificationMutation({});
  const [changePassword, { isLoading: passwordChangeLoading }] =
    useChangePasswordMutation();
  const mainData = notificationData?.data?.result;
  const [activeTab, setActiveTab] = useState<SettingsTab>("notifications");
  const [profileView, setProfileView] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    "Email Notifications": mainData?.emailNotifications ?? true,
    "SMS Notifications": mainData?.smsNotifications ?? false,
    "Push Notifications": mainData?.pushNotifications ?? true,
  });
  const [bookingDigest, setBookingDigest] = useState(
    mainData?.bookingDigest ?? "WEEKLY",
  );
  const [visiblePasswordFields, setVisiblePasswordFields] = useState({
    "Current Password": false,
    "New Password": false,
    "Confirm New Password": false,
  });

  const [passwordFields, setPasswordFields] = useState({
    "Current Password": "",
    "New Password": "",
    "Confirm New Password": "",
  });
  const [policy, setPolicy] = useState(false);
  const [terms, setTerms] = useState(false);

  const activeTabMeta = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );

  const toggleNotification = (title: keyof typeof notificationSettings) => {
    setNotificationSettings((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  const togglePasswordVisibility = (
    label: keyof typeof visiblePasswordFields,
  ) => {
    setVisiblePasswordFields((current) => ({
      ...current,
      [label]: !current[label],
    }));
  };

  const handlePasswordChange = async () => {
    const payload = {
      currentPassword: passwordFields["Current Password"],
      newPassword: passwordFields["New Password"],
      confirmPassword: passwordFields["Confirm New Password"],
      userId: user?.id,
    };

    try {
      const res = await changePassword(payload).unwrap();
      console.log({ res, passwordFields });
      if (res.status === 200) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(e.target.files);

    // const formData = new FormData();

    // formData.append("profileImage", file as Blob);

    // console.log(formData);
    const payload = {
      profileImage: file,
    }

    console.log({ payload });

    const res = await updateProfileImage(payload).unwrap();
    if (res.status === 200) {
      toast.success("Profile image updated successfully");
    }
  };

  const handleNotification = async () => {
    try {
      if (activeTab === "notifications") {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveVendor = (updatedVendor: any) => {
    // Handle the updated vendor information here (e.g., send to API, update state)
    console.log("Updated Vendor Info:", updatedVendor);
    setProfileView(false); // Close the modal after saving
  };

  return (
    <>
      <div className="min-h-screen rounded-[14px] bg-transparent py-4 transition-colors dark:bg-gray-950">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-950 dark:text-white">
              Settings
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your business profile, notifications, security, and payout
              preferences.
            </p>
          </div>
          <div>
            <button
              onClick={handleNotification}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 h-10 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              {updatingNotification ? "Submitting..." : "Save Changes"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 w-full gap-6 md:flex lg:flex">
          <aside className="rounded-[10px] border border-gray-200 bg-white p-2 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950 md:w-[30%] lg:w-[30%]">
            <div className="px-3 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Settings sections
              </p>
            </div>

            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                        isActive
                          ? "border-blue-100 bg-white dark:border-blue-900 dark:bg-gray-900"
                          : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {tab.label}
                      </span>
                      <span
                        className={`mt-1 block text-xs leading-5 ${
                          isActive
                            ? "text-blue-600 dark:text-blue-300"
                            : "text-gray-500 dark:text-gray-500"
                        }`}
                      >
                        {tab.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="overflow-hidden md:w-[70%] lg:w-[70%] rounded-[10px] border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-950">
            {activeTab === "notifications" && (
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
                          Receive a daily summary of upcoming bookings and
                          recent client activity.
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
              </>
            )}

            {activeTab === "password" && (
              <>
                <SectionHeader
                  title="Change Password"
                  description="Update your password regularly to keep your vendor account secure."
                />

                <div className="max-w-xl px-6 py-6">
                  <div className="space-y-2">
                    {[
                      "Current Password",
                      "New Password",
                      "Confirm New Password",
                    ].map((label) => {
                      const passwordKey =
                        label as keyof typeof visiblePasswordFields;
                      const isVisible = visiblePasswordFields[passwordKey];
                      const VisibilityIcon = isVisible ? Eye : EyeOff;

                      return (
                        <div key={label} className="relative">
                          <Input
                            label={label}
                            type={isVisible ? "text" : "password"}
                            value={
                              passwordFields[
                                label as keyof typeof passwordFields
                              ]
                            }
                            onChange={(e) =>
                              setPasswordFields((prev) => ({
                                ...prev,
                                [label]: e.target.value,
                              }))
                            }
                            placeholder={
                              label === "Current Password"
                                ? "Enter current password"
                                : label === "New Password"
                                  ? "Enter new password"
                                  : "Confirm new password"
                            }
                            className="h-11 w-full rounded-lg border-gray-200 bg-white px-3 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-blue-950"
                          />
                          <button
                            type="button"
                            aria-label={
                              isVisible
                                ? `Hide ${label.toLowerCase()}`
                                : `Show ${label.toLowerCase()}`
                            }
                            onClick={() =>
                              togglePasswordVisibility(passwordKey)
                            }
                            className="absolute right-3 top-9 flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          >
                            <VisibilityIcon className="h-5 w-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    onClick={handlePasswordChange}
                    className="flex justify-center text-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 h-10 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    {passwordChangeLoading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <>
                <SectionHeader
                  title="Security"
                  description="Review account protection settings, recent activity, and connected devices."
                />
                <ActionList items={securityItems} />
              </>
            )}

            {activeTab === "account" && (
              <>
                <SectionHeader
                  title="Account Information"
                  description="Keep business contact, location, and payment details accurate for clients and payouts."
                />
                <ActionList
                  items={accountItems}
                  setProfileView={setProfileView}
                />
              </>
            )}

            {activeTab === "appearance" && (
              <>
                <SectionHeader
                  title="Appearance"
                  description="Adjust workspace display preferences for the way you work."
                />

                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-950 dark:text-white">
                        Theme
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Choose your preferred interface theme
                      </p>
                    </div>
                    <select
                      value={theme}
                      onChange={(event) =>
                        setTheme(event.target.value as "light" | "dark")
                      }
                      className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:focus:ring-blue-950"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-950 dark:text-white">
                        Language
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Select your preferred workspace language
                      </p>
                    </div>
                    <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:focus:ring-blue-950">
                      <option>English</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-950 dark:text-white">
                        Text Size
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Adjust text size for better readability
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {["A-", "A", "A+"].map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium ${
                            size === "A"
                              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "support" && (
              <>
                <SectionHeader
                  title="Support & Help"
                  description="Find resources, contact support, and review policy documents for your business account."
                />
                <ActionList
                  items={supportItems}
                  setPrivacy={setPolicy}
                  setTerms={setTerms}
                />
              </>
            )}
          </section>
        </div>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-600">
          Currently viewing {activeTabMeta.label.toLowerCase()} settings.
        </p>
      </div>
      <div>
        <Modal
          title=""
          open={profileView}
          onClose={() => setProfileView(false)}
          size="lg"
        >
          <VendorUserModal
            onSave={handleSaveVendor}
            vendor={vendor}
            user={user}
            handleSelectImage={handleSelectImage}
          />
        </Modal>
      </div>
      <div>
        <Modal
          title="Privacy Policy"
          open={policy}
          onClose={() => setPolicy(false)}
          size="lg"
        >
          <PoliciesPage />
        </Modal>
        <Modal
          title="Terms of Service"
          open={terms}
          onClose={() => setTerms(false)}
          size="lg"
        >
          <TermsOfServicePage />
        </Modal>
      </div>
    </>
  );
}
