/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOut } from "lucide-react";

export default function ProfileCard({ handleLogout, user }: any) {
  return (
    <div className="rounded-2xl bg-white shadow-md p-5 border">
      <div className="flex items-center gap-4 mb-5">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold">
            {user?.firstName?.[0] || user?.email?.[0] || "U"}
          </div>
          {/* <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover"
          /> */}
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </div>

        {/* User Info */}
        <div>
          <h2 className="font-semibold text-md text-gray-900">
            {user?.firstName || "Client"}
          </h2>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="w-full flex items-center text-sm justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
