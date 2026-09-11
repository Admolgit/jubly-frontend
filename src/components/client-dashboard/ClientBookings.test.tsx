// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import ClientBookings from './ClientBookings';
const mocks = vi.hoisted(() => ({ approve: vi.fn(), lookup: vi.fn() }));
vi.mock('react-redux', () => ({
  useSelector: () => ({ role: 'CLIENT', email: 'client@example.test' }),
}));
vi.mock('../../features/booking/bookingApi', () => ({
  useGetClientsBookingsQuery: () => ({
    data: {
      data: [
        {
          id: 'b1',
          status: 'COMPLETION_PENDING_APPROVAL',
          date: '2026-09-10',
          startTime: '2026-09-10T10:00:00Z',
        },
      ],
      meta: { total: 1 },
    },
  }),
  useGetClientsBookingStatsQuery: () => ({ data: {} }),
  useMarkBookingAsCompletedMutation: () => [mocks.approve, {}],
  useCancelBookingMutation: () => [vi.fn(), {}],
  useLazyGetClientsBookingsQuery: () => [mocks.lookup],
}));
vi.mock('../ui/LinkActions', () => ({
  LinkActions: ({
    onMarking,
    link,
  }: {
    onMarking: (booking: unknown) => void;
    link: unknown;
  }) => <button onClick={() => onMarking(link)}>Approve completion</button>,
}));
vi.mock('../vendor-dashboard/booking/BookingViewModal', () => ({
  default: () => null,
}));
vi.mock('../vendor-dashboard/booking/RequestRescheduleModal', () => ({
  default: () => null,
}));
vi.mock('../vendor-dashboard/booking/ManageRescheduleModal', () => ({
  default: () => null,
}));
vi.mock('../reviews/ReviewModal', () => ({
  default: () => <div>Review modal opened</div>,
}));
vi.mock('../reviews/BookingReviewAction', () => ({ default: () => null }));
beforeEach(() => vi.clearAllMocks());
afterEach(cleanup);
it('waits for successful dashboard completion approval before opening review', async () => {
  let resolve!: (value: unknown) => void;
  mocks.approve.mockReturnValue({
    unwrap: () =>
      new Promise((done) => {
        resolve = done;
      }),
  });
  render(<ClientBookings />);
  fireEvent.click(screen.getByText('Approve completion'));
  fireEvent.click(screen.getByText('Yes, mark as completed'));
  expect(screen.queryByText('Review modal opened')).toBeNull();
  resolve({ data: { status: 'COMPLETED' } });
  expect(await screen.findByText('Review modal opened')).toBeTruthy();
  expect(mocks.approve).toHaveBeenCalledWith('b1');
});
it('does not open review after dashboard approval fails', async () => {
  mocks.approve.mockReturnValue({
    unwrap: () => Promise.reject(new Error('Failed')),
  });
  render(<ClientBookings />);
  fireEvent.click(screen.getByText('Approve completion'));
  fireEvent.click(screen.getByText('Yes, mark as completed'));
  await waitFor(() => expect(mocks.approve).toHaveBeenCalledOnce());
  expect(screen.queryByText('Review modal opened')).toBeNull();
  expect(mocks.lookup).not.toHaveBeenCalled();
});
it('confirms omitted status using completed bookings independent of dashboard filters', async () => {
  mocks.approve.mockReturnValue({
    unwrap: () => Promise.resolve({ data: {} }),
  });
  mocks.lookup.mockReturnValue({
    unwrap: () =>
      Promise.resolve({ data: [{ id: 'b1', status: 'COMPLETED' }] }),
  });
  render(<ClientBookings />);
  fireEvent.click(screen.getByText('Approve completion'));
  fireEvent.click(screen.getByText('Yes, mark as completed'));
  expect(await screen.findByText('Review modal opened')).toBeTruthy();
  expect(mocks.lookup).toHaveBeenCalledWith({
    email: 'client@example.test',
    page: 1,
    limit: 50,
    status: 'COMPLETED',
  });
});
