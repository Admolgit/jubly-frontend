/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  Settings,
  Menu,
} from "lucide-react";
import Logo from "../logo";
import { useSelector } from "react-redux";
import ProfileCard from "../logoutProfile";

const menu = [
  { name: "Dashboard", path: "/client-dashboard", icon: LayoutDashboard },
  { name: "Bookings", path: "/client-dashboard/bookings", icon: BookOpen },
  { name: "Calendar", path: "/client-dashboard/calendar", icon: Calendar },
  { name: "Vendors", path: "/client-dashboard/vendors", icon: Users },
  { name: "Settings", path: "/client-dashboard/settings", icon: Settings },
];

export function ClientSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const location = useLocation();
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between border-b border-gray-100 bg-white p-4 text-gray-950 z-50 transition-colors dark:border-gray-800 dark:bg-gray-950 dark:text-white">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          className="rounded-lg border border-gray-200 p-2 dark:border-gray-700"
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
        className={`fixed inset-y-0 left-0 top-16 md:top-0 w-64 border-r border-gray-100 bg-white p-6 text-gray-950 shadow-sm transform transition-transform duration-300 z-40 dark:border-gray-800 dark:bg-gray-950 dark:text-white
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
                    : "text-gray-900 hover:bg-purple-50 hover:text-purple-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white")
                }
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <ProfileCard handleLogout={handleLogout} user={user} />
        </div>
      </aside>
    </>
  );
}
