import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CalendarDays, CheckCircle2, Clock3 } from 'lucide-react';

import {
  approveCompletion,
  getCompletionReview,
  rejectCompletion,
  type CompletionReviewData,
} from '../features/booking/completionReviewApi';
import { formatDate } from '../components/utils/dateFormatter';
import { formatTimeFromISO } from '../components/utils/timeFormatter';
import Loader from '../components/ui/Loader';
import Textarea from '../components/ui/Textarea';

const REASON_MAX_LENGTH = 500;

function getInactionableMessage(status?: string): string {
  if (status === 'COMPLETED') {
    return 'This booking has already been completed and payment has been released to the vendor.';
  }
  if (status === 'CONFIRMED') {
    return 'This request is no longer pending — it was rejected and the booking is back to confirmed.';
  }
  return 'This request is no longer pending.';
}

function Card({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12'>
      <div className='w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 shadow-sm'>
        <p className='text-sm font-medium uppercase tracking-[0.2em] text-purple-600'>
          Jubly
        </p>
        {children}
      </div>
    </div>
  );
}

export default function CompletionReviewPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [review, setReview] = useState<CompletionReviewData | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    if (!token) {
      setLoadError('This link is invalid or has expired.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await getCompletionReview(token);
        setReview(res.data);
      } catch (err) {
        setLoadError(
          err instanceof Error
            ? err.message
            : 'This link is invalid or has expired.',
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const handleApprove = async () => {
    if (!token) return;

    setSubmitting(true);
    try {
      const res = await approveCompletion(token);
      setResultMessage(
        res.message || 'Approved — payment has been released to the vendor.',
      );
      setReview((prev) =>
        prev
          ? { ...prev, canAct: false, status: res.data?.status || prev.status }
          : prev,
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'This link is invalid or has expired.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!token) return;

    setSubmitting(true);
    try {
      const res = await rejectCompletion(token, rejectReason);
      setResultMessage(
        res.message ||
          'Rejected — the vendor has been notified and the booking is back to confirmed.',
      );
      setReview((prev) =>
        prev
          ? { ...prev, canAct: false, status: res.data?.status || prev.status }
          : prev,
      );
      setShowRejectForm(false);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'This link is invalid or has expired.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <Loader size='lg' />
      </div>
    );
  }

  if (loadError || !review) {
    return (
      <Card>
        <h1 className='mt-3 text-2xl font-bold tracking-tight text-gray-900'>
          This link is invalid or has expired
        </h1>
        <p className='mt-3 text-sm leading-6 text-gray-600'>
          {loadError ||
            'We could not find a matching completion request. It may have already been used.'}
        </p>
        <Link
          to='/'
          className='mt-6 inline-flex w-full items-center justify-center rounded-lg bg-purple-600 py-2 text-sm font-medium text-white transition hover:bg-purple-700'
        >
          Go to Jubly
        </Link>
      </Card>
    );
  }

  return (
    <Card>
      <h1 className='mt-3 text-2xl font-bold tracking-tight text-gray-900'>
        Review completion request
      </h1>
      <p className='mt-2 text-sm leading-6 text-gray-600'>
        {review.vendorName} marked this booking as complete. Please review the
        details below.
      </p>

      <div className='mt-6 space-y-3 rounded-2xl border border-gray-200 p-5'>
        <SummaryRow label='Service' value={review.serviceName} />
        <SummaryRow label='Vendor' value={review.vendorName} />
        <SummaryRow label='Client' value={review.clientName} />
        <SummaryRow
          label='Date'
          value={formatDate(review.date, 'DD MMM, YYYY')}
          icon={<CalendarDays className='h-4 w-4 text-gray-400' />}
        />
        <SummaryRow
          label='Time'
          value={`${formatTimeFromISO(review.startTime)} – ${formatTimeFromISO(review.endTime)}`}
          icon={<Clock3 className='h-4 w-4 text-gray-400' />}
        />
      </div>

      {resultMessage ? (
        <div className='mt-6 flex items-start gap-3 rounded-2xl bg-green-50 p-4'>
          <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-green-600' />
          <p className='text-sm font-medium text-green-800'>{resultMessage}</p>
        </div>
      ) : !review.canAct ? (
        <div className='mt-6 rounded-2xl bg-gray-50 p-4'>
          <p className='text-sm font-medium text-gray-700'>
            {getInactionableMessage(review.status)}
          </p>
        </div>
      ) : showRejectForm ? (
        <div className='mt-6 space-y-3'>
          <Textarea
            label='Reason (optional)'
            value={rejectReason}
            onChange={(e) =>
              setRejectReason(e.target.value.slice(0, REASON_MAX_LENGTH))
            }
            placeholder='Let the vendor know why...'
            rows={3}
            maxLength={REASON_MAX_LENGTH}
          />
          <p className='-mt-2 text-right text-xs text-gray-400'>
            {rejectReason.length}/{REASON_MAX_LENGTH}
          </p>
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={() => setShowRejectForm(false)}
              disabled={submitting}
              className='flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50'
            >
              Back
            </button>
            <button
              type='button'
              onClick={handleReject}
              disabled={submitting}
              className='flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50'
            >
              {submitting ? 'Submitting...' : 'Confirm Reject'}
            </button>
          </div>
        </div>
      ) : (
        <div className='mt-6 flex gap-3'>
          <button
            type='button'
            onClick={() => setShowRejectForm(true)}
            disabled={submitting}
            className='flex-1 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50'
          >
            Reject
          </button>
          <button
            type='button'
            onClick={handleApprove}
            disabled={submitting}
            className='flex-1 rounded-lg bg-purple-600 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:opacity-50'
          >
            {submitting ? 'Submitting...' : 'Approve'}
          </button>
        </div>
      )}
    </Card>
  );
}

function SummaryRow({
  label,
  value,
  icon,
}: {
 readonly label: string;
 readonly value: string;
 readonly icon?: React.ReactNode;
}) {
  return (
    <div className='flex items-center justify-between gap-4'>
      <span className='text-sm text-gray-500'>{label}</span>
      <span className='flex items-center gap-2 text-sm font-medium text-gray-900'>
        {icon}
        {value}
      </span>
    </div>
  );
}
