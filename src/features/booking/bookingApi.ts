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
        method: "GET",
      }),
    }),
    getUpcomingBookings: builder.query({
      query: () => ({
        url: "/booking/upcoming",
        method: "GET",
      }),
    }),
    getServicesCounts: builder.query({
      query: () => ({
        url: "/booking/services-count",
        method: "GET",
      }),
    }),
    getBookings: builder.query({
      query: (data) => ({
        url: `/booking?page=${data.page}&limit=${data.limit}&search=${data.search ?? ""}&dateFilter=${data.dateFilter ?? ""}&status=${data.status ?? ""}&date=${data.date ?? ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCreateBookingPaymentMutation,
  useGetDashboardStartsQuery,
  useGetUpcomingBookingsQuery,
  useGetServicesCountsQuery,
  useGetBookingsQuery,
} = userApi;
