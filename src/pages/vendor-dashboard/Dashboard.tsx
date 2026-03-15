import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../../components/landing-page/Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 bg-gray-50 p-6 pt-4 scroll">
        <Outlet />
      </main>
    </div>
  );
}
