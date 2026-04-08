import { api } from "../../app/api";

export const servicesAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendorServices: builder.query({
      query: () => ({
        url: `/services`,
        method: "GET"
      }),
    }),
  }),
});

export const { useGetVendorServicesQuery } = servicesAPI;
