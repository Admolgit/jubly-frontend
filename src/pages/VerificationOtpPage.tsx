/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../features/auth/authApi";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LoginImage from "../assets/login-image.jpg";

type VerifyFormInputs = {
  otp: string;
};

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendOtpLoading }] = useResendOtpMutation();
  const [textIndex, setTextIndex] = useState(0);
  const [timer, setTimer] = useState(60);

  const animatedTexts = [
    "Almost there! Enter the verification code sent to your email to activate your Jubly vendor account.",
    "Your security matters. We use verification codes to protect your account.",
    "Once verified, you can complete onboarding and start offering your services.",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormInputs>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  const onSubmit = async (data: VerifyFormInputs) => {
    try {
      const email = localStorage.getItem("email") || "";
      const res = await verifyOtp({ otp: data.otp, email }).unwrap();

      if (res.status === 200) {
        toast.success("Account verified successfully 🎉");
        navigate("/onboarding");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired OTP");
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    const email = localStorage.getItem("email") || "";
    const res = await resendOtp({ email });
    if (res) {
      toast.success("A new verification code has been sent.");
    }
    setTimer(60);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div
        className="hidden md:flex relative items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
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
      <div className="flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="flex flex-col gap-2 mb-6 text-center">
            <h1 className="text-2xl font-bold text-blue-600">Verify Account</h1>
            <p>Enter the 6-digit code sent to your email</p>
          </div>

          <Input
            label="Verification Code"
            type="text"
            maxLength={6}
            {...register("otp", {
              required: "OTP is required",
              minLength: { value: 6, message: "Enter 6-digit code" },
            })}
            error={errors.otp?.message as any}
          />

          <Button type="submit" disabled={isLoading} className="mt-4 w-full">
            {isLoading ? "Verifying..." : "Verify"}
          </Button>

          <div className="mt-4 text-center text-sm">
            {timer > 0 ? (
              <p className="text-gray-500">Resend code in {timer}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 font-medium hover:underline"
                disabled={resendOtpLoading}
              >
                Resend Code
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
