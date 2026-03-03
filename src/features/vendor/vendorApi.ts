import { api } from "../../app/api";

export const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    completeVendorOnboarding: builder.mutation({
      query: (formData) => ({
        url: "/vendor/onboarding/complete-onboarding",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useCompleteVendorOnboardingMutation
} = vendorApi;
