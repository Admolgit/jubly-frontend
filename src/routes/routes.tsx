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
      { path: "/onboarding-verification", element: <VendorOnboardingSuccessPage /> },
    ],
  },

  {
    path: "",
    element: <ProtectedRoutes />,
    children: [
      // {
      //   path: "dashboard",
      //   element: <DashboardLayout />,
      //   children: [
      //     { index: true, element: <DashboardHome /> },
      //   ],
      // },
    ],
  },
]);
