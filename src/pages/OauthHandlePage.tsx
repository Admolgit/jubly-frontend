/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { useGetUserByIdMutation } from '../features/auth/authApi';

export default function OAuthHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getUserBySlug] = useGetUserByIdMutation({});

  useEffect(() => {
    const handleOAuth = async () => {
      const token = searchParams.get('token');
      const refreshToken = searchParams.get('refreshToken');
      const authRaw = searchParams.get('auth');

      if (!token || !refreshToken || !authRaw) {
        navigate('/login', { replace: true });
        return;
      }

      let authObj;
      try {
        authObj = JSON.parse(authRaw);
      } catch {
        authObj = null;
      }

      if (!authObj?.data) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const payload = authObj?.data?.data?.user?.id;
        const res = await getUserBySlug(payload).unwrap();

        console.log({ res });

        dispatch(
          setCredentials({
            vendor: res.data.vendor,
          }),
        );

        localStorage.setItem('accessToken', JSON.stringify(token));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        localStorage.setItem('auth', JSON.stringify(authObj?.data));

        if (
          authObj?.data?.meta?.isSignup
        ) {
          navigate('/onboarding', {
            replace: true,
            state: { fromOAuth: true, onboarding: false },
          });
          dispatch(
            setCredentials({
              user: authObj?.data?.user || authObj?.data?.data?.user,
              token: authObj?.data?.token || authObj?.data?.data?.token,
              refreshToken:
                authObj?.data?.refreshToken ||
                authObj?.data?.data?.refreshToken,
            }),
          );
          toast.success('Please complete your KYC to continue.');
          return;
        } else if (
          !res?.data?.user?.vendor?.onboardingCompleted &&
          res?.data?.user?.vendor?.isApproved
        ) {
          const user = res?.data?.user;
          const token = res?.data?.token;
          localStorage.setItem('email', user?.email);
          dispatch(setCredentials({ user, token }));
          navigate('/vendor-availability');
          toast.success('Please set your availability.');
        } else if (
          res?.data?.user?.vendor?.onboardingCompleted &&
          res?.data?.user?.vendor?.isApproved &&
          authObj?.data?.meta?.alreadyExists
        ) {
          navigate('/dashboard', {
            replace: true,
            state: { fromOAuth: true, onboarding: false },
          });
          dispatch(
            setCredentials({
              user: authObj?.data?.user || authObj?.data?.data?.user,
              token: authObj?.data?.token || authObj?.data?.data?.token,
              refreshToken:
                authObj?.data?.refreshToken ||
                authObj?.data?.data?.refreshToken,
            }),
          );
        } else {
          navigate('/login', {
            replace: true,
          });
          toast.success(
            'Your account is not verified yet. Please contact Jubly admin.',
          );
        }
      } catch (err: any) {
        const message = err?.data?.error || err?.data?.message || err?.message;

        if (message === 'Vendor account pending approval') {
          toast.error('Vendor account pending approval');
        } else if (message === 'Complete your onboarding') {
          toast.success('Continue onboarding');
          navigate('/google-sync');
        } else if (message === 'Invalid credentials') {
          toast.error('Invalid credentials');
        } else {
          toast.error(message || 'Login failed');
        }
      }
    };

    handleOAuth();
  }, [navigate, searchParams, dispatch]);

  return <p className='text-center text-primary'>Signing you in…</p>;
}
