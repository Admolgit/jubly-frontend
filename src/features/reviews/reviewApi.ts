import { api } from '../../app/api';

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  customer?: { displayName?: string; name?: string };
  customerName?: string;
  service?: { name: string };
  serviceName?: string;
}
export interface ReviewBooking {
  id: string;
  clientId?: string;
  status: string;
  vendor?: { businessName?: string };
  vendorName?: string;
  services?: { name?: string };
  serviceName?: string;
}
export interface VendorReviewsResponse {
  data: {
    reviews: Review[];
    averageRating: number | null;
    totalReviews: number;
  };
}
export const reviewApi = api
  .enhanceEndpoints({
    addTagTypes: ['BookingReview', 'VendorReviews'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createReview: builder.mutation<
        { data: Review },
        {
          bookingId: string;
          clientId: string;
          rating: number;
          comment?: string;
        }
      >({
        query: ({ bookingId, clientId, rating, comment }) => ({
          url: `/reviews/${encodeURIComponent(clientId)}`,
          method: 'POST',
          body: {
            bookingId,
            rating,
            ...(comment?.trim() ? { comment: comment.trim() } : {}),
          },
        }),
        invalidatesTags: (_result, error, { bookingId }) =>
          !error || error.status === 409
            ? [
                { type: 'BookingReview', id: bookingId },
                'VendorReviews',
                'Vendor',
              ]
            : [],
      }),
      getBookingReview: builder.query<{ data: Review | null }, string>({
        query: (bookingId) =>
          `/reviews/booking/${encodeURIComponent(bookingId)}`,
        providesTags: (_result, _error, id) => [{ type: 'BookingReview', id }],
      }),
      getVendorReviews: builder.query<
        VendorReviewsResponse,
        { vendorId: string; page: number; limit: number }
      >({
        query: ({ vendorId, page, limit }) => ({
          url: `/reviews/vendor/${encodeURIComponent(vendorId)}`,
          params: { page, limit },
        }),
        providesTags: ['VendorReviews'],
      }),
      getVendorPublicStats: builder.query({
        query: ({ vendorId }) => ({
          url: `/reviews/${encodeURIComponent(vendorId)}/public-stats`,
        }),
        providesTags: ['VendorReviews'],
      }),
    }),
  });
export const {
  useCreateReviewMutation,
  useGetBookingReviewQuery,
  useGetVendorReviewsQuery,
  useGetVendorPublicStatsQuery,
} = reviewApi;
