import Loader from "../../ui/Loader";
import { ArrowUp } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  isLoadingStats?: boolean;
  icon?: React.ReactNode;
  color?: "purple" | "green" | "orange" | "blue";
  change?: string;
};

export function StatCard({
  title,
  value,
  isLoadingStats,
  icon,
  color = "purple",
  change,
}: StatCardProps) {
  const colors = {
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl p-5 border hover:shadow-md transition">
      {/* TOP ROW */}
      <div className="flex items-start justify-between">
        {/* TEXT */}
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="text-2xl font-semibold mt-1 text-gray-900">
            {isLoadingStats ? <Loader /> : value}
          </h2>
        </div>

        {/* ICON */}
        {icon && (
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-xl ${colors[color].bg} ${colors[color].text}`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* CHANGE TEXT */}
      {change && !isLoadingStats && (
        <p className="text-sm text-green-600 mt-4 flex items-center gap-1">
          <ArrowUp className="w-4 h-4" />
          {change}
        </p>
      )}
    </div>
  );
}
