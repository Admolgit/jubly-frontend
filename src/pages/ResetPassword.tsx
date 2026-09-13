import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResetPasswordMutation } from '../features/auth/authApi';
import PasswordRecoveryLayout from '../components/auth/PasswordRecoveryLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

type PasswordFields = { newPassword: string; confirmPassword: string };

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token')?.trim();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [visible, setVisible] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [error, setError] = useState('');
  const pending = useRef(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordFields>();
  const submit = async ({ newPassword, confirmPassword }: PasswordFields) => {
    if (!token || pending.current) return;
    pending.current = true;
    setError('');
    try {
      await resetPassword({ token, newPassword, confirmPassword }).unwrap();
      toast.success(
        'Password reset successfully. Please log in with your new password.',
      );
      navigate('/login', { replace: true });
    } catch (err) {
      setError(
        (err as { data?: { message?: string } })?.data?.message ||
          'Unable to reset your password. Please request a new reset link and try again.',
      );
    } finally {
      pending.current = false;
    }
  };
  return (
    <PasswordRecoveryLayout
      title='Reset Password'
      description='Choose a new password for your account.'
    >
      {!token ? (
        <div
          role='alert'
          className='rounded-lg bg-red-50 p-4 text-sm text-red-700'
        >
          This reset link is invalid.{' '}
          <Link className='font-medium underline' to='/forgot-password'>
            Request a new reset link
          </Link>
          .
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          {(['newPassword', 'confirmPassword'] as const).map((field) => {
            const label =
              field === 'newPassword' ? 'New Password' : 'Confirm Password';
            return (
              <div className='relative mt-4' key={field}>
                <Input
                  label={label}
                  aria-label={label}
                  type={visible[field] ? 'text' : 'password'}
                  autoComplete='new-password'
                  disabled={isLoading}
                  {...register(field, {
                    required: `${label} is required`,
                    minLength: { value: 6, message: 'Min 6 characters' },
                    validate: (value) =>
                      field !== 'confirmPassword' ||
                      value === getValues('newPassword') ||
                      'Passwords do not match',
                  })}
                  error={errors[field]?.message}
                  className='w-full rounded border border-[#d9c7ff] p-3 pr-12 outline-none transition focus:border-[#7c3aed]'
                />
                <button
                  type='button'
                  aria-label={`${visible[field] ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
                  onClick={() =>
                    setVisible((previous) => ({
                      ...previous,
                      [field]: !previous[field],
                    }))
                  }
                  className='absolute right-3 top-[38px] text-gray-500 hover:text-gray-700'
                >
                  {visible[field] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            );
          })}
          {error && (
            <div role='alert' className='mt-3 text-sm text-red-500'>
              {error}{' '}
              <Link to='/forgot-password' className='underline'>
                Request a new reset link
              </Link>
            </div>
          )}
          <Button type='submit' disabled={isLoading} className='mt-6'>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      )}
    </PasswordRecoveryLayout>
  );
}
