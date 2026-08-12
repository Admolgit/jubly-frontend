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
  }),
});

export const {
  useGetVendorServicesQuery,
  useCreateServiceMutation,
  useUpdateActiveStatusMutation,
} = servicesAPI;
