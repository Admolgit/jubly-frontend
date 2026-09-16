// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CompletionReviewPage from './CompletionReviewPage';
const mocks = vi.hoisted(() => ({ approve: vi.fn(), load: vi.fn() }));
vi.mock('../features/booking/completionReviewApi', () => ({
  approveCompletion: mocks.approve,
  getCompletionReview: mocks.load,
  rejectCompletion: vi.fn(),
}));
vi.mock('../components/reviews/ReviewModal', () => ({
  default: () => <div>Review modal opened</div>,
}));
vi.mock('../components/reviews/BookingReviewAction', () => ({
  default: () => <div>Review later</div>,
}));
beforeEach(() => {
  vi.clearAllMocks();
  mocks.load.mockResolvedValue({
    data: {
      bookingId: 'b1',
      clientId: 'client-1',
      status: 'COMPLETION_PENDING_APPROVAL',
      canAct: true,
      vendorName: 'Ada',
      serviceName: 'Makeup',
      clientName: 'Client',
      date: '2026-09-10',
      startTime: '2026-09-10T10:00:00Z',
      endTime: '2026-09-10T11:00:00Z',
    },
  });
});
afterEach(cleanup);
it('opens review without sign-in only after approval resolves with COMPLETED', async () => {
  let resolve!: (value: unknown) => void;
  mocks.approve.mockReturnValue(
    new Promise((done) => {
      resolve = done;
    }),
  );
  render(
    <MemoryRouter initialEntries={['/?token=test']}>
      <CompletionReviewPage />
    </MemoryRouter>,
  );
  fireEvent.click(await screen.findByText('Approve'));
  expect(screen.queryByText('Review modal opened')).toBeNull();
  resolve({ data: { status: 'COMPLETED' } });
  expect(await screen.findByText('Review modal opened')).toBeTruthy();
  expect(mocks.approve).toHaveBeenCalledWith('test');
});
it('does not open review after approval fails', async () => {
  mocks.approve.mockRejectedValue(new Error('Approval failed'));
  render(
    <MemoryRouter initialEntries={['/?token=test']}>
      <CompletionReviewPage />
    </MemoryRouter>,
  );
  fireEvent.click(await screen.findByText('Approve'));
  await screen.findByText('Approve');
  expect(screen.queryByText('Review modal opened')).toBeNull();
});
it('does not open review when approval does not confirm COMPLETED', async () => {
  mocks.approve.mockResolvedValue({
    message: 'Processed',
    data: { status: 'CONFIRMED' },
  });
  render(
    <MemoryRouter initialEntries={['/?token=test']}>
      <CompletionReviewPage />
    </MemoryRouter>,
  );
  fireEvent.click(await screen.findByText('Approve'));
  await screen.findByText('Processed');
  expect(screen.queryByText('Review modal opened')).toBeNull();
});
