import { api } from '../../app/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<unknown, { email: string }>({
      query: ({ email }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<
      unknown,
      { token: string; newPassword: string; confirmPassword: string }
    >({
      query: ({ token, newPassword, confirmPassword }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, newPassword, confirmPassword },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken: string) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: data,
      }),
    }),
    registerVendor: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    registerClient: builder.mutation({
      query: (data) => ({
        url: '/auth/client-register',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    getPendingVendor: builder.mutation({
      query: (userId) => ({
        url: `/auth/pending-vendor/${userId}`,
        method: 'GET',
      }),
    }),
    getUserById: builder.mutation({
      query: (userId) => ({
        url: `/auth/user/${userId}`,
        method: 'GET',
      }),
    }),
    connectCalender: builder.mutation({
      query: (data) => ({
        url: `/google/calendar?direction=${data.direction}`,
        method: 'GET',
      }),
    }),
    getUserByEmail: builder.query({
      query: (email) => ({
        url: `/users/email/${email.email}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useRegisterVendorMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useGetPendingVendorMutation,
  useRegisterClientMutation,
  useGetUserByIdMutation,
  useConnectCalenderMutation,
  useGetUserByEmailQuery,
} = authApi;
