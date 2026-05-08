import { api } from "../../app/api";

export const availabilityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    setVendorAvailability: builder.mutation({
      query: (data) => ({
        url: "/availability",
        method: "POST",
        body: data,
      }),
    }),
    getVendorAvailabilitySlots: builder.query({
      query: (data) => ({
        url: `/availability/slots/${data.vendorId}/${data.date}/${data.serviceId}`,
        method: "GET",
      }),
    }),
    getVendorAvailability: builder.query({
      query: () => ({
        url: `/availability/grouped-availability`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSetVendorAvailabilityMutation,
  useGetVendorAvailabilitySlotsQuery,
  useGetVendorAvailabilityQuery
} = availabilityApi;
