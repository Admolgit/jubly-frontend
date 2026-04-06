import { api } from "../../app/api";

export const calendarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionHistoryByVendor: builder.query({
      query: (vendorId) => ({
        url: `/transactions/${vendorId}`,
        method: "GET",
      })
    }),
    getTransactionAmountByVendor: builder.query({
      query: (vendorId) => ({
        url: `/transactions/${vendorId}/amount`,
        method: "GET",
      })
    }),
  })
});

export const { useGetTransactionHistoryByVendorQuery, useGetTransactionAmountByVendorQuery } = calendarApi;