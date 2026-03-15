import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const vendor = useSelector(
    (state: { vendor: { vendor: { status: string } } }) => state?.vendor?.vendor?.status === "APPROVED",
  );

  if (vendor) return <Navigate to="/dashboard" replace />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
};

export default AuthLayout;