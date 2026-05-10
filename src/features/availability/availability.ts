import { api } from "../../app/api";

export const availabilityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    setVendorAvailability: builder.mutation({
      query: (data) => ({
        url: "/availability",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Availabilities" }],
    }),

    bufferVendorAvailability: builder.mutation({
      query: (data) => ({
        url: "/availability/buffer-time",
        method: "PATCH",
        body: data,
      }),
    }),
    getBufferVendorAvailability: builder.query({
      query: () => ({
        url: "/availability/buffer-time",
        method: "GET",
      }),
    }),

    getVendorAvailabilitySlots: builder.query({
      query: (data) => ({
        url: `/availability/slots/${data.vendorId}/${data.date}/${data.serviceId}`,
        method: "GET",
      }),
      // providesTags: ["Availabilities"],
    }),

    getVendorAvailability: builder.query({
      query: () => ({
        url: `/availability/grouped-availability`,
        method: "GET",
      }),
      providesTags: [{ type: "Availabilities" }],
    }),
  }),
});

export const {
  useSetVendorAvailabilityMutation,
  useGetVendorAvailabilitySlotsQuery,
  useGetVendorAvailabilityQuery,
  useBufferVendorAvailabilityMutation,
  useGetBufferVendorAvailabilityQuery
} = availabilityApi;
