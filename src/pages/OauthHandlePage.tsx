import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";

export default function OAuthHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const authRaw = searchParams.get("auth");

    if (!token || !refreshToken || !authRaw) {
      navigate("/login", { replace: true });
      return;
    }

    let authObj;
    try {
      authObj = JSON.parse(authRaw);
    } catch {
      authObj = null;
    }

    localStorage.setItem("accessToken", JSON.stringify(token));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    if (authObj?.data) {
      localStorage.setItem("auth", JSON.stringify(authObj.data));
    }

    if (authObj?.data?.user?.status === "NOT_SUBMITTED") {
      navigate("/onboarding", {
        replace: true,
        state: { fromOAuth: true, onboarding: true },
      });
      dispatch(
        setCredentials({ user: authObj.data.user, token: authObj.data.token }),
      );
      toast.success("Please complete your KYC to continue.");
      return;
    }

    if (authObj.data.meta.alreadyExists) {
      navigate("/dashboard", {
        replace: true,
        state: { fromOAuth: true, onboarding: false },
      });
      dispatch(
        setCredentials({ user: authObj.data.user, token: authObj.data.token }),
      );
    } else {
      navigate("/onboarding", {
        replace: true,
        state: { fromOAuth: true, onboarding: true },
      });
      dispatch(
        setCredentials({ user: authObj.data.user, token: authObj.data.token }),
      );
      toast.success(
        "Successfully signed up via OAuth!, please complete your onboarding.",
      );
    }
  }, [navigate, searchParams, dispatch]);

  return <p className="text-center text-primary">Signing you in…</p>;
}
