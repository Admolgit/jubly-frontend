import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import RootLayout from "../layouts/RootLayout";
import RegisterPage from "../pages/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import Onboarding from "../pages/Onboarding";
import LandingPage from "../pages/landingPage";
import VerifyOtpPage from "../pages/VerificationOtpPage";
import VendorOnboardingSuccessPage from "../pages/OnboardingVerification";
import VendorAvailability from "../pages/vendor/VendorAvailability";
import GoogleSync from "../pages/vendor/GoogleSync";
import { BookingCalendar } from "../components/vendor-dashboard/BookingCalender";
import { Bookings } from "../components/vendor-dashboard/Booking";
import { Clients } from "../components/vendor-dashboard/Clients";
import { Wallet } from "../components/vendor-dashboard/Wallet";
import { Settings } from "../components/vendor-dashboard/Settings";
import DashboardLayout from "../pages/vendor-dashboard/Dashboard";
import { Services } from "../components/vendor-dashboard/Service";
import VendorBookingPage from "../pages/VendorBookingPage";
import ServiceBookingPage from "../pages/ServiceBookingPage";
import PaymentSuccessPage from "../pages/paymentSuccess";
import SearchBookingPage from "../pages/SearchBookingPage";
import DashboardHome from "../components/vendor-dashboard/DashboardHome";
import ClientLayout from "../layouts/ClientLayout";
import ClientDashboardLayout from "../pages/client-dashboard/Dashboard";
import { ClientDashboardHome } from "../components/client-dashboard/ClientDashboardHome";
import { ClientBookings } from "../components/client-dashboard/ClientBookings";
import { ClientCalendar } from "../components/client-dashboard/ClientCalendar";
import { ClientVendors } from "../components/client-dashboard/ClientVendors";
import { ClientSettings } from "../components/client-dashboard/ClientSettings";
import { ClientProfile } from "../components/client-dashboard/ClientProfile";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "",
    element: <ClientLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/vendor-booking/:slug", element: <VendorBookingPage /> },
      { path: "/:slug/:serviceId", element: <ServiceBookingPage /> },
      { path: "/verify-payment", element: <PaymentSuccessPage /> },
      { path: "/onboarding", element: <Onboarding /> },
      { path: "/verify-email", element: <VerifyOtpPage /> },
      {
        path: "/onboarding-verification",
        element: <VendorOnboardingSuccessPage />,
      },
      { path: "/vendor-availability", element: <VendorAvailability /> },
      { path: "/vendor-sync", element: <GoogleSync /> },
      { path: "/booking", element: <SearchBookingPage /> },
    ],
  },

  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  {
    path: "",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "calendar", element: <BookingCalendar /> },
          { path: "bookings", element: <Bookings /> },
          { path: "availability", element: <VendorAvailability /> },
          { path: "services", element: <Services /> },
          { path: "clients", element: <Clients /> },
          { path: "wallet", element: <Wallet /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },

  {
    path: "",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "client-dashboard",
        element: <ClientDashboardLayout />,
        children: [
          { index: true, element: <ClientDashboardHome /> },
          { path: "bookings", element: <ClientBookings /> },
          { path: "calendar", element: <ClientCalendar /> },
          { path: "vendors", element: <ClientVendors /> },
          { path: "settings", element: <ClientSettings /> },
          { path: "settings/profile", element: <ClientProfile /> },
        ],
      },
    ],
  },
]);
