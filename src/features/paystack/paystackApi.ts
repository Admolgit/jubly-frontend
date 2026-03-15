import { api } from "../../app/api";

export const paystackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBankLists: builder.query({
      query: () => ({
        url: `/paystack/list`,
        method: "get",
      }),
    }),

    resolveBank: builder.query({
      query: (data) => ({
        url: `/paystack/resolve-bank/${data?.accountNumber}/${data?.bankCode}`,
        method: "get",
      }),
    }),

    verifyTransaction: builder.mutation({
      query: (data) => ({
        url: `/paystack/verify-payment/${data.reference}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBankListsQuery, useResolveBankQuery, useVerifyTransactionMutation } = paystackApi;
