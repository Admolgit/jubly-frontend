import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import LoginImage from '../../assets/login-image.jpg';

export default function PasswordRecoveryLayout({ title, description, children }: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return <div className='min-h-screen w-full grid grid-cols-1 md:grid-cols-2'>
    <div className='flex items-center justify-center px-6 py-12'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg'>
        <div className='mb-6 flex flex-col gap-2 text-center'>
          <h1 className='text-2xl font-semibold text-blue-600'>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
        <p className='mt-6 text-center text-sm'><Link to='/login' className='font-medium text-blue-600 hover:underline'>Back to Login</Link></p>
      </div>
    </div>
    <div className='relative m-2 hidden items-center justify-center rounded-[20px] bg-cover bg-center text-white md:flex' style={{ backgroundImage: `url(${LoginImage})` }}>
      <div className='absolute inset-0 rounded-[20px] bg-black/50' />
      <div className='absolute bottom-10 z-10 px-8 text-center'>
        <h2 className='text-2xl font-semibold'>Book professional makeup artists in minutes. Hassle-free scheduling, secure payments, and beauty at your doorstep.</h2>
      </div>
    </div>
  </div>;
}
