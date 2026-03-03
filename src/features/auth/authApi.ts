import { api } from "../../app/api";
import { setCredentials } from "./authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
    registerVendor: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
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
  }),
});

export const { useLoginMutation, useRegisterVendorMutation, useVerifyOtpMutation, useResendOtpMutation } =
  authApi;
