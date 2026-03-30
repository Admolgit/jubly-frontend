import { api } from "../../app/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerVendor: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    registerClient: builder.mutation({
      query: (data) => ({
        url: "/auth/client-register",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    getPendingVendor: builder.mutation({
      query: (userId) => ({
        url: `/auth/pending-vendor/${userId}`,
        method: "GET",
      }),
    }),
    getUserById: builder.mutation({
      query: (data) => ({
        url: `/auth/user/${data.userId}`,
        method: "GET",
      }),
    }),
    connectCalender: builder.mutation({
      query: (data) => ({
        url: `/google/calendar?userId=${data.userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterVendorMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGetPendingVendorMutation,
  useRegisterClientMutation,
  useGetUserByIdMutation,
  useConnectCalenderMutation,
} = authApi;
