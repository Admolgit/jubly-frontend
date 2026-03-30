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
      }),
    }),
    getServiceById: builder.query({
      query: (serviceId: string) => ({
        url: `/vendor/service/${serviceId}`,
        method: "GET",
      }),
    }),
    getSearchedVendor: builder.mutation({
      query: (query) => ({
        url: `/vendor/search-vendor?name=${query?.name}&location=${query?.location}&type=${query?.type}&page=${query.page}&limit=${query.limit}`,
        method: "GET",
      }),
    }),
    getUserBySlug: builder.mutation({
      query: (data) => ({
        url: `/vendor/booking-vendor/${data.slug}`,
        method: "GET",
      }),
    }),
    getDashboardBookings: builder.query({
      query: () => ({
        url: "/vendor/dashboard/bookings",
        method: "GET",
      }),
    }),
    getDashboardServices: builder.query({
      query: () => ({
        url: "/vendor/dashboard/services",
        method: "GET",
      }),
    }),
    getDashboardWallet: builder.query({
      query: () => ({
        url: "/vendor/dashboard/wallet",
        method: "GET",
      }),
    }),
    getDashboardClients: builder.query({
      query: () => ({
        url: "/vendor/dashboard/clients",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateVendorProfieMutation,
  useCompleteVendorOnboardingMutation,
  useSetVendorAvailabilityMutation,
  useGetVendorProfileByIdQuery,
  useGetServiceByIdQuery,
  useGetSearchedVendorMutation,
  useGetUserBySlugMutation,
  useGetDashboardBookingsQuery,
  useGetDashboardServicesQuery,
  useGetDashboardWalletQuery,
  useGetDashboardClientsQuery,
} = vendorApi;
