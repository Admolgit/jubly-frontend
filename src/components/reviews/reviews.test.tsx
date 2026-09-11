// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import ReviewModal from './ReviewModal';
import BookingReviewAction from './BookingReviewAction';
import VendorReviews from './VendorReviews';

const mocks = vi.hoisted(() => ({
  create: vi.fn(),
  close: vi.fn(),
  success: vi.fn(),
  booking: {
    data: { data: null as unknown },
    isFetching: false,
    isError: false,
    refetch: vi.fn(),
  },
  vendor: {
    currentData: {
      data: { reviews: [] as unknown[], averageRating: 0, totalReviews: 0 },
    },
    isFetching: false,
    isError: false,
    refetch: vi.fn(),
  },
}));
vi.mock('../../features/reviews/reviewApi', () => ({
  useCreateReviewMutation: () => [mocks.create, { isLoading: false }],
  useGetBookingReviewQuery: () => mocks.booking,
  useGetVendorReviewsQuery: () => mocks.vendor,
}));
vi.mock('react-hot-toast', () => ({ default: { success: mocks.success } }));
const booking = {
  id: 'booking-1',
  clientId: 'client-1',
  status: 'COMPLETED',
  vendorName: 'Ada Beauty',
  serviceName: 'Makeup',
};
beforeEach(() => {
  vi.clearAllMocks();
  mocks.booking.data.data = null;
  mocks.create.mockReturnValue({
    unwrap: () => Promise.resolve({ data: { rating: 5 } }),
  });
});
afterEach(cleanup);
describe('client review', () => {
  it('submits public reviews without waiting for a protected status query', async () => {
    mocks.booking.isError = true;
    try {
      render(<ReviewModal booking={booking} onClose={mocks.close} checkExistingReview={false} />);
      fireEvent.click(screen.getByLabelText('5 stars'));
      fireEvent.click(screen.getByText('Submit Review'));
      await waitFor(() => expect(mocks.close).toHaveBeenCalledOnce());
      expect(mocks.create).toHaveBeenCalledWith({ bookingId: booking.id, clientId: booking.clientId, rating: 5, comment: '' });
    } finally { mocks.booking.isError = false; }
  });
  it('requires a rating', () => {
    render(<ReviewModal booking={booking} onClose={mocks.close} />);
    fireEvent.click(screen.getByText('Submit Review'));
    expect(screen.getByRole('alert').textContent).toContain('select a rating');
    expect(mocks.create).not.toHaveBeenCalled();
  });
  it.each(['Excellent service.', ''])(
    'submits five stars with comment %j and closes',
    async (comment) => {
      render(<ReviewModal booking={booking} onClose={mocks.close} />);
      fireEvent.click(screen.getByLabelText('5 stars'));
      fireEvent.change(screen.getByLabelText('Comment (optional)'), {
        target: { value: comment },
      });
      fireEvent.click(screen.getByText('Submit Review'));
      await waitFor(() => expect(mocks.close).toHaveBeenCalledOnce());
      expect(mocks.create).toHaveBeenCalledWith({
        bookingId: booking.id,
        clientId: booking.clientId,
        rating: 5,
        comment,
      });
      expect(mocks.success).toHaveBeenCalledOnce();
    },
  );
  it.each([400, 401, 403, 409])(
    'handles status %s and blocks repeated submission',
    async (status) => {
      mocks.create.mockReturnValue({
        unwrap: () => Promise.reject({ status }),
      });
      render(<ReviewModal booking={booking} onClose={mocks.close} />);
      fireEvent.click(screen.getByLabelText('5 stars'));
      fireEvent.click(screen.getByText('Submit Review'));
      await screen.findByRole('alert');
      expect(
        (screen.getByText('Submit Review') as HTMLButtonElement).disabled,
      ).toBe(true);
      if (status === 409)
        expect(screen.getByRole('alert').textContent).toContain(
          'already reviewed',
        );
      fireEvent.click(screen.getByText('Submit Review'));
      expect(mocks.create).toHaveBeenCalledOnce();
    },
  );
  it('allows retry after a network failure', async () => {
    mocks.create.mockReturnValue({
      unwrap: () => Promise.reject({ status: 'FETCH_ERROR' }),
    });
    render(<ReviewModal booking={booking} onClose={mocks.close} />);
    fireEvent.click(screen.getByLabelText('5 stars'));
    fireEvent.click(screen.getByText('Submit Review'));
    await screen.findByRole('alert');
    expect(
      (screen.getByText('Submit Review') as HTMLButtonElement).disabled,
    ).toBe(false);
  });
  it('prevents concurrent submissions', () => {
    mocks.create.mockReturnValue({ unwrap: () => new Promise(() => {}) });
    render(<ReviewModal booking={booking} onClose={mocks.close} />);
    fireEvent.click(screen.getByLabelText('5 stars'));
    fireEvent.click(screen.getByText('Submit Review'));
    fireEvent.click(screen.getByText('Submit Review'));
    expect(mocks.create).toHaveBeenCalledOnce();
  });
  it('can close without changing the completed booking', () => {
    render(<ReviewModal booking={booking} onClose={mocks.close} />);
    fireEvent.click(screen.getByText('Maybe Later / Close'));
    expect(mocks.close).toHaveBeenCalledOnce();
    expect(mocks.create).not.toHaveBeenCalled();
    expect(booking.status).toBe('COMPLETED');
  });
  it('shows Leave a Review then Reviewed when query state updates', () => {
    const view = render(
      <BookingReviewAction booking={booking} onReview={mocks.close} />,
    );
    fireEvent.click(screen.getByText('Leave a Review'));
    expect(mocks.close).toHaveBeenCalledWith(booking);
    mocks.booking.data.data = { rating: 5 };
    view.rerender(
      <BookingReviewAction booking={booking} onReview={mocks.close} />,
    );
    expect(screen.getByText('Reviewed')).toBeTruthy();
    expect(screen.queryByText('Leave a Review')).toBeNull();
  });
});
describe('public vendor reviews', () => {
  it('shows an empty state', () => {
    render(<VendorReviews vendorId='vendor-1' />);
    expect(screen.getByText('No reviews yet')).toBeTruthy();
  });
  it('shows server average, count and public review fields', () => {
    mocks.vendor.currentData.data = {
      averageRating: 4.8,
      totalReviews: 27,
      reviews: [
        {
          id: 'r1',
          customer: { displayName: 'Ada' },
          rating: 5,
          comment: 'Excellent',
          serviceName: 'Makeup',
          createdAt: '2026-09-10T12:00:00Z',
        },
      ],
    };
    render(<VendorReviews vendorId='vendor-1' />);
    expect(screen.getByText('★ 4.8 (27 reviews)')).toBeTruthy();
    for (const text of ['Ada', 'Excellent', 'Makeup', '1 of 1'])
      expect(screen.getByText(text)).toBeTruthy();
    expect(screen.getByLabelText('5 out of 5 stars')).toBeTruthy();
  });
  it('limits the carousel to five reviews and navigates in both directions', () => {
    mocks.vendor.currentData.data = {
      averageRating: 5,
      totalReviews: 6,
      reviews: Array.from({ length: 6 }, (_, index) => ({ id: `r${index}`, customerName: `Client ${index}`, rating: 5, createdAt: '2026-09-10T12:00:00Z' })),
    };
    render(<VendorReviews vendorId='vendor-1' />);
    const previous = screen.getByRole('button', { name: 'Previous review' }) as HTMLButtonElement;
    const next = screen.getByRole('button', { name: 'Next review' }) as HTMLButtonElement;
    expect(previous.disabled).toBe(true);
    expect(screen.queryByText('Client 5')).toBeNull();
    fireEvent.click(next);
    expect(screen.getByRole('group', { name: 'Review 2 of 5' })).toBeTruthy();
    expect(screen.getByText('2 of 5')).toBeTruthy();
    fireEvent.click(previous);
    expect(screen.getByRole('group', { name: 'Review 1 of 5' })).toBeTruthy();
    for (let count = 0; count < 4; count++) fireEvent.click(next);
    expect(screen.getByRole('group', { name: 'Review 5 of 5' })).toBeTruthy();
    expect(next.disabled).toBe(true);
  });
});
