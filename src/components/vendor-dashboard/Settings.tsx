import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
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

function Toggle({ enabled = true }: { enabled?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-gray-200"
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
    <div className="border-b border-gray-100 px-6 py-5">
      <h2 className="text-lg font-semibold text-gray-950">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

function ActionList({ items }: { items: SettingItem[] }) {
  return (
    <div className="divide-y divide-gray-100">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.title}
            type="button"
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-gray-50"
          >
            <span className="flex min-w-0 items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white">
                <Icon className="h-5 w-5 text-gray-700" />
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-medium text-gray-950">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  {item.desc}
                </span>
              </span>
            </span>

            <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
          </button>
        );
      })}
    </div>
  );
}

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("notifications");

  const activeTabMeta = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );

  return (
    <div className="py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your business profile, notifications, security, and payout
            preferences.
          </p>
        </div>
        <div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 h-10 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
            Save Changes
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <aside className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
          <div className="px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
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
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-950"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                      isActive
                        ? "border-blue-100 bg-white"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-blue-700" : "text-gray-500"
                      }`}
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {tab.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs leading-5 ${
                        isActive ? "text-blue-600" : "text-gray-500"
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

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          {activeTab === "notifications" && (
            <>
              <SectionHeader
                title="Notifications"
                description="Choose how Jubly should notify you about bookings, reminders, client actions, and account updates."
              />

              <div className="divide-y divide-gray-100">
                {notifications.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center justify-between gap-4 px-6 py-5"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white">
                          <Icon className="h-5 w-5 text-gray-700" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-gray-950">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <Toggle enabled={index !== 1} />
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 px-6 py-5">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-950">
                        Booking digest
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Receive a daily summary of upcoming bookings and recent
                        client activity.
                      </p>
                    </div>

                    <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <option>Every morning</option>
                      <option>Every evening</option>
                      <option>Weekly</option>
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
                  ].map((label) => (
                    <div key={label} className="relative">
                      <Input
                        label={label}
                        type="password"
                        placeholder={
                          label === "Current Password"
                            ? "Enter current password"
                            : label === "New Password"
                              ? "Enter new password"
                              : "Confirm new password"
                        }
                        className="h-11 w-full rounded-lg border-gray-200 bg-white px-3 pr-11 text-sm outline-none transition focus:border-blue-500 focus:ring-blue-100"
                      />
                      <EyeOff className="absolute right-3 top-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>

                <Button className="flex text-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 h-10 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
                  Update Password
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
              <ActionList items={accountItems} />
            </>
          )}

          {activeTab === "appearance" && (
            <>
              <SectionHeader
                title="Appearance"
                description="Adjust workspace display preferences for the way you work."
              />

              <div className="divide-y divide-gray-100">
                <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-950">Theme</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Choose your preferred interface theme
                    </p>
                  </div>
                  <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-950">
                      Language
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select your preferred workspace language
                    </p>
                  </div>
                  <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                    <option>English</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-950">
                      Text Size
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
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
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
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
              <ActionList items={supportItems} />
            </>
          )}
        </section>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Currently viewing {activeTabMeta.label.toLowerCase()} settings.
      </p>
    </div>
  );
}
