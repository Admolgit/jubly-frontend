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
  }),
});

export const { useCreateBookingMutation, useCreateBookingPaymentMutation } = userApi;
