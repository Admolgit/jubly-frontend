import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useForgotPasswordMutation } from '../features/auth/authApi';
import PasswordRecoveryLayout from '../components/auth/PasswordRecoveryLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const submit = async ({ email }: { email: string }) => {
    if (pending.current) return;
    pending.current = true;
    setError('');
    try {
      await forgotPassword({ email: email.trim() }).unwrap();
      setSent(true);
      toast.success('Check your email for password reset instructions.');
    } catch (err) {
      setError(
        (err as { data?: { message?: string } })?.data?.message ||
          'Unable to send reset instructions. Please try again.',
      );
    } finally {
      pending.current = false;
    }
  };
  return (
    <PasswordRecoveryLayout
      title='Forgot Password'
      description='Enter your email to receive a password reset link.'
    >
      {sent ? (
        <p
          role='status'
          className='rounded-lg bg-green-50 p-4 text-sm text-green-800'
        >
          If an account exists for that email, you will receive password reset
          instructions. Please check your inbox and spam folder.
        </p>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <Input
            label='Email'
            aria-label='Email'
            type='email'
            autoComplete='email'
            disabled={isLoading}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
              setValueAs: (value: string) => value.trim(),
            })}
            error={errors.email?.message}
            className='w-full rounded border border-[#d9c7ff] p-3 outline-none transition focus:border-[#7c3aed]'
          />
          {error && (
            <p role='alert' className='mt-3 text-sm text-red-500'>
              {error}
            </p>
          )}
          <Button type='submit' disabled={isLoading} className='mt-6'>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </Button>
        </form>
      )}
    </PasswordRecoveryLayout>
  );
}
