/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token,
  );
  const user = useSelector(
    (state: { vendor: { vendor: any } }) => state.vendor.vendor,
  );

  console.log({ user });

  if (!token || (user && user?.kycStatus !== "APPROVED"))
    return <Navigate to="/login" replace />;

  return <Outlet />;
}
