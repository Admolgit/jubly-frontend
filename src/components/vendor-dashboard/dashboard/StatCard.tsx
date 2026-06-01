import Loader from "../../ui/Loader";
import { ArrowDown, ArrowUp } from "lucide-react";

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
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-black">
      <div className="flex items-center gap-4">
        {icon && (
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${colors[color].bg} ${colors[color].text}`}
          >
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="text-2xl font-semibold mt-1 text-gray-900  dark:text-white">
            {isLoadingStats ? <Loader /> : value}
          </h2>
        </div>
      </div>

      {change && !isLoadingStats && (
        <p className="text-sm mt-4 flex items-center gap-1">
          {change.toString().includes("-") ? (
            <ArrowDown className="w-4 h-4 text-red-600" />
          ) : (
            <ArrowUp className="w-4 h-4 text-green-600" />
          )}
          {change}
        </p>
      )}
    </div>
  );
}
