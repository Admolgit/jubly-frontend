import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ClientSidebar } from "../../components/client-dashboard/ClientSidebar";

export default function ClientDashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full md:h-screen md:overflow-hidden">
      <ClientSidebar open={open} setOpen={setOpen} />

      <main className="flex-1 bg-gray-50 px-4 py-6 pt-20 sm:px-6 md:pt-6 md:ml-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
