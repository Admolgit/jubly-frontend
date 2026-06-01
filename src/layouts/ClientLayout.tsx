// import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 text-gray-950 transition-colors dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};

export default ClientLayout;
