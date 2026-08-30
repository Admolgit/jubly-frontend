import { api } from '../../app/api';

export const servicesAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendorServices: builder.query({
      query: (data) => ({
        url: `/services?page=${data.page}&limit=${data.limit}&search=${data.search}&isActive=${data.isActive}`,
        method: 'GET',
      }),
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: `/vendor/onboarding/services`,
        method: 'POST',
        body: data,
      }),
    }),

    updateActiveStatus: builder.mutation({
      query: (data) => ({
        url: `/services/update/${data.serviceId}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    vendorSubscription: builder.mutation({
      query: () => ({
        url: `/subscription/upgrade`,
        method: 'POST',
      }),
    }),
    getVendorSubscriptionStatus: builder.query({
      query: () => ({
        url: `/subscription/status`,
        method: 'GET',
      }),
    }),
    getSettings: builder.query({
      query: () => ({
        url: `/admin/platform-settings`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetVendorServicesQuery,
  useCreateServiceMutation,
  useUpdateActiveStatusMutation,
  useVendorSubscriptionMutation,
  useGetVendorSubscriptionStatusQuery,
  useGetSettingsQuery,
} = servicesAPI;
