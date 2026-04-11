/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const user = useSelector((state: any) => state.auth.user);
  const vendor = useSelector(
    (state: { vendor: { vendor: any } }) => state.vendor.vendor,
  );

  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isVendorRoute = location.pathname.startsWith("/dashboard");
  const isClientRoute = location.pathname.startsWith("/client-dashboard");

  // 🚨 ROLE CHECK
  if (user.role === "VENDOR" && isClientRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  if (user.role === "CLIENT" && isVendorRoute) {
    return <Navigate to="/client-dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
