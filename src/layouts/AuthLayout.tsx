// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {

  // const token = useSelector(
  //   (state: { auth: { token: string }}) => state.auth.token,
  // );

  // if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

