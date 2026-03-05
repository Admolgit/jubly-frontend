/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterVendorMutation } from "../features/auth/authApi";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LoginImage from "../assets/login-image.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [registerVendor, { isLoading }] = useRegisterVendorMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const animatedTexts = [
    "Register on Jubly! Where beauty meets convenience. Discover professional makeup artists near you, book your favorite service in just a few taps, and enjoy secure, hassle-free payments. Whether it’s a special occasion or just a little self-care, Jubly makes looking and feeling fabulous effortless.",
    "Book professional makeup artists in minutes. Hassle-free scheduling, secure payments, and beauty at your doorstep.",
    "Every artist is verified and approved. Enjoy high-quality, reliable service from top professionals near you.",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: RegisterFormInputs) => {
    console.log(data);
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Password must be same as confirm password.");
        return;
      }
      const res = await registerVendor(data).unwrap();
      console.log({ res });

      if (res.status === 201) {
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("email", user.email);
        dispatch(setCredentials({ user, token }));
        toast.success(
          `A verification code has been sent to you email ${data.email}.`,
        );
        navigate("/verify-email");
      }
    } catch (err: any) {
      console.log({ err });
      if (err?.error.includes("Email already in use")) {
        toast.error("Email already in use");
      }
      toast.error(err?.data?.message || "Register failed");
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

    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken ?? "");
      navigate("/dashboard");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div
        className="hidden md:flex relative items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${LoginImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

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

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center justify-center px-6 bg-white rounded-xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8">
          <div className="flex flex-col gap-2 mb-4 text-center">
            <h1 className="text-2xl font-bold text-center text-blue-600">
              Register
            </h1>
            <p>Jubly connects proffessionals to clients</p>
          </div>

          <div className="md:flex items-center gap-2 mb-2">
            <Input
              label="First Name"
              type="text"
              {...register("firstName", { required: "First name is required" })}
              error={errors.firstName?.message as any}
            />
            <Input
              label="Last Name"
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              error={errors.lastName?.message as any}
            />
          </div>

          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message as any}
          />

          <Input
            label="Phone"
            type="text"
            {...register("phone", { required: "Phone is required" })}
            error={errors.phone?.message as any}
          />

          {/* PASSWORD WITH ICON */}
          <div className="relative mt-3">
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
          <div className="relative mt-3">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              error={errors.confirmPassword?.message as any}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" disabled={isLoading} className="mt-3">
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
        <div className="max-w-6l ">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="w-full">
            <Button
              // variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
