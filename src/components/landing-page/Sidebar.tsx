/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Clock,
  Briefcase,
  Users,
  Wallet,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  DollarSign,
} from "lucide-react";
import Logo from "../logo";
import { useSelector } from "react-redux";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Bookings", path: "/dashboard/bookings", icon: BookOpen },
  { name: "Calendar", path: "/dashboard/calendar", icon: Calendar },
  { name: "transactions", path: "/dashboard/transactions", icon: DollarSign },
  { name: "Availability", path: "/dashboard/availability", icon: Clock },
  { name: "Services", path: "/dashboard/services", icon: Briefcase },
  { name: "Clients", path: "/dashboard/clients", icon: Users },
  { name: "Wallet", path: "/dashboard/wallet", icon: Wallet },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const location = useLocation();
  const vendor = useSelector(
    (state: { vendor: { vendor: any } }) =>
      state.vendor?.vendor,
  );

  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between border-b border-gray-100 bg-white p-4 text-gray-950 z-50">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          className="rounded-lg border border-gray-200 p-2"
        >
          <Menu size={20} />
        </button>
        <Logo />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 top-16 md:top-0 w-64 border-r border-gray-100 bg-white p-6 text-gray-950 shadow-sm transform transition-transform duration-300 z-40 
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-y-auto
        `}
      >
        <div className="mb-10 mt-2">
          <Logo />
        </div>

        <nav className="flex flex-col gap-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-md font-medium transition " +
                  (active
                    ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm"
                    : "text-gray-900 hover:bg-purple-50 hover:text-purple-700")
                }
              >
                <Icon size={18} strokeWidth={active ? 2.4 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-16 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={vendor?.profileImage}
              alt="profile"
              className="h-12 w-12 shrink-0 rounded-full border border-gray-100 object-cover"
            />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold text-gray-900">
                {vendor?.businessName || "Vendor"}
              </p>
              <p className="truncate text-sm text-gray-500">
                {vendor?.category || "Service Provider"}
              </p>
            </div>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-gray-500" />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}














