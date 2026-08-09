/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import { useRequestRescheduleMutation } from '../../../features/booking/bookingApi';

type Props = {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly booking: any;
};

export default function RequestRescheduleModal({
  open,
  onClose,
  booking,
}: Props) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const [requestReschedule, { isLoading }] = useRequestRescheduleMutation();

  useEffect(() => {
    if (!open) return;
    const newDate = booking?.date ? booking.date.split('T')[0] : '';
    const newTime = booking?.startTime
      ? new Date(booking.startTime).toISOString().slice(11, 16)
      : '';

    // Defer state updates to avoid synchronous setState within the effect
    const t = window.setTimeout(() => {
      setDate(newDate);
      setTime(newTime);
      setReason('');
    }, 0);

    return () => clearTimeout(t);
  }, [open, booking]);

  const alreadyRescheduled = booking?.rescheduleCount > 0;

  const handleSubmit = async () => {
    if (!booking?.id || !date || !time) {
      toast.error('Please select a date and time');
      return;
    }

    const proposedDate = new Date(`${date}T${time}`).toISOString();

    try {
      await requestReschedule({
        bookingId: booking.id,
        proposedDate,
        reason: reason || undefined,
      }).unwrap();
      toast.success('Reschedule requested successfully');
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to request reschedule');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title='Request Reschedule'>
      {alreadyRescheduled ? (
        <div className='space-y-4'>
          <p className='text-md text-gray-600'>
            This booking has already been rescheduled once and can't be
            rescheduled again.
          </p>
          <div className='flex justify-end'>
            <button
              type='button'
              className='rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className='space-y-4'>
          <Input
            label='Proposed Date'
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]'
          />
          <Input
            label='Proposed Time'
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className='border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]'
          />
          <Textarea
            label='Reason (optional)'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Let them know why you'd like to reschedule..."
            rows={3}
          />
          <div className='flex flex-wrap justify-between gap-3'>
            <button
              type='button'
              className='rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type='button'
              className='rounded-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60'
              onClick={handleSubmit}
              disabled={!date || !time || isLoading}
            >
              {isLoading ? 'Requesting...' : 'Send Reschedule Request'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
