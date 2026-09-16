import {
  useGetBookingReviewQuery,
  type ReviewBooking,
} from '../../features/reviews/reviewApi';
export default function BookingReviewAction({
  booking,
  onReview,
}: {
  booking: ReviewBooking;
  onReview: (booking: ReviewBooking) => void;
}) {
  const { data, isFetching, isError, refetch } = useGetBookingReviewQuery(
    booking.id,
    { refetchOnMountOrArgChange: true },
  );
  if (isFetching)
    return <span className='text-xs text-gray-500'>Checking review...</span>;
  if (isError || !data)
    return (
      <button className='text-xs text-purple-600' onClick={() => refetch()}>
        Retry review status
      </button>
    );
  if (data.data) return <span className='text-sm text-gray-500'>Reviewed</span>;
  return (
    <button
      className='text-sm font-medium text-purple-600 hover:underline'
      onClick={() => onReview(booking)}
    >
      Leave a Review
    </button>
  );
}
