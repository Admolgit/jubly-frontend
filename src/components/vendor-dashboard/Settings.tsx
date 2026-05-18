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
// import { useSelector } from "react-redux";
// import Input from "../ui/Input";
// import { CopyDiv } from "./UrlCopy";

export function Settings() {
  // const slug = useSelector(
  //   (state: { auth: { user: { slug: string } } }) => state.auth.user.slug,
  // );
  return (
    <div className="py-4">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your business profile and payout preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
        {/* Notifications */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <Bell className="h-6 w-6 text-purple-600" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">Notifications</h3>

              <p className="mt-1 text-md leading-7 text-gray-500">
                Manage how you receive updates
                <br />
                about your bookings and offers.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {[
              {
                title: "Email Notifications",
                desc: "Bookings, offers and updates",
                icon: Mail,
              },
              {
                title: "SMS Notifications",
                desc: "Reminders and important alerts",
                icon: MessageSquare,
              },
              {
                title: "Push Notifications",
                desc: "Instant updates on your device",
                icon: Bell,
              },
            ].map((item, idx) => {
              const Icon = item.icon;

              return (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>

                  <button className="relative h-7 w-12 rounded-full bg-purple-600 transition">
                    <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white transition" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <button className="flex items-center gap-2 text-md font-semibold text-purple-600 transition hover:text-purple-700">
              Manage Preferences
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <Lock className="h-6 w-6 text-orange-500" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Change Password
              </h3>

              <p className="mt-1 text-md leading-7 text-gray-500">
                Update your password to keep
                <br />
                your account secure.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {["Current Password", "New Password", "Confirm New Password"].map(
              (label, idx) => (
                <div key={idx}>
                  <div className="relative">
                    <Input
                      label={label}
                      placeholder={
                        label === "Current Password"
                          ? "Enter current password"
                          : label === "New Password"
                            ? "Enter new password"
                            : "Confirm new password"
                      }
                      className="h-10 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-sm outline-none transition focus:border-purple-500"
                    />

                    <EyeOff className="absolute right-4 top-2/3 h-10 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              ),
            )}
          </div>

          <Button className="mt-8 h-10 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-md font-semibold text-white shadow-lg transition hover:opacity-90">
            Update Password
          </Button>
        </div>

        {/* Security */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <ShieldCheck className="h-6 w-6 text-green-500" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">Security</h3>

              <p className="mt-1 text-md leading-7 text-gray-500">
                Manage your account security
                <br />
                and privacy settings.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Two-Factor Authentication",
                desc: "Add an extra layer of security",
                icon: Lock,
              },
              {
                title: "Login Activity",
                desc: "View your recent login activity",
                icon: Clock3,
              },
              {
                title: "Devices",
                desc: "Manage devices connected to your account",
                icon: Monitor,
              },
            ].map((item, idx) => {
              const Icon = item.icon;

              return (
                <div
                  key={idx}
                  className="flex items-start justify-between border-b border-gray-100 pb-5 last:border-none"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900">
                        {item.title}
                      </h4>

                      <p className="max-w-xs text-sm text-gray-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="mt-2 h-5 w-5 text-gray-400" />
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <button className="flex items-center gap-2 text-lg font-semibold text-purple-600 transition hover:text-purple-700">
              Manage Security
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <User className="h-6 w-6 text-blue-500" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Account Information
              </h3>

              <p className="mt-1 text-md leading-7 text-gray-500">
                Update your personal information
                <br />
                and account details.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Personal Details",
                desc: "Name, email and phone number",
                icon: User,
              },
              {
                title: "Address",
                desc: "Manage your addresses",
                icon: MapPin,
              },
              {
                title: "Payment Methods",
                desc: "Manage cards and wallets",
                icon: CreditCard,
              },
            ].map((item, idx) => {
              const Icon = item.icon;

              return (
                <div
                  key={idx}
                  className="flex items-start justify-between border-b border-gray-100 pb-5 last:border-none"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>

                  <ChevronRight className="mt-2 h-5 w-5 text-gray-400" />
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <button className="flex items-center gap-2 text-md font-semibold text-purple-600 transition hover:text-purple-700">
              Edit Information
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
              <Palette className="h-6 w-6 text-pink-500" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">Appearance</h3>

              <p className="mt-1 text-md leading-7 text-gray-500">
                Customize how Jubly looks
                <br />
                for you.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">Theme</h4>

                <p className="text-sm text-gray-500">
                  Choose your preferred theme
                </p>
              </div>

              <select className="h-12 rounded-xl border border-gray-200 px-4 outline-none">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">Language</h4>

                <p className="text-sm text-gray-500">
                  Select your preferred language
                </p>
              </div>

              <select className="h-12 rounded-xl border border-gray-200 px-4 outline-none">
                <option>English</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">Text Size</h4>

                <p className="text-sm text-gray-500">
                  Adjust text size for better readability
                </p>
              </div>

              <div className="flex gap-2">
                {["A-", "A", "A+"].map((size, idx) => (
                  <button
                    key={idx}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-medium ${
                      size === "A"
                        ? "border-purple-200 bg-purple-100 text-purple-700"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <button className="flex items-center gap-2 text-md font-semibold text-purple-600 transition hover:text-purple-700">
              Save Preferences
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <CircleHelp className="h-6 w-6 text-purple-500" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Support & Help
              </h3>

              <p className="mt-1 text-md leading-7 text-gray-500">
                Get help and resources
                <br />
                whenever you need.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Help Center",
                desc: "Browse articles and guides",
                icon: CircleHelp,
              },
              {
                title: "Contact Support",
                desc: "Get in touch with our team",
                icon: MessageCircle,
              },
              {
                title: "Privacy Policy",
                desc: "Read our privacy policy",
                icon: Shield,
              },
              {
                title: "Terms of Service",
                desc: "Read our terms of service",
                icon: FileText,
              },
            ].map((item, idx) => {
              const Icon = item.icon;

              return (
                <div
                  key={idx}
                  className="flex items-start justify-between border-b border-gray-100 pb-5 last:border-none"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900">
                        {item.title}
                      </h4>

                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>

                  <ChevronRight className="mt-2 h-5 w-5 text-gray-400" />
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <button className="flex items-center gap-2 text-md font-semibold text-purple-600 transition hover:text-purple-700">
              View All Resources
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.7fr_0.3fr]">
        <div className="py-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Business Information</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="Business Name" placeholder="Jubly Beauty" />
              <Input label="Category" placeholder="Makeup Artist" />
              <Input label="Email" placeholder="hello@jubly.com" />
              <Input label="Phone" placeholder="+234 803 000 0000" />
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium">Bio</label>
              <textarea
                placeholder="Tell clients about your services"
                className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Business Address</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="Address" placeholder="12 Allen Avenue" />
              <Input label="City" placeholder="Lagos" />
              <Input label="State" placeholder="Lagos" />
              <Input label="Country" placeholder="Nigeria" />
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Profile Photo</h3>
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="h-24 w-24 rounded-full bg-gray-100" />
              <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Upload Photo
              </button>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Payout Details</h3>
            <div className="mt-4 space-y-3">
              <Input label="Bank Name" placeholder="Jubly Bank" />
              <Input label="Account Number" placeholder="0123456789" />
              <Input label="Account Name" placeholder="Jubly Beauty" />
            </div>
          </div>
          <CopyDiv text={slug} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-lg border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          Cancel
        </button>
        <button className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800">
          Save Changes
        </button>
      </div> */}
    </div>
  );
}
