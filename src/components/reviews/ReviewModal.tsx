import { useRef, useState } from 'react';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import {
  useCreateReviewMutation,
  useGetBookingReviewQuery,
  type ReviewBooking,
} from '../../features/reviews/reviewApi';

export default function ReviewModal({
  booking,
  onClose,
  checkExistingReview = true,
}: {
  booking: ReviewBooking;
  onClose: () => void;
  checkExistingReview?: boolean;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [blocked, setBlocked] = useState(false);
  const pending = useRef(false);
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const existing = useGetBookingReviewQuery(booking.id, {
    skip: !checkExistingReview,
    refetchOnMountOrArgChange: true,
  });
  const reviewed = checkExistingReview && !!existing.data?.data;
  const checking = checkExistingReview && existing.isFetching;
  const checkFailed = checkExistingReview && existing.isError;
  const checkMissing = checkExistingReview && !existing.data;
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      pending.current ||
      blocked ||
      reviewed ||
      checking ||
      checkFailed ||
      checkMissing
    )
      return;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setError('Please select a rating from 1 to 5 stars.');
      return;
    }
    pending.current = true;
    setError('');
    try {
      if (!booking.clientId) {
        setError('Client details are missing from this completion request. Please reopen your completion link.');
        return;
      }
      await createReview({ bookingId: booking.id, clientId: booking.clientId, rating, comment }).unwrap();
      toast.success('Thank you! Your review has been submitted.');
      onClose();
    } catch (err) {
      const status = (err as { status?: number }).status;
      const messages: Record<number, string> = {
        409: 'You have already reviewed this booking.',
        400: 'This booking is not eligible for a review. Please check your completed bookings.',
        401: 'Unable to submit a review for this completion request.',
        403: 'You do not have permission to review this booking.',
      };
      setError(
        messages[status ?? 0] ||
          'Unable to submit your review. Please try again.',
      );
      if (status && [400, 401, 403, 409].includes(status)) setBlocked(true);
    } finally {
      pending.current = false;
    }
  };
  return (
    <Modal
      open
      onClose={() => {
        if (!pending.current) onClose();
      }}
      title='Leave a Review'
    >
      <form onSubmit={submit} className='space-y-4' aria-label='Leave a Review'>
        <h2 className='text-lg font-semibold text-gray-900'>
          How was your experience with{' '}
          {booking.vendor?.businessName || booking.vendorName || 'your vendor'}?
        </h2>
        {(booking.services?.name || booking.serviceName) && (
          <p className='text-sm text-gray-500'>
            {booking.services?.name || booking.serviceName}
          </p>
        )}
        {checking ? (
          <p role='status'>Checking review status...</p>
        ) : reviewed ? (
          <p role='status'>You have already reviewed this booking.</p>
        ) : checkFailed ? (
          <div role='alert'>
            Unable to check your review status.{' '}
            <button
              type='button'
              onClick={() => existing.refetch()}
              className='text-purple-600 underline'
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <fieldset disabled={isLoading || blocked}>
              <legend className='mb-2 text-sm font-medium'>
                Rating (required)
              </legend>
              <div className='flex gap-2'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label
                    key={value}
                    className='cursor-pointer rounded p-1 focus-within:ring-2 focus-within:ring-purple-600'
                  >
                    <input
                      className='sr-only'
                      type='radio'
                      name='rating'
                      value={value}
                      checked={rating === value}
                      onChange={() => {
                        setRating(value);
                        setError('');
                      }}
                      aria-label={`${value} ${value === 1 ? 'star' : 'stars'}`}
                    />
                    <Star
                      aria-hidden='true'
                      className={
                        value <= rating
                          ? 'h-8 w-8 fill-amber-400 text-amber-400'
                          : 'h-8 w-8 text-gray-400'
                      }
                    />
                  </label>
                ))}
              </div>
            </fieldset>
            <Textarea
              label='Comment (optional)'
              aria-label='Comment (optional)'
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isLoading || blocked}
            />
          </>
        )}
        {error && (
          <p role='alert' className='text-sm text-red-600'>
            {error}
          </p>
        )}
        <Button
          type='submit'
          disabled={
            isLoading ||
            blocked ||
            reviewed ||
            checking ||
            checkFailed ||
            checkMissing
          }
        >
          {isLoading ? 'Submitting...' : 'Submit Review'}
        </Button>
        <button
          type='button'
          disabled={isLoading}
          onClick={onClose}
          className='w-full rounded-lg border border-gray-200 py-2 text-sm text-gray-700 disabled:opacity-50'
        >
          Maybe Later / Close
        </button>
      </form>
    </Modal>
  );
}
