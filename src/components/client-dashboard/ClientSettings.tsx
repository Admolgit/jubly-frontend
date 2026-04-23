import { User2Icon, LockIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import ChangePassword from "../../pages/ChangePassword";

export function ClientSettings() {
  const navigate = useNavigate();
  const [openChange, setOpenChange] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Client Profile",
      description: "View and update your personal details",
      url: "/client-dashboard/settings/profile",
      icon: <User2Icon className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Change Password",
      description: "Update your account password",
      url: "true",
      icon: <LockIcon className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Preferences",
      description: "Manage notifications and app settings",
      url: "/settings/preferences",
      icon: <SettingsIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold">Settings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              if (card.url === "true") {
                setOpenChange(true);
              } else {
                navigate(card.url, { replace: true });
              }
            }}
            className="bg-white p-6 rounded-xl border hover:shadow-md transition cursor-pointer group"
          >
            {/* Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      <Modal open={openChange} onClose={() => setOpenChange(false)} title="">
        <ChangePassword setOpenChange={setOpenChange} />
      </Modal>
    </div>
  );
}
