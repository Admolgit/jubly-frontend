/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UnknownAction } from "@reduxjs/toolkit";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";

// ✅ Use Vite env with fallback
export const BASE = import.meta.env.VITE_API_URL || "http://localhost:4001/api/v1";

// --- Base Query ---
const baseQuery = fetchBaseQuery({
  baseUrl: BASE,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// --- Wrapper for error handling like axios ---
const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;

    if (status === 401) {
      // automatically logout user if token expired
      api.dispatch({ type: "auth/logout" });
    }

    return {
      error: {
        status,
        message:
          (result.error.data as any)?.message ||
          "Something went wrong. Please try again.",
      },
    };
  }

  return result;
};

// --- Create API ---
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({}),
  tagTypes: ["User", "Vendor", "Service", "Booking"],
  // Persist rehydration support
  extractRehydrationInfo(action: UnknownAction, { reducerPath }) {
    if (action.type === "persist/REHYDRATE") {
      return (action as any).payload?.[reducerPath];
    }
  },
});
