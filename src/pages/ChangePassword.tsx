/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "../features/auth/authApi";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useSelector } from "react-redux";

type PasswordChangeFormInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword({
  setOpenChange,
}: {
  setOpenChange: (value: boolean) => void;
}) {
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeFormInputs>();

  const onSubmit = async (data: PasswordChangeFormInputs) => {
    try {
      const res = await changePassword({ userId: user.id, ...data }).unwrap();

      if (res.status === 200) {
        toast.success(res.message);
        setOpenChange(false);
      } else {
        toast.success("Password Change failed");
      }
    } catch (err: any) {
      const message = err?.data?.error || err?.data?.message || err?.message;
      toast.error(message);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-2 mb-6 text-center">
          <h1 className="text-2xl font-bold text-center text-blue-600">
            Change Password
          </h1>
          <p>Please proceed to change your password here.</p>
        </div>

        {/* PASSWORD WITH ICON */}
        <div className="relative mt-4">
          <Input
            label="Current Password"
            type={showPassword ? "text" : "password"}
            {...register("currentPassword", {
              required: "Current password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
            error={errors.currentPassword?.message as any}
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
        <div className="relative mt-4">
          <Input
            label="New Password"
            type={showPassword ? "text" : "password"}
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
            error={errors.newPassword?.message as any}
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
        <div className="relative mt-4">
          <Input
            label="Conform Password"
            type={showPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
            error={errors.confirmPassword?.message as any}
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
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
