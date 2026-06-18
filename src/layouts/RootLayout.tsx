import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/landing-page/Navbar";
import Footer from "../components/landing-page/Footer";

export default function RootLayout() {
  const token = useSelector(
    (state: { auth: { token: string } }) => state.auth.token,
  );

  if (token) return <Navigate to="/dashboard" replace />;
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white text-gray-950 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

