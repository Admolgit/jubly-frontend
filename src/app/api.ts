/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UnknownAction } from '@reduxjs/toolkit';
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../features/auth/authSlice';
import {
  getStoredAccessToken,
  getStoredRefreshToken,
  setStoredTokens,
  clearStoredTokens,
} from '../utils/tokenStorage';

export const BASE =
  import.meta.env.VITE_API_URI || 'http://localhost:4001/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth?.token || getStoredAccessToken();

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const isAuthBypassUrl = (url: string) =>
  url.includes('/auth/login') || url.includes('/auth/refresh-token');

const refreshBaseQuery = fetchBaseQuery({ baseUrl: BASE });

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = (
  api: BaseQueryApi,
  extraOptions: object,
): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const state = api.getState() as any;
      const refreshToken = state.auth?.refreshToken || getStoredRefreshToken();

      if (!refreshToken) return null;

      const refreshResult = await refreshBaseQuery(
        {
          url: '/auth/refresh-token',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.error) return null;

      const data = refreshResult.data as any;
      const newToken = data?.data?.token || data?.token;
      const newRefreshToken = data?.data?.refreshToken || data?.refreshToken;

      if (!newToken) return null;

      api.dispatch(
        setCredentials({ token: newToken, refreshToken: newRefreshToken }),
      );
      setStoredTokens(newToken, newRefreshToken);

      return newToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

// --- Wrapper: retries once with a refreshed token on 401, logs out if that fails ---
const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  let result = await baseQuery(args, api, extraOptions);

  const url = typeof args === 'string' ? args : args.url;

  if (result.error?.status === 401 && !isAuthBypassUrl(url)) {
    const newToken = await refreshAccessToken(api, extraOptions);

    if (newToken) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      clearStoredTokens();
    }
  }

  if (result.error) {
    const status = result.error.status;

    return {
      error: {
        status,
        data: {
          message:
            (result.error.data as any)?.message ||
            'Something went wrong. Please try again.',
        },
      },
    };
  }

  return result;
};

// --- Create API ---
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    'User',
    'Vendor',
    'Service',
    'Booking',
    'DashboardStats',
    'Availabilities',
  ],
  // Persist rehydration support
  extractRehydrationInfo(action: UnknownAction, { reducerPath }) {
    if (action.type === 'persist/REHYDRATE') {
      return (action as any).payload?.[reducerPath];
    }
  },
});
