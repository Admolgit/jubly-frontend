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
} from "lucide-react";
import Logo from "../logo";

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

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-black text-white p-4 z-50">
        <Logo />

        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`top-16 md:top-0 left-0 min-h-screen w-64 bg-black text-white p-6
        transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
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
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-800"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
