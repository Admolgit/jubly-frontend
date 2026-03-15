import { api } from "../../app/api";

export const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createVendorProfie: builder.mutation({
      query: (formData) => ({
        url: "/vendor/onboarding/profile",
        method: "POST",
        body: formData,
      }),
    }),
    completeVendorOnboarding: builder.mutation({
      query: (formData) => ({
        url: "/vendor/onboarding/complete-onboarding",
        method: "POST",
        body: formData,
      }),
    }),
    setVendorAvailability: builder.mutation({
      query: (data) => ({
        url: "/availability",
        method: "POST",
        body: data,
      }),
    }),
    getVendorProfileById: builder.query({
      query: () => ({
        url: "/vendor",
        method: "GET",
      })
    }),
    getServiceById: builder.query({
      query: (serviceId: string) => ({
        url: `/vendor/service/${serviceId}`,
        method: "GET"
      }) 
    })
  }),
});

export const {
  useCreateVendorProfieMutation,
  useCompleteVendorOnboardingMutation,
  useSetVendorAvailabilityMutation,
  useGetVendorProfileByIdQuery,
  useGetServiceByIdQuery
} = vendorApi;
