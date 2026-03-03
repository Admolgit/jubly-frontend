import { api } from "../../app/api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/users/me",
    }),
  }),
});

export const { useGetProfileQuery } = userApi;
