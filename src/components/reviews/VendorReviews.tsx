import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useGetVendorReviewsQuery } from '../../features/reviews/reviewApi';
import Loader from '../ui/Loader';

export default function VendorReviews({ vendorId }: { vendorId: string }) {
  const [index, setIndex] = useState(0);
  const { currentData, isFetching, isError, refetch } =
    useGetVendorReviewsQuery({ vendorId, page: 1, limit: 5 });
  const data = currentData?.data;
  const reviews = data?.reviews?.slice(0, 5) ?? [];
  const activeIndex = Math.min(index, Math.max(0, reviews.length - 1));
  const arrowClass = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-200 bg-white text-violet-600 shadow-sm transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-30 sm:h-11 sm:w-11';

  return (
    <section className='rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:p-8' aria-label='Customer reviews' aria-roledescription='carousel'>
      <h2 className='mb-4 text-2xl font-semibold text-gray-900'>Customer reviews</h2>
      {isFetching ? <Loader /> : isError || !data ? (
        <p role='alert'>Unable to load reviews. <button className='text-purple-600 underline' onClick={() => refetch()}>Retry</button></p>
      ) : reviews.length === 0 ? <p className='text-gray-500'>No reviews yet</p> : (
        <>
          <p className='mb-6 font-semibold'>
            ★ {Number(data.averageRating ?? 0).toFixed(1)} ({data.totalReviews} {data.totalReviews === 1 ? 'review' : 'reviews'})
          </p>
          <div className='flex items-center gap-2 sm:gap-4'>
            <button type='button' aria-label='Previous review' className={arrowClass} disabled={activeIndex === 0} onClick={() => setIndex(activeIndex - 1)}>
              <ChevronLeft className='h-5 w-5' aria-hidden='true' />
            </button>
            <div className='min-w-0 flex-1 overflow-hidden rounded-2xl'>
              <div className='flex transition-transform duration-500 ease-out motion-reduce:transition-none' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {reviews.map((review, reviewIndex) => {
                  const name = review.customer?.displayName || review.customerName || review.customer?.name || 'Client';
                  return (
                    <article key={review.id} role='group' aria-roledescription='slide' aria-label={`Review ${reviewIndex + 1} of ${reviews.length}`} aria-hidden={reviewIndex !== activeIndex} className='w-full shrink-0 space-y-4 rounded-2xl border border-violet-100 bg-violet-50/50 p-4 sm:p-6 md:p-8'>
                      <div className='flex flex-wrap items-center gap-3'>
                        <span aria-hidden='true' className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-lg font-semibold text-violet-700'>{name.charAt(0).toUpperCase()}</span>
                        <div className='min-w-0'>
                          <p className='break-words font-semibold text-gray-900'>{name}</p>
                          <time className='text-xs text-gray-500' dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                        </div>
                      </div>
                      <div className='flex gap-1 text-amber-500' aria-label={`${review.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} aria-hidden='true' className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= review.rating ? 'fill-current' : 'text-gray-300'}`} />)}
                      </div>
                      {review.comment && <p className='whitespace-pre-wrap break-words leading-relaxed text-gray-700'>{review.comment}</p>}
                      {(review.service?.name || review.serviceName) && <p className='text-sm font-medium text-violet-600'>{review.service?.name || review.serviceName}</p>}
                    </article>
                  );
                })}
              </div>
            </div>
            <button type='button' aria-label='Next review' className={arrowClass} disabled={activeIndex === reviews.length - 1} onClick={() => setIndex(activeIndex + 1)}>
              <ChevronRight className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
          <p className='mt-4 text-center text-sm text-gray-500' aria-live='polite' aria-atomic='true'>{activeIndex + 1} of {reviews.length}</p>
        </>
      )}
    </section>
  );
}
