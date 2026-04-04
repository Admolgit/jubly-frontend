import Loader from "../ui/Loader";

export function StatCard({
  title,
  value,
  isLoadingStats,
}: {
  title: string;
  value: string;
  isLoadingStats?: boolean;
}) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{title}</p>
      <h2 className="text-2xl font-semibold mt-2 text-gray-900">
        {isLoadingStats ? <Loader /> : value}
      </h2>
    </div>
  );
}
