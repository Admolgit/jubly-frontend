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
    getUserId: builder.mutation({
      query: (userId) => ({
        url: `/users/user/${userId}`,
        method: "GET",
      }),
    }),
    createEnqury: builder.mutation({
      query: (data) => ({
        url: "/users/enquiry",
        method: "POST",
        body: data,
      }),
    }),
    getNotification: builder.query({
      query: () => ({
        url: `/users/notification`,
        method: "GET",
      }),
    }),
    updateNotification: builder.mutation({
      query: (data) => ({
        url: `/users/notification`,
        method: "PATCH",
        body: data
      }),
    }),
    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: `/users/profile-image`,
        method: "PATCH",
        body: data
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/user/update`,
        method: "PATCH",
        body: data
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLazyGetVendorClientsQuery,
  useGetUserSubAccountQuery,
  useGetUserIdMutation,
  useCreateEnquryMutation,
  useGetNotificationQuery,
  useUpdateNotificationMutation,
  useUpdateProfileImageMutation,
  useUpdateUserMutation,
} = userApi;
