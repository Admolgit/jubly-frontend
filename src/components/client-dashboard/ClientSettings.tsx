/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../features/users/userApi";
import Loader from "../ui/Loader";

export function ClientSettings() {
  const authUser = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const { data: profileData, isLoading } = useGetProfileQuery();

  const profile = profileData?.data || authUser;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile Settings</h1>
        <p className="text-sm text-gray-500">
          View your personal details and account preferences.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">First Name</p>
              <p className="text-sm font-semibold text-gray-900">
                {profile?.firstName || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Name</p>
              <p className="text-sm font-semibold text-gray-900">
                {profile?.lastName || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-semibold text-gray-900">
                {profile?.email || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-semibold text-gray-900">
                {profile?.phone || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-semibold text-gray-900">
                {(profile?.city || "-") + (profile?.state ? ", " + profile.state : "")}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Account Status</p>
              <p className="text-sm font-semibold text-gray-900">
                {profile?.isVerified ? "Verified" : "Pending"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-semibold">Preferences</h3>
        <p className="text-sm text-gray-500 mt-1">
          Notification and communication preferences can be configured here once
          the backend endpoints are available.
        </p>
      </div>
    </div>
  );
}
