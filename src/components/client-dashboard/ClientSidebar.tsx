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
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-black text-white p-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          className="text-xl"
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
        className={`fixed inset-y-0 left-0 top-16 md:top-0 w-64 bg-white text-black p-6 transform transition-transform duration-300 z-40 
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-y-auto
        `}
      >
        <div className="my-6">
          <Logo />
        </div>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={
                  "flex items-center gap-3 px-3 py-2 rounded-[12px] transition " +
                  (active
                    ? "bg-blue-800 text-white font-semibold"
                    : "hover:bg-blue-800")
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
