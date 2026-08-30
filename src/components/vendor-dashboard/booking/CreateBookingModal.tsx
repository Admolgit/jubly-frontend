/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  CalendarDays,
  Clock3,
  Link2,
  ShieldCheck,
  Sparkles,
  Tag,
  UserRound,
  Wallet,
} from 'lucide-react';

import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Loader from '../../ui/Loader';
import { useGetVendorServicesQuery } from '../../../features/services/servicesAPI';
import { useGetVendorAvailabilitySlotsQuery } from '../../../features/availability/availability';
import { useCreateVendorBookingMutation } from '../../../features/booking/bookingApi';
import CreateBookingSuccessView, {
  type CreateBookingSuccessResult,
} from './CreateBookingSuccessView';

export const SUBSCRIPTION_REQUIRED_MESSAGE =
  'Paid-by-hand bookings are available on your Jubly subscription plan.';

const createBookingSchema = z.object({
  clientName: z.string().trim().min(1, 'Client name is required'),
  clientEmail: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  clientPhone: z.string().trim().optional(),
  clientAddress: z.string().optional(),
  serviceId: z.string().min(1, 'Select a service'),
  date: z.string().min(1, 'Select a date'),
  slotStart: z.string().min(1, 'Select an available time'),
  paymentOption: z.enum(['PAY_BY_LINK', 'PAID_BY_HAND']),
});

type CreateBookingFormValues = z.infer<typeof createBookingSchema>;

const todayISO = () => new Date().toISOString().split('T')[0];

const defaultValues: CreateBookingFormValues = {
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  clientAddress: '',
  serviceId: '',
  date: '',
  slotStart: '',
  paymentOption: 'PAY_BY_LINK',
};

