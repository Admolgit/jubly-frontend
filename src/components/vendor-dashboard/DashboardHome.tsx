import { useDispatch } from "react-redux";
import { CalendarSyncStatus } from "./CalenderSyncStatus";
import { EarningsChart } from "./EarningsChart";
import { StatCard } from "./StatCard";
import { useGetVendorProfileByIdQuery } from "../../features/vendor/vendorApi";
import { useEffect } from "react";
import { setVendorCredentials } from "../../features/vendor/vendorSlice";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  slug: string;
}

export const lightPurple = "#C271AC";
export const darkPurple = "#77467D";
export function DashboardHome() {
  const dispatch = useDispatch();
  const { data: vendorData, isLoading: vendorByUserIdLoading } =
    useGetVendorProfileByIdQuery({});
  // const user = useSelector(
  //   (state: { auth: { user: IUser } }) => state.auth.user,
  // );

  useEffect(() => {
    dispatch(setVendorCredentials({ vendor: vendorData?.data?.vendor }));
  }, [vendorData, dispatch]);
  return (
    <div className="space-y-6">
      <h1 className="text-[20px] font-semibold">Dashboard</h1>

      {vendorByUserIdLoading ? (
        "loading..."
      ) : (
        <div className="text-[16px] ">
          Welcome,{" "}
          <span className="text-[#C271AC] ">
            {vendorData?.data?.vendor?.businessName}
          </span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Total Bookings" value="42" />
        <StatCard title="Upcoming" value="6" />
        <StatCard title="Earnings" value="₦120,000" />
        <StatCard title="Status" value="Pending Verification" />
      </div>

      <CalendarSyncStatus />

      <EarningsChart />
    </div>
  );
}
