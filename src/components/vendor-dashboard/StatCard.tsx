export function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{title}</p>
      <h2 className="text-2xl font-semibold mt-2 text-gray-900">{value}</h2>
    </div>
  );
}