export default function CreateBookingModal({
  open,
  onClose,
}: {
  readonly open: boolean;
  readonly onClose: () => void;
}) {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);

  const [successResult, setSuccessResult] =
    useState<CreateBookingSuccessResult | null>(null);
  // const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBookingFormValues>({
    resolver: zodResolver(createBookingSchema),
    defaultValues,
  });

  const serviceId = watch('serviceId');
  const date = watch('date');
  const slotStart = watch('slotStart');
  const paymentOption = watch('paymentOption');

  const { data: servicesData, isLoading: servicesLoading } =
    useGetVendorServicesQuery(
      { page: 1, limit: 100, search: '', isActive: 'ALL' },
      { skip: !open },
    );

  const services = servicesData?.data || [];
  const selectedService = services.find((s: any) => s.id === serviceId);

  const shouldSkipSlots = !open || !serviceId || !date || !user?.id;

  const {
    data: slotsData,
    isLoading: slotsLoading,
    isFetching: slotsFetching,
    error: slotsError,
    refetch: refetchSlots,
  } = useGetVendorAvailabilitySlotsQuery(
    { vendorId: user?.id, serviceId, date },
    { skip: shouldSkipSlots, refetchOnMountOrArgChange: true },
  );

  const availableSlots = slotsData?.data?.availableSlots || [];
  const selectedSlot = availableSlots.find(
    (slot: any) => slot.startTime === slotStart,
  );

  const [createVendorBooking, { isLoading: creating }] =
    useCreateVendorBookingMutation();

  // Slots depend on both the service (duration/buffer) and the date, so any
  // change to either invalidates whatever time was previously picked.
  useEffect(() => {
    setValue('slotStart', '');
  }, [serviceId, date, setValue]);

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
      setSuccessResult(null);
      // setShowUpgradeModal(false);
    }
  }, [open, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (values: CreateBookingFormValues) => {
    if (!selectedSlot) {
      toast.error('Select an available time to continue');
      return;
    }

    try {
      const payload = {
        serviceId: values.serviceId,
        clientName: values.clientName.trim(),
        clientEmail: values.clientEmail.trim(),
        clientPhone: values.clientPhone?.trim() || undefined,
        clientAddress: values.clientAddress,
        startTime: selectedSlot.startTime,
        paymentOption: values.paymentOption,
      };

      const result = await createVendorBooking(payload).unwrap();
      const slotDate = new Date(selectedSlot.startTime);

      setSuccessResult({
        paymentOption: values.paymentOption,
        paymentUrl: result?.paymentUrl,
        clientName: values.clientName.trim(),
        serviceName: selectedService?.name || 'Service',
        dateLabel: slotDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        }),
        timeLabel: slotDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        amount: selectedService?.price || 0,
      });
    } catch (error: any) {
      const status = error?.status;
      const message: string | undefined = error?.data?.message;

      if (status === 409) {
        toast.error(
          'That time is no longer available. Please select another time.',
        );
        setValue('slotStart', '');
        refetchSlots();
        return;
      }

      // if (
      //   status === 403 &&
      //   message?.toLowerCase().includes('subscription is required')
      // ) {
      //   setShowUpgradeModal(true);
      //   return;
      // }

      if (status === 400 || status === 403 || status === 404) {
        toast.error(message || 'Could not create this booking.');
        return;
      }

      if (!status || status === 'FETCH_ERROR' || status === 'TIMEOUT_ERROR') {
        toast.error(
          'Network error. Please check your connection and try again.',
        );
        return;
      }

      toast.error(message || 'Something went wrong. Please try again.');
    }
  };

  const handleDone = () => {
    handleClose();
  };

  const handleViewBooking = () => {
    handleClose();
    navigate('/dashboard/bookings');
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        title={successResult ? 'Booking created' : 'Create Booking'}
        size='lg'
      >
        {successResult ? (
          <CreateBookingSuccessView
            result={successResult}
            onDone={handleDone}
            onViewBooking={handleViewBooking}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            {/* Client */}
            <Section icon={<UserRound className='h-4 w-4' />} title='Client'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <Input
                  label='Client name'
                  placeholder='e.g. Sarah Johnson'
                  className='h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500'
                  {...register('clientName')}
                  error={errors.clientName?.message}
                />

                <Input
                  label='Email'
                  type='email'
                  placeholder='client@email.com'
                  className='h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500'
                  {...register('clientEmail')}
                  error={errors.clientEmail?.message}
                />
              </div>

              <Input
                label='Phone number (optional)'
                type='tel'
                placeholder='e.g. 08012345678'
                className='h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500'
                {...register('clientPhone')}
                error={errors.clientPhone?.message}
              />

              <Input
                label='Client Address (optional)'
                type='text'
                placeholder='e.g. 8, Adewale Street, Coker, Surulere, Lagos State.'
                className='h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500'
                {...register('clientAddress')}
                error={errors.clientAddress?.message}
              />
            </Section>

            {/* Service */}
            <Section icon={<Sparkles className='h-4 w-4' />} title='Service'>
              <Select
                label='Service'
                className='h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500'
                options={[
                  {
                    label: servicesLoading
                      ? 'Loading services...'
                      : 'Select a service',
                    value: '',
                  },
                  ...services.map((service: any) => ({
                    label: `${service.name} — ₦${Number(service.price || 0).toLocaleString()}`,
                    value: service.id,
                  })),
                ]}
                {...register('serviceId')}
                error={errors.serviceId?.message}
              />

              {!servicesLoading && services.length === 0 && (
                <p className='text-xs text-amber-600'>
                  You don't have any active services yet. Add one before
                  creating a booking.
                </p>
              )}

              {selectedService && (
                <div className='grid grid-cols-1 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-3'>
                  <ServiceStat
                    icon={<Tag className='h-4 w-4 text-purple-600' />}
                    label='Price'
                    value={`₦${Number(selectedService.price || 0).toLocaleString()}`}
                  />
                  <ServiceStat
                    icon={<Clock3 className='h-4 w-4 text-purple-600' />}
                    label='Duration'
                    value={`${selectedService.durationMins || 0} mins`}
                  />
                  <ServiceStat
                    icon={<Sparkles className='h-4 w-4 text-purple-600' />}
                    label='Description'
                    value={selectedService.description || '—'}
                  />
                </div>
              )}
            </Section>

            {/* Schedule */}
            <Section
              icon={<CalendarDays className='h-4 w-4' />}
              title='Schedule'
            >
              <Input
                label='Date'
                type='date'
                min={todayISO()}
                className='h-11 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500'
                {...register('date')}
                error={errors.date?.message}
              />

              {serviceId && date && (
                <div>
                  <p className='mb-2 text-sm font-medium text-gray-700'>
                    Available time
                  </p>

                  {slotsLoading || slotsFetching ? (
                    <Loader size='sm' />
                  ) : slotsError ? (
                    <p className='text-sm text-red-500'>
                      No available slots for this date. Try another date.
                    </p>
                  ) : availableSlots.length === 0 ? (
                    <p className='text-sm text-amber-600'>
                      You're not available on this day. Try another date.
                    </p>
                  ) : (
                    <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
                      {availableSlots.map((slot: any) => {
                        const isSelected = slotStart === slot.startTime;
                        const label = new Date(
                          slot.startTime,
                        ).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        });

                        return (
                          <button
                            type='button'
                            key={slot.startTime}
                            onClick={() =>
                              setValue('slotStart', slot.startTime)
                            }
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                              isSelected
                                ? 'border-purple-600 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {errors.slotStart && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.slotStart.message}
                    </p>
                  )}

                  {slotStart && (
                    <p className='mt-3 flex items-center gap-2 text-xs text-purple-600'>
                      <ShieldCheck className='h-3.5 w-3.5' />
                      Selecting this time will reserve it on your calendar.
                    </p>
                  )}
                </div>
              )}
            </Section>

            {/* Payment */}
            <Section icon={<Wallet className='h-4 w-4' />} title='Payment'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <PaymentOptionCard
                  icon={<Link2 className='h-5 w-5' />}
                  title='Pay by link'
                  badge='Recommended'
                  description='Create the booking and generate a secure payment link you can send to your client.'
                  benefits={[
                    'Secure payment',
                    'Automatic confirmation',
                    'Transaction tracking',
                    'Digital payment record',
                  ]}
                  selected={paymentOption === 'PAY_BY_LINK'}
                  onSelect={() => setValue('paymentOption', 'PAY_BY_LINK')}
                />

                <PaymentOptionCard
                  icon={<Wallet className='h-5 w-5' />}
                  title='Paid by hand'
                  description='Use this if the client has already paid you directly by cash, transfer, POS or another method.'
                  selected={paymentOption === 'PAID_BY_HAND'}
                  onSelect={() => setValue('paymentOption', 'PAID_BY_HAND')}
                />
              </div>
            </Section>

            {/* Summary */}
            {selectedService && selectedSlot && (
              <div className='rounded-2xl border border-purple-100 bg-purple-50 p-5'>
                <p className='mb-1 text-xs font-semibold uppercase tracking-wide text-purple-600'>
                  Summary
                </p>
                <p className='text-lg font-semibold text-gray-900'>
                  {selectedService.name}
                </p>
                <p className='text-sm text-gray-600'>
                  {new Date(selectedSlot.startTime).toLocaleDateString(
                    'en-US',
                    {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    },
                  )}
                  {', '}
                  {new Date(selectedSlot.startTime).toLocaleTimeString(
                    'en-US',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    },
                  )}
                </p>
                <p className='mt-1 text-xl font-bold text-purple-700'>
                  ₦{Number(selectedService.price || 0).toLocaleString()}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className='flex flex-col-reverse items-center justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row'>
              <button
                type='button'
                onClick={handleClose}
                className='w-full rounded-2xl border border-gray-200 bg-white px-8 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto'
              >
                Cancel
              </button>

              <button
                type='submit'
                disabled={isSubmitting || creating || services.length === 0}
                className='w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
              >
                {creating
                  ? 'Creating...'
                  : paymentOption === 'PAY_BY_LINK'
                    ? 'Create & Generate Link'
                    : 'Create Booking'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <span className='flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600'>
          {icon}
        </span>
        <h4 className='text-sm font-semibold text-gray-900'>{title}</h4>
      </div>
      {children}
    </div>
  );
}

function ServiceStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='flex items-start gap-2'>
      <div className='mt-0.5'>{icon}</div>
      <div className='min-w-0'>
        <p className='text-xs text-gray-500'>{label}</p>
        <p className='truncate text-sm font-medium text-gray-900'>{value}</p>
      </div>
    </div>
  );
}

function PaymentOptionCard({
  icon,
  title,
  badge,
  description,
  benefits,
  selected,
  onSelect,
}: {
  icon: ReactNode;
  title: string;
  badge?: string;
  description: string;
  benefits?: string[];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onSelect}
      className={`flex h-full flex-col rounded-2xl border p-4 text-left transition ${
        selected
          ? 'border-purple-600 bg-purple-50 ring-1 ring-purple-600'
          : 'border-gray-200 bg-white hover:border-purple-200'
      }`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${
              selected
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {icon}
          </span>
          <div>
            <p className='text-sm font-semibold text-gray-900'>{title}</p>
            {badge && (
              <span className='mt-0.5 inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700'>
                {badge}
              </span>
            )}
          </div>
        </div>

        <span
          className={`h-4 w-4 flex-shrink-0 rounded-full border-2 ${
            selected ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
          }`}
        />
      </div>

      <p className='mt-3 text-xs leading-relaxed text-gray-500'>
        {description}
      </p>

      {benefits && (
        <ul className='mt-3 space-y-1'>
          {benefits.map((benefit) => (
            <li key={benefit} className='text-xs text-gray-500'>
              • {benefit}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
