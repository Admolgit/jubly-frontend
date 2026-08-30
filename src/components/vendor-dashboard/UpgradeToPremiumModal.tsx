/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, Crown } from 'lucide-react';

import Modal from '../ui/Modal';
import { useVendorSubscriptionMutation } from '../../features/services/servicesAPI';
import toast from 'react-hot-toast';

const PREMIUM_PRICE = 3000;

const PREMIUM_BENEFITS = [
  'Record cash, transfer or POS payments with Paid by hand',
  'Lower platform fees on every booking you take',
  'Priority customer support',
  'Early access to new Jubly features',
];

export default function UpgradeToPremiumModal({
  open,
  onClose,
  reason,
}: {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly reason?: string;
}) {
  const [vendorSubscription, { isLoading }] = useVendorSubscriptionMutation();
  const handleUpgrade = async () => {
    try {
      const res = await vendorSubscription({}).unwrap();

      if (res.paymentUrl) {
        window.open(res.paymentUrl, '_self');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title='Upgrade to Jubly Premium'>
      <div className='flex flex-col items-center text-center'>
        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600'>
          <Crown className='h-7 w-7 text-white' />
        </div>

        <p className='mt-4 text-sm text-gray-500'>
          {reason ||
            'This feature is available on your Jubly subscription plan.'}
        </p>

        <div className='mt-6 w-full rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-6'>
          <p className='text-xs font-semibold uppercase tracking-wide text-purple-600'>
            Jubly Premium
          </p>

          <div className='mt-2 flex items-baseline justify-center gap-1'>
            <span className='text-4xl font-bold text-gray-900'>
              ₦{PREMIUM_PRICE.toLocaleString()}
            </span>
            <span className='text-sm font-medium text-gray-500'>/month</span>
          </div>
        </div>

        <ul className='mt-6 w-full space-y-3 text-left'>
          {PREMIUM_BENEFITS.map((benefit) => (
            <li key={benefit} className='flex items-start gap-3'>
              <span className='mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100'>
                <Check className='h-3.5 w-3.5 text-green-600' />
              </span>
              <span className='text-sm text-gray-700'>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className='mt-8 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center'>
          <button
            type='button'
            onClick={onClose}
            className='w-full rounded-2xl border border-gray-200 bg-white px-8 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto'
          >
            Maybe later
          </button>

          <button
            type='button'
            onClick={handleUpgrade}
            className='w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 sm:w-auto'
          >
            {isLoading ? 'Upgrading...' : 'Upgrade to Premium'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
