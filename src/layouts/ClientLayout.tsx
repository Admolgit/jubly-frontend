// import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};

export default ClientLayout;
