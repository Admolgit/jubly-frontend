export function StatCard({ title, value }: { title: string; value: string}) {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
