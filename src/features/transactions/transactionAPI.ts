import { api } from "../../app/api";

export const calendarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionHistoryByVendor: builder.query({
      query: (data) => ({
        url: `/transactions/${data.vendorId}/?page=${data.page}&limit=${data.limit}&search=${data.searchValue || ""}`,
        method: "GET",
      }),
    }),
    getTransactionAmountByVendor: builder.query({
      query: (vendorId) => ({
        url: `/transactions/${vendorId}/amount`,
        method: "GET",
      }),
    }),

    getTransactionAnalytics: builder.query({
      query: (data) => ({
        url: `/transactions/analytics/earnings?vendorId=${data?.vendorId}&view=${data?.view || 'month'}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTransactionHistoryByVendorQuery,
  useGetTransactionAmountByVendorQuery,
  useGetTransactionAnalyticsQuery,
} = calendarApi;
