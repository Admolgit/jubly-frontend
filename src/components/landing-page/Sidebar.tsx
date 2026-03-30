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
} from "lucide-react";
import Logo from "../logo";
import { useSelector } from "react-redux";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Calendar", path: "/dashboard/calendar", icon: Calendar },
  { name: "Bookings", path: "/dashboard/bookings", icon: BookOpen },
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
        className={`fixed inset-y-0 left-0 top-16 md:top-0 w-64 sm:w-2 md:w-64 bg-white text-black p-6 relative
        transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 overflow-y-auto`}
      >
        <div className="my-6 ">
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
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  active
                    ? "bg-blue-800 text-white font-semibold"
                    : "hover:bg-blue-800"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="bg-gray-800 rounded-2xl p-4 flex items-center justify-between shadow-lg mt-10">
          <div className="flex items-center gap-3">
            <img
              src={vendor?.profileImage}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">{vendor?.businessName}</p>
              <p className="text-xs text-gray-400">{vendor?.category}</p>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}














