import {
  Wallet,
  Check,
  Clock3,
  X,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useGetTransactionDashStatsQuery } from "../../../features/transactions/transactionAPI";
import Loader from "../../ui/Loader";

export default function PayoutSummary() {
  const { data: transactionDashStats, isLoading: statsLoading } =
      useGetTransactionDashStatsQuery({});
  
    if(statsLoading) {
      return <Loader />
    }
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* LEFT CARD */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f4f2ff] flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-[#6C47FF] border-dashed"></div>
              </div>

              <h2 className="text-md font-semibold text-[#111827]">
                Payout Summary
              </h2>
            </div>

            <button className="h-11 px-4 border border-gray-200 rounded-xl flex items-center gap-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
              This Month
              <ChevronDown size={18} />
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* TOTAL PAYOUTS */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                <Wallet className="text-green-600" size={18} />
              </div>

              <p className="text-sm text-gray-500 mb-2">Total Payouts</p>

              <h3 className="text-2xl leading-none font-bold text-[#111827] mb-3">
                {Number(transactionDashStats.totalPayouts).toLocaleString()}
              </h3>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 font-semibold">{`${transactionDashStats.totalGrowth}%`}</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>

            {/* COMPLETED */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                <Check className="text-green-600" size={18} />
              </div>

              <p className="text-sm text-gray-500 mb-2">Completed</p>

              <h3 className="text-2xl leading-none font-bold text-[#111827] mb-3">
                {Number(transactionDashStats.completed).toLocaleString()}
              </h3>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 font-semibold">{`${transactionDashStats.completedGrowth}%`}</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>

            {/* PROCESSING */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
                <Clock3 className="text-orange-500" size={20} />
              </div>

              <p className="text-sm text-gray-500 mb-2">Processing</p>

              <h3 className="text-2xl leading-none font-bold text-[#111827] mb-3">
                {Number(transactionDashStats.processing).toLocaleString()}
              </h3>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-orange-500 font-semibold">{`${transactionDashStats.processingGrowth}%`}</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>

            {/* FAILED */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
                <X className="text-red-500" size={20} />
              </div>

              <p className="text-sm text-gray-500 mb-2">Failed</p>

              <h3 className="text-2xl leading-none font-bold text-[#111827] mb-3">
                {Number(transactionDashStats.failed).toLocaleString()}
              </h3>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 font-semibold">
                  {transactionDashStats.failedGrowth}%
                </span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl border border-[#ece8ff] flex items-center justify-center mb-6">
              <ShieldCheck className="text-[#6C47FF]" size={24} />
            </div>

            <h3 className="text-md font-semibold text-[#111827] mb-3">
              Secure & Reliable
            </h3>

            <p className="text-sm leading-8 text-gray-500 max-w-[280px]">
              Your payouts are protected with bank-level security.
            </p>
          </div>

          <button className="mt-10 flex items-center gap-3 text-[#6C47FF] font-semibold text-sm hover:gap-4 transition-all">
            Learn more
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
