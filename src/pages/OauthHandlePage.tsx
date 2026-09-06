/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { setVendorCredentials } from '../features/vendor/vendorSlice';
import { useGetUserByIdMutation } from '../features/auth/authApi';
import { setStoredTokens } from '../utils/tokenStorage';

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

        const user = authObj?.data?.user || authObj?.data?.data?.user;

        // Set credentials once, up front, with the full token/refreshToken/user
        // triple — avoids the previous per-branch dispatches that each set a
        // different partial subset (and could wipe fields set moments earlier).
        dispatch(setCredentials({ user, token, refreshToken }));
        dispatch(setVendorCredentials({ vendor: res.data.vendor }));

        setStoredTokens(token, refreshToken);
        localStorage.setItem('auth', JSON.stringify(authObj?.data));

        const vendor = res?.data?.user?.vendor;

        // Vendor profile hasn't been created yet
        if (!vendor) {
          navigate('/onboarding', {
            replace: true,
            state: { fromOAuth: true, onboarding: false },
          });

          toast.success('Please complete your onboarding to continue.');
          return;
        }

        // Vendor exists but hasn't been approved
        if (!vendor.isApproved) {
          navigate('/login', {
            replace: true,
          });

          toast.success(
            'Your account is not verified yet. Please contact Jubly admin.',
          );
          return;
        }

        // Approved, but availability/onboarding isn't finished
        if (!vendor.onboardingCompleted) {
          localStorage.setItem('email', user?.email);

          navigate('/vendor-availability', {
            replace: true,
          });

          toast.success('Please set your availability.');
          return;
        }

        // Fully onboarded + approved
        navigate('/dashboard', {
          replace: true,
          state: { fromOAuth: true, onboarding: false },
        });
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
