/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock3,
  DollarSign,
  LayoutGrid,
  Sparkles,
  Tag,
  FileText,
  ChevronDown,
} from "lucide-react";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), "Price must be a number"),
  durationMins: z.string().min(1, "Duration required"),
  category: z.string().optional(),
  description: z.string().min(10, "Description required"),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export default function ServiceForm({
  setServiceOpen,
  handleCreateService,
  createServiceIsLoading,
  vendor,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = (data: ServiceFormData) => {
    handleCreateService({
      ...data,
      vendorId: vendor?.id,
      price: Number(data?.price),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8 px-8 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Service Name */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#111827] dark:text-white">
                Service Name <span className="text-red-500">*</span>
              </label>

              <div className="flex h-12 items-center gap-4 rounded-2xl border border-[#7C6CFF] bg-white px-5 shadow-[0_0_0_4px_rgba(124,108,255,0.08)]">
                <Tag className="h-6 w-6 text-[#6B7280]" />

                <input
                  {...register("name")}
                  placeholder="Bridal Makeup"
                  className="w-full bg-transparent text-sm font-medium text-[#111827]  dark:text-white outline-none placeholder:text-[#98A2B3]"
                />
              </div>

              {errors?.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors?.name?.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#111827]  dark:text-white">
                Price <span className="text-red-500">*</span>
              </label>

              <div className="flex h-12 items-center gap-4 rounded-2xl border border-[#E4E7EC] bg-white px-5 transition focus-within:border-[#7C6CFF]">
                <DollarSign className="h-6 w-6 text-[#6B7280]" />

                <input
                  {...register("price")}
                  placeholder="NGN 10,000"
                  className="w-full bg-transparent text-sm font-medium text-[#111827]  dark:text-white outline-none placeholder:text-[#98A2B3]"
                />
              </div>

              {errors?.price && (
                <p className="mt-2 text-sm text-red-500">
                  {errors?.price?.message}
                </p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#111827]  dark:text-white">
                Duration <span className="text-red-500">*</span>
              </label>

              <div className="flex h-12 items-center justify-between rounded-2xl border border-[#E4E7EC] bg-white px-5">
                <div className="flex items-center gap-4">
                  <Clock3 className="h-6 w-6 text-[#6B7280]" />

                  <input
                    {...register("durationMins")}
                    placeholder="90 min"
                    className="w-full bg-transparent text-sm font-medium text-[#111827]  dark:text-white outline-none placeholder:text-[#98A2B3]"
                  />
                </div>

                <ChevronDown className="h-5 w-5 text-[#6B7280]" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-[#111827]  dark:text-white">
                Category <span className="text-red-500"></span>
              </label>

              <div className="flex h-12 items-center justify-between rounded-2xl border border-[#E4E7EC] bg-white px-5">
                <div className="flex items-center gap-4">
                  <LayoutGrid className="h-6 w-6 text-[#6B7280]" />

                  <input
                    {...register("category")}
                    placeholder={vendor?.category}
                    disabled={true}
                    className="w-full bg-transparent text-sm font-medium text-[#111827] dark:text-white outline-none placeholder:text-[#98A2B3]"
                  />
                </div>

                <ChevronDown className="h-5 w-5 text-[#6B7280]" />
              </div>

              {errors?.category && (
                <p className="mt-2 text-sm text-red-500">
                  {errors?.category?.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-[#111827] dark:text-white">
              Description
            </label>

            <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5">
              <div className="flex items-start gap-4">
                <FileText className="mt-1 h-6 w-6 text-[#6B7280]" />

                <textarea
                  {...register("description")}
                  rows={5}
                  placeholder="Describe the service..."
                  className="w-full resize-none bg-transparent text-sm text-[#111827]  dark:text-white outline-none placeholder:text-[#98A2B3]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t border-[#F2F4F7] px-8 py-7">
          <button
            type="button"
            onClick={() => setServiceOpen(false)}
            className="h-10 rounded-2xl border border-[#E4E7EC] bg-white px-8 text-sm font-medium text-[#111827]  dark:text-white transition hover:bg-gray-50 dark:text-black"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-10 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#5B3DF5] to-[#6D5DFB] px-10 text-sm font-semibold text-white shadow-lg shadow-[#6D5DFB]/25 transition hover:scale-[1.02] disabled:opacity-50"
          >
            <Sparkles className="h-5 w-5" />

            {createServiceIsLoading ? "Creating..." : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
}
