// components/availability/PreferenceItem.tsx
import { ChevronRight } from "lucide-react";

export default function PreferenceItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Icon circle */}
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
          {icon}
        </div>

        {/* Text */}
        <div>
          <p className="text-sm font-medium text-gray-900  dark:text-white">
            {title}
          </p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>

      {/* RIGHT arrow */}
      <ChevronRight size={16} className="text-gray-400" />
    </div>
  );
}
