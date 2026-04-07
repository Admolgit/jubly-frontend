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
  }),
});

export const { useGetProfileQuery, useLazyGetVendorClientsQuery } = userApi;
