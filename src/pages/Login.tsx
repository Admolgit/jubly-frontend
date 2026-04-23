/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "../features/auth/authApi";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LoginImage from "../assets/login-image.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const animatedTexts = useMemo(
    () => [
      "Welcome to Jubly! Where beauty meets convenience. Discover professional makeup artists near you, book your favorite service in just a few taps, and enjoy secure, hassle-free payments. Whether it’s a special occasion or just a little self-care, Jubly makes looking and feeling fabulous effortless.",
      "Book professional makeup artists in minutes. Hassle-free scheduling, secure payments, and beauty at your doorstep.",
      "Every artist is verified and approved. Enjoy high-quality, reliable service from top professionals near you.",
    ],
    [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedTexts]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await login(data).unwrap();

      dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token,
          refreshToken: res.data.refreshToken,
        }),
      );

      if (res.status === 404 && res.data.user.role === "VENDOR") {
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("email", user.email);
        dispatch(setCredentials({ user, token }));
        navigate("/onboarding");
      } else if (res.status === 400 && res.data.user.role === "VENDOR") {
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("email", user.email);
        dispatch(setCredentials({ user, token }));
        toast.success(
          `A verification code has been sent to you email ${data.email}.`,
        );
        navigate("/verify-email");
      } else if (res.status === 200 && res.data.user.role === "CLIENT") {
        toast.success("Login successful");
        navigate("/client-dashboard");
      } else {
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (err: any) {
      const message = err?.data?.error || err?.data?.message || err?.message;

      if (message === "Vendor account pending approval") {
        toast.error("Vendor account pending approval");
      } else if (message === "Complete your onboarding") {
        toast.success("Continue onboarding");
        navigate("/google-sync");
      } else if (message === "Invalid credentials") {
        toast.error("Invalid credentials");
      } else {
        toast.error(message || "Login failed");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URi}/auth/google/login`;
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const role = searchParams.get("role");

    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken ?? "");

      if (role === "CLIENT") {
        navigate("/client-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-2 mb-6 text-center">
                <h1 className="text-2xl font-bold text-center text-blue-600">
                  Login
                </h1>
                <p>Welcome back! Login to continue.</p>
              </div>

              <Input
                label="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={errors.email?.message as any}
              />

              {/* PASSWORD WITH ICON */}
              <div className="relative mt-4">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  error={errors.password?.message as any}
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button type="submit" disabled={isLoading} className="mt-6">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
          <div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button
                // variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                Google
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* LEFT SIDE */}
      <div
        className="hidden md:flex relative items-center justify-center bg-cover bg-center text-white m-2"
        style={{
          backgroundImage: `url(${LoginImage})`,
          borderRadius: "20px",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-[20px] " />

        <div className="absolute bottom-10 z-10 text-center px-8">
          <h1 className="text-2xl font-bold transition-all duration-700">
            {animatedTexts[textIndex]}
          </h1>

          <div className="flex justify-center gap-2 mt-6">
            {animatedTexts.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === textIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
