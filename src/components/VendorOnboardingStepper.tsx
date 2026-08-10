/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Check } from 'lucide-react';
import Input from './ui/Input';
import {
  useGetBankListsQuery,
  useResolveBankQuery,
} from '../features/paystack/paystackApi';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import {
  useCompleteVendorOnboardingMutation,
  useCreateVendorProfieMutation,
} from '../features/vendor/vendorApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVendorCredentials } from '../features/vendor/vendorSlice';
import Select from './ui/Select';

interface Service {
  name: string;
  price: number;
  durationMins: number;
  description?: string;
}

interface OnboardingForm {
  businessName: string;
  category: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  profileImage?: FileList;
  documentFrontUrl?: FileList;
  portfolioImages?: FileList;
  identityType?: string;
  services: Service[];
  settlementBank: string;
  accountNumber: string;
}

const categoryOptions = [
  { label: 'Select Option', value: '' },
  { label: 'Makeup Artist', value: 'Makeup Artist' },
  { label: 'Photographer', value: 'Photographer' },
  { label: 'Hair Beautician', value: 'Hair Beautician' },
  { label: 'Nails Beautician', value: 'Nails Beautician' },
  { label: 'Barbing', value: 'Barbing' },

  { label: 'Tailor / Fashion Designer', value: 'Tailor / Fashion Designer' },
  { label: 'Event Planner', value: 'Event Planner' },
  { label: 'Caterer', value: 'Caterer' },
  { label: 'Baker', value: 'Baker' },
  { label: 'Videographer', value: 'Videographer' },
  { label: 'DJ', value: 'DJ' },
  { label: 'MC / Event Host', value: 'MC / Event Host' },
  { label: 'Decorator', value: 'Decorator' },
  { label: 'Personal Trainer', value: 'Personal Trainer' },
  { label: 'Fitness Coach', value: 'Fitness Coach' },
  { label: 'Massage Therapist', value: 'Massage Therapist' },
  { label: 'Spa Therapist', value: 'Spa Therapist' },
  { label: 'Tattoo Artist', value: 'Tattoo Artist' },
  { label: 'Interior Designer', value: 'Interior Designer' },
  { label: 'Cleaning Service', value: 'Cleaning Service' },
  { label: 'Car Wash / Detailing', value: 'Car Wash / Detailing' },
  {
    label: 'Phone / Computer Technician',
    value: 'Phone / Computer Technician',
  },
  { label: 'Plumber', value: 'Plumber' },
  { label: 'Electrician', value: 'Electrician' },
  { label: 'Painter', value: 'Painter' },
  { label: 'Tutor / Teacher', value: 'Tutor / Teacher' },
  { label: 'Music Teacher', value: 'Music Teacher' },
  { label: 'Driving Instructor', value: 'Driving Instructor' },
  { label: 'Consultant', value: 'Consultant' },
  { label: 'Graphic Designer', value: 'Graphic Designer' },
  { label: 'Web Developer', value: 'Web Developer' },
  { label: 'Social Media Manager', value: 'Social Media Manager' },
  { label: 'Other', value: 'Other' },
];

