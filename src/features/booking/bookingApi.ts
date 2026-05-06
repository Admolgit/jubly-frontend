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
      providesTags: () => [{ type: "DashboardStats" }],
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
      providesTags: () => [{ type: "Booking" }],
    }),

    getClientsBookings: builder.query({
      query: (data) => ({
        url: `/booking/clients?email=${data.email}&page=${data.page}&limit=${data.limit}&search=${data.search ?? ""}&dateFilter=${data.dateFilter ?? ""}&status=${data.status ?? ""}&date=${data.date ?? ""}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    getClientsVendorStats: builder.query({
      query: () => ({
        url: "/booking/clients/stats",
        method: "GET",
      }),
    }),
    getClientsBookingStats: builder.query({
      query: () => ({
        url: "/booking/clients/booking-stats",
        method: "GET",
      }),
    }),
    getVendorUpcomingBookings: builder.query({
      query: () => ({
        url: "/booking/upcoming-bookings",
        method: "GET",
      }),
    }),
    getClientUpcomingBookings: builder.query({
      query: () => ({
        url: "/booking/client/upcoming-bookings",
        method: "GET",
      }),
    }),
    cancelBooking: builder.mutation({
      query: (bookingId: string) => ({
        url: `/booking/${bookingId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Booking", "DashboardStats"],
    }),
    markBookingAsCompleted: builder.mutation({
      query: (bookingId: string) => ({
        url: `/booking/${bookingId}/mark-as-completed`,
        method: "PATCH",
      }),
      invalidatesTags: ["Booking", "DashboardStats"],
    }),
    rescheduleBooking: builder.mutation({
      query: (data: {
        bookingId: string;
        date: string;
        startTime: string;
        endTime?: string;
      }) => ({
        url: `/booking/reschedule/${data.bookingId}`,
        method: "PATCH",
        body: {
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
        },
      }),
      invalidatesTags: ["Booking", "DashboardStats"],
    }),
    getStatusFilterCount: builder.query({
      query: () => ({
        url: `/booking/status/filter`,
        method: "GET",
      }),
    }),
    getBusinessInsight: builder.query({
      query: () => ({
        url: `/booking/insights`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetStatusFilterCountQuery,
  useGetBusinessInsightQuery,
  useCreateBookingMutation,
  useCreateBookingPaymentMutation,
  useGetDashboardStartsQuery,
  useGetUpcomingBookingsQuery,
  useGetServicesCountsQuery,
  useGetBookingsQuery,
  useGetClientsBookingsQuery,
  useGetClientsVendorStatsQuery,
  useGetClientsBookingStatsQuery,
  useGetVendorUpcomingBookingsQuery,
  useCancelBookingMutation,
  useMarkBookingAsCompletedMutation,
  useRescheduleBookingMutation,
  useGetClientUpcomingBookingsQuery,
} = userApi;
