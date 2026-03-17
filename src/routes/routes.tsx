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
import { DashboardHome } from "../components/vendor-dashboard/DashboardHome";
import { BookingCalendar } from "../components/vendor-dashboard/BookingCalender";
import { Bookings } from "../components/vendor-dashboard/Booking";
import { Clients } from "../components/vendor-dashboard/Services.";
import { Wallet } from "../components/vendor-dashboard/Wallet";
import { Settings } from "../components/vendor-dashboard/Settings";
import DashboardLayout from "../pages/vendor-dashboard/Dashboard";
import { Services } from "../components/vendor-dashboard/Service";
import VendorBookingPage from "../pages/VendorBookingPage";
import ServiceBookingPage from "../pages/ServiceBookingPage";
import PaymentSuccessPage from "../pages/paymentSuccess";
import SearchBookingPage from "../pages/SearchBookingPage";



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
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/onboarding", element: <Onboarding /> },
      { path: "/verify-email", element: <VerifyOtpPage /> },
      {
        path: "/onboarding-verification",
        element: <VendorOnboardingSuccessPage />,
      },
      { path: "/vendor-availability", element: <VendorAvailability /> },
      { path: "/vendor-sync", element: <GoogleSync /> },
      { path: "/vendor-booking/:slug", element: <VendorBookingPage /> },
      { path: "/:slug/:serviceId", element: <ServiceBookingPage /> },
      { path: "/verify-payment", element: <PaymentSuccessPage /> },
      { path: "/booking", element: <SearchBookingPage /> },
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
]);