export const VendorOnboardingStepper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: bankLists, isLoading: isBanksLoading } = useGetBankListsQuery(
    {},
  );
  const [
    completeVendorOnboarding,
    { isLoading: completeVendorOnboardingIsLoading },
  ] = useCompleteVendorOnboardingMutation();
  const [createVendorProfile] = useCreateVendorProfieMutation();

  const [step, setStep] = useState(0);
  const [vendorProfileId, setVendorProfileId] = useState<string | null>(null);
  const {
    register,
    control,
    getValues,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<OnboardingForm>({
    defaultValues: {
      services: [{ name: '', price: 0, durationMins: 60, description: '' }],
    },
  });

  const {
    fields: serviceFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'services',
  });

  const watchProfileImage = watch('profileImage');
  const watchPortfolioImages = watch('portfolioImages');
  const accountNumber = watch('accountNumber');
  const settlementBank = watch('settlementBank');
  const documentFrontUrl = watch('documentFrontUrl');

  const normalizedAccountNumber = (accountNumber ?? '').replace(/\D/g, '');
  const [debouncedAccountNumber] = useDebounce(normalizedAccountNumber, 700);

  const shouldResolveBank =
    debouncedAccountNumber.length === 10 && Boolean(settlementBank);

  const {
    data: bankResolve,
    isFetching: isBankResolving,
    isError: isBankResolveError,
    error: bankResolveError,
  } = useResolveBankQuery(
    {
      accountNumber: debouncedAccountNumber,
      bankCode: settlementBank,
    },
    {
      skip: !shouldResolveBank,
    },
  );
  const isAccountNumberPending = normalizedAccountNumber !== debouncedAccountNumber;

  const stepFields: Record<number, (keyof OnboardingForm)[]> = {
    0: ['businessName', 'category', 'city', 'state', 'country'],
    1: ['accountNumber', 'settlementBank'],
  };

  const nextStep = async () => {
    const fieldsToValidate = stepFields[step];

    if (fieldsToValidate) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    const values = getValues();

    if (step === 0) {
      try {
        const res = await createVendorProfile({
          businessName: values.businessName,
          category: values.category,
          city: values.city,
          state: values.state,
          country: values.country,
          bio: values.bio,
        }).unwrap();

        if (res.status === 201) {
          toast.success('Vendor details created.');
          console.log('Vendor profile created:', res.data);
          setVendorProfileId(res.data.vendor.id);
        }
      } catch (error: any) {
        console.error('Vendor profile creation failed:', error);
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = [
    'Profile & Services',
    'Subaccount Creation',
    'Vendor Images',
    'Portfolio Images',
  ];

  const onSubmit = async (data: OnboardingForm) => {
    try {
      toast.loading('Setting up your vendor account...', {
        id: 'onboarding',
      });

      const formData = new FormData();

      formData.append(
        'profile',
        JSON.stringify({
          businessName: data.businessName,
          category: data.category,
          city: data.city,
          state: data.state,
          country: data.country,
          bio: data.bio,
          vendorId: vendorProfileId,
        }),
      );

      formData.append(
        'services',
        JSON.stringify(
          data.services.map((service) => ({
            name: service.name,
            price: Number(service.price),
            durationMins: Number(service.durationMins),
            description: service.description,
          })),
        ),
      );

      formData.append(
        'subaccount',
        JSON.stringify({
          settlementBank: data.settlementBank,
          accountNumber: data.accountNumber,
          businessName: data.businessName,
        }),
      );

      formData.append('identityType', data.identityType as any);

      if (data.profileImage?.length) {
        formData.append('profileImage', data.profileImage[0]);
      }

      // Identity Documents
      if (data.documentFrontUrl?.length) {
        formData.append('documentFrontUrl', data.documentFrontUrl[0]);
      }

      // Portfolio Images
      if (data.portfolioImages?.length) {
        Array.from(data.portfolioImages).forEach((file) => {
          formData.append('portfolio', file);
        });
      }

      const res = await completeVendorOnboarding(formData).unwrap();

      toast.success(
        'Vendor onboarding completed 🎉. A representative will review your documents.',
        { id: 'onboarding' },
      );

      dispatch(setVendorCredentials({ vendor: res.vendor }));

      navigate('/onboarding-verification');
    } catch (error: any) {
      toast.error(
        error?.data?.message || 'Something went wrong during onboarding',
        { id: 'onboarding' },
      );
    }
  };

  useEffect(() => {
    if (isBankResolveError) {
      const message =
        (bankResolveError as any)?.data?.message ||
        'Unable to resolve account. Please check the account number and bank.';

      // Fixed id: RTK Query refetches update this toast in place instead of stacking new ones.
      toast.error(message, { id: 'bank-resolve-error' });
    }
  }, [isBankResolveError, bankResolveError]);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='sticky top-0 z-30 bg-white border-b'>
        <div className='w-full mb-8 p-6'>
          <div className='flex items-center justify-between'>
            {steps.map((label, index) => {
              const isCompleted = index < step;
              const isActive = index === step;

              return (
                <div
                  key={index}
                  className='flex-1 flex flex-col items-center relative'
                >
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute top-4 left-1/2 w-full h-[2px] 
                    ${index < step ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  )}
                  <div
                    className={`
                    z-10 flex items-center justify-center
                    w-8 h-8 rounded-full border-2
                    ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                          ? 'border-blue-600 text-blue-600'
                          : 'border-gray-300 text-gray-300'
                    }
                  `}
                  >
                    {isCompleted ? <Check size={16} /> : index + 1}
                  </div>
                  <p
                    className={`mt-2 text-sm text-center ${
                      isActive
                        ? 'text-blue-600 font-semibold'
                        : isCompleted
                          ? 'text-green-600'
                          : 'text-gray-400'
                    }`}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='py-6'>
        {/* Step 0: Profile & Services */}
        {step === 0 && (
          <div className='space-y-4 p-4 w-full bg-white shadow rounded'>
            <h2 className='text-xl font-semibold'>Business Info</h2>
            <div className='flex items-start gap-2 w-full '>
              <div className='w-1/2'>
                <Input
                  type='text'
                  label='Business Name'
                  {...register('businessName', { required: true })}
                  placeholder='Business Name'
                  className='w-full'
                />
              </div>
              <div className='w-1/2'>
                <Controller
                  control={control}
                  name='category'
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <Select
                      label='Business Category'
                      options={categoryOptions}
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                    />
                  )}
                />

                {errors.category && (
                  <p className='text-sm text-red-500'>
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex items-start gap-2 w-full'>
              <div className='w-1/2'>
                <Input
                  type='text'
                  label='State'
                  {...register('state', { required: true })}
                  placeholder='State'
                  className='w-full'
                />
              </div>
              <div className='w-1/2'>
                <Input
                  type='text'
                  label='City'
                  {...register('city', { required: true })}
                  placeholder='City'
                  className='w-full'
                />
              </div>
            </div>

            <div className='flex items-start gap-2 w-full'>
              <div className='w-1/2'>
                <label htmlFor='bio'>Bio</label>
                <textarea
                  {...register('bio')}
                  placeholder='Short Bio'
                  className='w-full h-24 border rounded p-2'
                ></textarea>
              </div>

              <div className='w-1/2'>
                <Input
                  type='text'
                  label='Country'
                  {...register('country', { required: true })}
                  placeholder='Country'
                  className='w-full'
                />
              </div>
            </div>

            <h3 className='text-lg font-semibold mt-4'>Services</h3>
            {serviceFields.map((service, index) => (
              <div
                key={service.id}
                className='space-y-2 border p-2 rounded flex items-start gap-2'
              >
                <Input
                  {...register(`services.${index}.name`, { required: true })}
                  placeholder='Service Name'
                  className='Input'
                  label='Service Name'
                />
                <Input
                  type='number'
                  {...register(`services.${index}.price`, {
                    required: true,
                    min: 0,
                  })}
                  placeholder='Price (₦)'
                  className='Input'
                  label='Price'
                />
                <Input
                  type='number'
                  {...register(`services.${index}.durationMins`, {
                    required: true,
                    min: 1,
                  })}
                  placeholder='Duration (mins)'
                  className='Input'
                  label='Duration (mins)'
                />
                <div>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    {...register(`services.${index}.description`)}
                    placeholder='Description'
                    className='w-full h-24 border rounded p-2'
                  ></textarea>
                </div>
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className='text-red-500'
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() =>
                append({
                  name: '',
                  price: 0,
                  durationMins: 60,
                  description: '',
                })
              }
              className='text-blue-500 mt-2'
            >
              Add Another Service
            </button>
          </div>
        )}

        {/* Step 1: Subaccount Creation */}
        {step === 1 && (
          <div className='space-y-4 p-4 bg-white shadow rounded'>
            <h2 className='text-xl font-semibold'>Bank / Subaccount</h2>
            <div className='flex flex-col gap-2 w-full'>
              <div className='w-full'>
                <Input
                  type='text'
                  label='Account Number'
                  {...register('accountNumber', { required: true })}
                  placeholder='Account Number'
                  className='w-full'
                  inputMode='numeric'
                  maxLength={10}
                />
              </div>
              <div className='w-full'>
                <label htmlFor='settlementBank' className='text-sm font-medium'>
                  Bank Name
                </label>
                <div>
                  <select
                    {...register('settlementBank')}
                    className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-3'
                  >
                    <option value=''>Select bank</option>

                    {!isBanksLoading &&
                      bankLists?.map((bank: any) => (
                        <option key={bank.code} value={bank.code}>
                          {bank.name}
                        </option>
                      ))}
                  </select>

                  {errors.settlementBank && (
                    <p className='text-sm text-red-500 mt-1'>
                      {errors.settlementBank.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Input
                  type='text'
                  label='Account Name'
                  className='w-full'
                  value={
                    shouldResolveBank &&
                    (isAccountNumberPending || isBankResolving)
                      ? 'Resolving account...'
                      : shouldResolveBank
                        ? bankResolve?.data?.account_name || ''
                        : ''
                  }
                  readOnly
                />
              </div>
            </div>
            <p className='text-gray-500 text-sm'>
              We use this to create your Paystack subaccount for payouts.
            </p>
          </div>
        )}

        {/* Step 2: Vendor Images */}
        {step === 2 && (
          <div className='space-y-4 p-4 bg-white shadow rounded'>
            <div>
              <h2 className='text-xl font-semibold'>Profile Image</h2>
              <input type='file' {...register('profileImage')} />
              {(watchProfileImage?.length as number) > 0 && (
                <img
                  src={URL.createObjectURL((watchProfileImage as any)[0])}
                  alt='Profile Preview'
                  className='mt-2 w-32 h-32 object-cover rounded'
                />
              )}
            </div>
            <div>
              <h2 className='text-xl font-semibold'>
                Upload Identity (NIN Preferable)
              </h2>
              <div className='w-full'>
                <Input
                  type='text'
                  label='Document Type'
                  {...register('identityType', { required: true })}
                  placeholder='Document Type'
                  className='w-full'
                />
              </div>
              <Input
                label='Document'
                type='file'
                {...register('documentFrontUrl')}
              />
              {(documentFrontUrl?.length as number) > 0 && (
                <img
                  src={URL.createObjectURL((documentFrontUrl as any)[0])}
                  alt='Document Preview'
                  className='mt-2 w-32 h-32 object-cover rounded'
                />
              )}
            </div>
          </div>
        )}

        {/* Step 3: Portfolio Images */}
        {step === 3 && (
          <div className='space-y-4 p-4 bg-white shadow rounded'>
            <h2 className='text-xl font-semibold'>Portfolio Images</h2>
            <Input
              label=''
              type='file'
              {...register('portfolioImages')}
              multiple
            />
            {(watchPortfolioImages?.length as number) > 0 && (
              <div className='mt-2 flex space-x-2 overflow-x-auto'>
                {Array.from(watchPortfolioImages as any).map((file, idx) => (
                  <img
                    key={`${idx}-${0}`}
                    src={URL.createObjectURL(file as any)}
                    className='w-24 h-24 object-cover rounded'
                    alt={`Portfolio Preview ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className='flex justify-between mt-4'>
          {step > 0 && (
            <button
              type='button'
              onClick={prevStep}
              className='px-4 py-2 bg-gray-200 rounded'
            >
              Previous
            </button>
          )}

          {step < steps.length - 1 && (
            <button
              type='button'
              onClick={nextStep}
              className='px-4 py-2 bg-blue-500 text-white rounded'
            >
              Next
            </button>
          )}

          {step === steps.length - 1 && (
            <button
              type='submit'
              className='px-4 py-2 bg-green-500 text-white rounded'
              disabled={completeVendorOnboardingIsLoading}
            >
              {completeVendorOnboardingIsLoading
                ? 'Submitting...'
                : 'Finish Onboarding'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
