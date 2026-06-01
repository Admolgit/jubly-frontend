import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../../components/landing-page/Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-950 transition-colors dark:bg-gray-950 dark:text-gray-100 md:h-screen md:overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 bg-gray-50 px-4 py-6 pt-24 transition-colors dark:bg-gray-950 sm:px-6 lg:px-8 md:pt-6 md:ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}






