import { api } from "../../app/api";

export const transactionsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionHistoryByVendor: builder.query({
      query: (data) => ({
        url: `/transactions/${data.vendorId}/?page=${data.page}&limit=${data.limit}&search=${data.search || ""}`,
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
        url: `/transactions/analytics/earnings?vendorId=${data?.vendorId}&view=${data?.view || "month"}`,
        method: "GET",
      }),
    }),

    getTransactionDashStats: builder.query({
      query: () => ({
        url: `/transactions/transactions-stats`,
        method: "GET",
      }),
    }),
    exportTransactionsCSV: builder.mutation({
      query: () => ({
        url: `/transactions/export/csv`,
        method: "GET",

        responseHandler: async (response) => response.blob(),
      }),
    }),
    refundClientTransaction: builder.mutation({
      query: (data) => ({
        url: `/paystack/refund`,
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const {
  useGetTransactionHistoryByVendorQuery,
  useGetTransactionAmountByVendorQuery,
  useGetTransactionAnalyticsQuery,
  useGetTransactionDashStatsQuery,
  useExportTransactionsCSVMutation,
  useRefundClientTransactionMutation,
} = transactionsAPI;
