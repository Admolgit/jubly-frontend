// @vitest-environment jsdom
import { configureStore } from '@reduxjs/toolkit';
import { afterEach, expect, it, vi } from 'vitest';
import { reviewApi } from './reviewApi';

afterEach(() => vi.unstubAllGlobals());
it('sends only review fields, omits empty comments, and refreshes booking and vendor caches', async () => {
  let reviewed = false;
  const bodies: unknown[] = [];
  const fetchMock = vi.fn(async (request: Request) => {
    if (request.method === 'POST') {
      expect(new URL(request.url).pathname).toBe('/api/v1/reviews/client-1');
      expect(request.headers.has('Authorization')).toBe(false);
      bodies.push(await request.json());
      reviewed = true;
      return Response.json({ data: { id: 'r1', rating: 5 } });
    }
    if (request.url.includes('/reviews/booking/'))
      return Response.json({ data: reviewed ? { id: 'r1', rating: 5 } : null });
    return Response.json({
      data: {
        reviews: reviewed ? [{ id: 'r1', rating: 5 }] : [],
        averageRating: reviewed ? 5 : 0,
        totalReviews: reviewed ? 1 : 0,
      },
    });
  });
  vi.stubGlobal('fetch', fetchMock);
  const store = configureStore({
    reducer: {
      [reviewApi.reducerPath]: reviewApi.reducer,
      auth: () => ({ token: null }),
    },
    middleware: (getDefault) => getDefault().concat(reviewApi.middleware),
  });
  const booking = store.dispatch(
    reviewApi.endpoints.getBookingReview.initiate('b1'),
  );
  const vendorArgs = { vendorId: 'v1', page: 1, limit: 10 };
  const vendor = store.dispatch(
    reviewApi.endpoints.getVendorReviews.initiate(vendorArgs),
  );
  await Promise.all([booking.unwrap(), vendor.unwrap()]);
  await store
    .dispatch(
      reviewApi.endpoints.createReview.initiate({
        bookingId: 'b1',
        clientId: 'client-1',
        rating: 5,
        comment: '  ',
      }),
    )
    .unwrap();
  await vi.waitFor(() => {
    expect(
      reviewApi.endpoints.getBookingReview.select('b1')(store.getState()).data
        ?.data?.rating,
    ).toBe(5);
    expect(
      reviewApi.endpoints.getVendorReviews.select(vendorArgs)(store.getState())
        .data?.data.totalReviews,
    ).toBe(1);
  });
  expect(bodies).toEqual([{ bookingId: 'b1', rating: 5 }]);
  booking.unsubscribe();
  vendor.unsubscribe();
  store.dispatch(reviewApi.util.resetApiState());
});
