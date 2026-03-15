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
    getVendorAvailabilitySlots: builder.mutation({
      query: (data) => ({
        url: `/availability/slots/${data.vendorId}/${data.date}/${data.serviceId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSetVendorAvailabilityMutation,
  useGetVendorAvailabilitySlotsMutation,
} = availabilityApi;
