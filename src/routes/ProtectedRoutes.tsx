/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = () => {
//   const token = useSelector(
//     (state: { auth: { token: string } }) => state.auth.token,
//   );

//   return token ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
