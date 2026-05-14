import { api } from "../../app/api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/users/me",
    }),
    getVendorClients: builder.query({
      query: (clientVendorId: string) => ({
        url: `/users/${clientVendorId}`,
        method: "GET",
      }),
    }),
    getUserSubAccount: builder.query({
      query: () => ({
        url: `/users/me/sub-account`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetVendorClientsQuery, useGetUserSubAccountQuery } = userApi;
