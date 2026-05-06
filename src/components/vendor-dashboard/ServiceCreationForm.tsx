/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";

const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)), "Price must be a number"),
  durationMins: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

export default function ServiceForm({
  setServiceOpen,
  handleCreateService,
  createServiceIsLoading,
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = (data: ServiceFormData) => {
    handleCreateService({
      ...data,
      price: Number(data.price),
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Input label="Service Name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input label="Price" placeholder="10000" {...register("price")} />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Duration"
            placeholder="90 min"
            {...register("durationMins")}
          />
        </div>

        <div>
          <Input
            label="Category"
            {...register("category")}
            disabled
          />
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          placeholder="Describe the service"
          className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setServiceOpen(false)}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
        >
          {createServiceIsLoading ? "Creating..." : "Create Service"}
        </button>
      </div>
    </form>
  );
}
