/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  CalendarDays,
  Clock3,
  Copy,
  Download,
  MapPin,
  Wallet,
} from 'lucide-react';
import { useSelector } from 'react-redux';

import Modal from '../../ui/Modal';
import { formatDate } from '../../utils/dateFormatter';
import { formatTimeFromISO, timeAgo } from '../../utils/timeFormatter';
import {
  getBookingStatusBadge,
  CANCELLED_BOOKING_STATUSES,
} from '../../utils/bookingStatus';

type Props = {
  open: boolean;
  onClose: () => void;
  booking: any;
  onCancel: (booking: any) => void;
  onMarkComplete: (booking: any) => void;
  onReschedule: (booking: any) => void;
  onManageReschedule?: (booking: any) => void;
};

export default function ViewBookingModal({
  open,
  onClose,
  booking,
  onCancel,
  onMarkComplete,
  onReschedule,
  onManageReschedule,
}: Props) {
  const user = useSelector((state: any) => state.auth.user);
  const isClientViewer = user?.role === 'CLIENT';

  if (!booking) return null;
  const bookingStatus = booking?.status;
  const isCancelled = CANCELLED_BOOKING_STATUSES.includes(bookingStatus);
  const isPendingCompletionApproval =
    bookingStatus === 'COMPLETION_PENDING_APPROVAL';
  const mapUrl = booking?.clientAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.clientAddress)}`
    : null;

  const lastStep = isCancelled
    ? {
        title: 'Booking Cancelled',
        description: 'This booking was cancelled',
        active: true,
        cancelled: true,
      }
    : bookingStatus === 'COMPLETED'
      ? {
          title: 'Completed',
          description: 'Service completed successfully',
          active: true,
          completed: true,
        }
      : bookingStatus === 'RESCHEDULE_REQUESTED'
        ? {
            title: 'Reschedule Pending',
            description: 'Waiting for the other party to respond to a reschedule proposal',
            warning: true,
          }
        : isPendingCompletionApproval
          ? {
              title: 'Awaiting Client Approval',
              description: isClientViewer
                ? 'The vendor marked this complete — please review and respond'
                : 'Waiting for the client to approve or reject this completion',
              warning: true,
            }
          : {
            title: 'Awaiting Completion',
            description: 'Mark as completed after service',
            warning: true,
          };

  const timeline = [
    {
      title: 'Booking Created',
      description: 'Your booking was created successfully',
      active: true,
      warning: false,
    },
    {
      title: 'Payment Confirmed',
      description: 'Payment received and confirmed',
      active:
        bookingStatus === 'CONFIRMED' ||
        bookingStatus === 'COMPLETED' ||
        bookingStatus === 'RESCHEDULE_REQUESTED' ||
        isCancelled,
      // warning: false,
    },
    {
      title: 'Appointment Scheduled',
      description: 'Vendor confirmed your appointment',
      active:
        bookingStatus === 'CONFIRMED' ||
        bookingStatus === 'COMPLETED' ||
        bookingStatus === 'RESCHEDULE_REQUESTED' ||
        isCancelled,
    },
    lastStep,
  ];

  return (
    <Modal open={open} onClose={onClose} title='Booking Details' size='lg'>
      <div className='-mx-6 -my-5'>
        <div className='space-y-4 p-4'>
          {/* Top */}
          <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-5'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-violet-100'>
                <CalendarDays className='h-7 w-7 text-violet-600' />
              </div>

              <div>
                <p className='mb-1 text-xs text-gray-500'>Booking ID</p>

                <div className='flex items-center gap-2'>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {booking?.id}
                  </h3>

                  <Copy className='h-4 w-4 cursor-pointer text-gray-400' />
                </div>

                <p className='mt-2 text-sm text-gray-500'>
                  {formatDate(booking?.createdAt)} •{' '}
                  {formatTimeFromISO(booking?.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <p className='mb-2 text-xs text-gray-500'>Booking Status</p>

              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                  getBookingStatusBadge(booking?.status).wrapper
                }`}
              >
                <span className='h-2 w-2 rounded-full bg-current' />

                {isPendingCompletionApproval
                  ? 'Awaiting Client Approval'
                  : booking?.status}
              </div>

              <p className='mt-3 text-xs text-gray-500'>
                {isPendingCompletionApproval
                  ? isClientViewer
                    ? 'Vendor marked this complete — action needed'
                    : 'Waiting on client approval'
                  : `Your appointment is ${booking?.status?.toLowerCase()}`}
              </p>

              {isPendingCompletionApproval && booking?.completionRequestedAt && (
                <p className='mt-1 text-xs text-gray-400'>
                  Requested {timeAgo(booking.completionRequestedAt)}
                </p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className='overflow-hidden rounded-3xl border border-gray-200'>
            <div className='grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-4 md:divide-x md:divide-y-0'>
              {/* Service */}
              <div className='p-6 flex flex-col items-center'>
                <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100'>
                  <Wallet className='h-5 w-5 text-violet-600' />
                </div>

                <p className='text-xs text-gray-500'>Service</p>

                <h4 className='mt-2 text-md font-semibold text-gray-900'>
                  {booking.services?.name}
                </h4>

                <p className='mt-2 text-xs text-gray-500'>
                  Beauty appointment booking
                </p>
              </div>

              {/* Amount */}
              <div className='p-6 flex flex-col items-center'>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100'>
                  <Wallet className='h-5 w-5 text-green-600' />
                </div>

                <p className='text-xs text-gray-500'>Total Amount</p>

                <h4 className='mt-2 text-md font-semibold text-gray-900'>
                  ₦{Number(booking.services?.price || 0).toLocaleString()}
                </h4>

                <p className='mt-1 text-xs text-gray-400'>NGN</p>
              </div>

              {/* Date */}
              <div className='p-6 flex flex-col items-center'>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100'>
                  <CalendarDays className='h-5 w-5 text-violet-600' />
                </div>

                <p className='text-xs text-gray-500'>Booking Date</p>

                <h4 className="mt-2 text-md font-semibold text-gray-900">
                  {formatDate(booking.date)}
                </h4>

                <p className='mt-1 text-xs text-gray-400'>
                  {formatTimeFromISO(booking.startTime)}
                </p>
              </div>

              {/* Status */}
              <div className='p-6 flex flex-col items-center'>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100'>
                  <Clock3 className='h-5 w-5 text-orange-500' />
                </div>

                <p className='text-xs text-gray-500'>Status</p>

                <div
                  className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    getBookingStatusBadge(booking.status).wrapper
                  }`}
                >
                  <span className='h-2 w-2 rounded-full bg-current' />

                  {isPendingCompletionApproval
                    ? 'Awaiting Client Approval'
                    : booking.status}
                </div>

                <p className='mt-3 text-xs text-gray-400'>
                  {isPendingCompletionApproval
                    ? 'Awaiting client approval'
                    : `Appointment ${booking?.status?.toLowerCase()}`}
                </p>
              </div>
            </div>
          </div>

          {/* Middle */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {/* Client */}
            <Card title='Client Information'>
              <InfoRow label='Name' value={booking.clientName} />

              <InfoRow label='Email' value={booking.clientEmail} />

              <InfoRow label='Phone' value='+234 801 234 5678' />

              <InfoRow
                label='Service Address'
                value={booking.clientAddress || 'Not provided'}
              />

              {mapUrl && (
                <a
                  href={mapUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100'
                >
                  <MapPin className='h-4 w-4' />
                  Open in Google Maps
                </a>
              )}
              <InfoRow label='Notes' value='Please arrive 15 minutes early.' />
            </Card>

            {/* Vendor */}
            <Card title='Vendor Information'>
              <InfoRow
                label='Vendor Name'
                value={
                  booking?.user?.firstName ||
                  'Jane' + ' ' + booking?.user?.lastName ||
                  'Doe'
                }
              />

              <InfoRow
                label='Business Name'
                value={booking.vendor?.businessName || 'Beauty Studio'}
              />

              <InfoRow label='Phone' value={booking.vendor?.phone || '-'} />

              <InfoRow
                label='Location'
                value={
                  booking.vendor?.city +
                  ', ' +
                  booking.vendor?.state +
                  ', ' +
                  booking.vendor?.country
                }
              />
            </Card>

            {/* Appointment */}
            <Card title="Appointment Details">
              <InfoRow label="Date" value={formatDate(booking.date)} />

              <InfoRow
                label='Start Time'
                value={formatTimeFromISO(booking.startTime)}
              />

              <InfoRow
                label='End Time'
                value={formatTimeFromISO(booking.endTime)}
              />

              <InfoRow
                label='Duration'
                value={`${booking.services?.durationMins} mins`}
              />
            </Card>
          </div>

          {/* Bottom */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {/* Payment */}
            <Card title='Payment Information'>
              <InfoRow label='Payment Status' value='PAID' badge />

              <InfoRow
                label='Amount Paid'
                value={`₦${Number(
                  booking.services?.price || 0,
                ).toLocaleString()}`}
              />

              <InfoRow
                label='Platform Fee'
                value={`₦${(
                  Number(booking.services?.price || 0) * 0.05
                ).toLocaleString()}`}
              />

              <InfoRow
                label='Vendor Amount'
                value={`₦${(
                  Number(booking.services?.price || 0) * 0.95
                ).toLocaleString()}`}
              />

              <InfoRow label='Settlement' value='HELD' warning />
            </Card>

            {/* Booking Info */}
            <Card title='Booking Information'>
              <InfoRow label='Booking Type' value='Service Booking' />

              <InfoRow
                label='Booked On'
                value={`${formatDate(booking.createdAt)} • ${formatTimeFromISO(
                  booking.createdAt,
                )}`}
              />

              <InfoRow label='Booked By' value={booking.clientName} />

              <InfoRow label='Booking Source' value='Web Dashboard' />
            </Card>

            {/* Special Request */}
            <Card title='Special Requests'>
              <div className='rounded-2xl bg-violet-50 p-5'>
                <p className='text-gray-700'>
                  Make it soft and natural. Prefer pink tones.
                </p>
              </div>
            </Card>
          </div>

          {/* Timeline */}
          <div className='rounded-3xl border border-gray-200 p-6'>
            <h3 className='mb-8 text-sm font-semibold text-gray-900'>
              Booking Timeline
            </h3>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
              {timeline.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  active={item.active}
                  warning={item.warning}
                  isLast={index === timeline.length - 1}
                  cancelled={isCancelled}
                  completed={bookingStatus === 'COMPLETED'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex flex-col gap-4 border-t border-gray-100 px-8 py-6 lg:flex-row lg:items-center lg:justify-between'>
          <button className='inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100'>
            <Download className='h-4 w-4' />
            Download Receipt
          </button>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
            <button className='rounded-2xl border border-violet-200 bg-violet-50 px-5 py-3 text-xs font-semibold text-violet-700'>
              Contact Vendor
            </button>

            {bookingStatus === 'CONFIRMED' && (
              <>
                {!(booking?.rescheduleCount > 0) && (
                  <button
                    onClick={() => onReschedule(booking)}
                    className='rounded-2xl border border-gray-200 bg-white px-5 py-3 text-xs font-semibold text-gray-700'
                  >
                    Reschedule
                  </button>
                )}

                <button
                  onClick={() => onCancel(booking)}
                  className='rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-xs font-semibold text-red-600'
                >
                  Cancel Booking
                </button>

                <button
                  onClick={() => onMarkComplete(booking)}
                  className='rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-xs font-semibold text-white shadow-lg'
                >
                  Mark as Completed
                </button>
              </>
            )}

            {bookingStatus === 'RESCHEDULE_REQUESTED' && (
              <>
                <button
                  onClick={() => onManageReschedule?.(booking)}
                  className='rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-xs font-semibold text-white shadow-lg'
                >
                  Manage Reschedule Request
                </button>

                <button
                  onClick={() => onCancel(booking)}
                  className='rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-xs font-semibold text-red-600'
                >
                  Cancel Booking
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='overflow-hidden rounded-3xl border border-gray-200'>
      <div className='border-b border-gray-100 px-6 py-5'>
        <h3 className='text-sm font-semibold text-gray-900'>{title}</h3>
      </div>

      <div className='space-y-3 p-4'>{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  badge,
  warning,
}: {
  label: string;
  value: string;
  badge?: boolean;
  warning?: boolean;
}) {
  return (
    <div className='flex items-start justify-between gap-4'>
      <p className='text-sm text-gray-500'>{label}</p>

      {badge ? (
        <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'>
          {value}
        </span>
      ) : warning ? (
        <span className='rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600'>
          {value}
        </span>
      ) : (
        <p className='text-right font-medium text-gray-900'>{value}</p>
      )}
    </div>
  );
}

type TimelineItemProps = {
  title: string;
  description: string;
  active?: boolean;
  warning?: boolean;
  cancelled?: boolean;
  completed?: boolean;
  isLast?: boolean;
};

export function TimelineItem({
  title,
  description,
  active,
  warning,
  isLast,
  cancelled,
  completed,
}: TimelineItemProps) {
  return (
    <div className='relative flex flex-col items-center text-center'>
      {!isLast && (
        <div
          className={`absolute top-5 left-1/2 h-[2px] w-full 
            ${
              cancelled
                ? 'bg-red-500'
                : completed
                  ? 'bg-gray-500'
                  : active
                    ? 'bg-green-500'
                    : 'bg-gray-200'
            }`}
        />
      )}

      <div
        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4
        ${
          cancelled
            ? 'border-red-100 bg-red-500'
            : completed
              ? 'border-gray-200 bg-gray-500'
              : active
                ? 'border-green-100 bg-green-500'
                : warning
                  ? 'border-orange-100 bg-orange-400'
                  : 'border-gray-100 bg-gray-300'
        }`}
      >
        <div className='h-2.5 w-2.5 rounded-full bg-white' />
      </div>

      <h4 className='mt-4 text-sm font-semibold text-gray-900'>{title}</h4>

      <p className='mt-1 text-xs leading-relaxed text-gray-500'>
        {description}
      </p>
    </div>
  );
}
