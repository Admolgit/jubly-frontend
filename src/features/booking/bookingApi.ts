import { api } from "../../app/api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
      }),
    }),
    createBookingPayment: builder.mutation({
      query: (data) => ({
        url: "/booking/initialize-payment",
        method: "POST",
        body: data,
      }),
    }),
    getDashboardStarts: builder.query({
      query: (vendorId) => ({
        url: `/booking/dashboard-stats/${vendorId}`,
        method: 'GET',
      })
    })
  }),
});

export const { useCreateBookingMutation, useCreateBookingPaymentMutation, useGetDashboardStartsQuery } = userApi;
