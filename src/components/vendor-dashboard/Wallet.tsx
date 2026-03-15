import { StatCard } from "./StatCard";

export function Wallet() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Wallet</h1>

      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Earned" value="₦120,000" />
        <StatCard title="Available" value="₦40,000" />
        <StatCard title="Pending" value="₦20,000" />
      </div>

      <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
        Withdraw to Bank
      </button>
    </div>
  );
}
