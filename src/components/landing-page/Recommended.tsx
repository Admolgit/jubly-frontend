/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';
import { useGetAllVendorsQuery } from '../../features/vendor/vendorApi';
import { useGetUserIdMutation } from '../../features/users/userApi';
import { useNavigate } from 'react-router-dom';

export default function RecommendedSection() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [userId, setUserId] = useState('');

  const { data: vendorsData, isLoading } = useGetAllVendorsQuery({});
  const [getUserId] = useGetUserIdMutation();

  const vendors = vendorsData?.data?.vendors || [];

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -350 : 350,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      const res = await getUserId(userId).unwrap();

      if (res.status === 200) {
        navigate(`/vendor-booking/${res.data.slug}`);
      }
    };

    fetchUser();
  }, [userId, navigate, getUserId]);

  return (
    <section className='bg-[#090018] py-24 services'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Header */}
        <div className='mb-12 flex items-center justify-between'>
          <h2 className='text-2xl font-serif font-semibold text-white'>
            ✦ Recommended For You ✦
          </h2>

          <button
            type='button'
            className='text-purple-400 hover:text-purple-300'
          >
            View all services →
          </button>
        </div>

        <div className='relative'>
          {/* Left Arrow */}
          <button
            type='button'
            onClick={() => scroll('left')}
            className='absolute -left-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-purple-900/70 text-white backdrop-blur'
          >
            <ChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            type='button'
            onClick={() => scroll('right')}
            className='absolute -right-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-purple-900/70 text-white backdrop-blur'
          >
            <ChevronRight />
          </button>

          {isLoading ? (
            <div className='py-20 text-center text-white'>
              Loading vendors...
            </div>
          ) : (
            <div
              ref={scrollRef}
              className='flex gap-6 overflow-x-auto scroll-smooth no-scrollbar'
            >
              {vendors?.map((vendor: any) => {
                const minPriceService = vendor?.services?.reduce(
                  (min: any, service: any) =>
                    service?.price < min?.price ? service : min,
                  vendor?.services[0],
                );
                return (
                  <motion.div
                    key={vendor.id}
                    whileHover={{
                      y: -6,
                    }}
                    className='min-w-[300px] overflow-hidden rounded-3xl border border-purple-800 bg-gradient-to-b from-[#24104A] to-[#140428] shadow-2xl'
                  >
                    {/* IMAGE */}
                    <div className='relative'>
                      <img
                        src={
                          vendor?.profileImage ||
                          'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
                        }
                        alt={vendor?.businessName}
                        className='h-64 w-full object-cover'
                      />

                      <button
                        type='button'
                        className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur'
                      >
                        <Heart size={18} className='text-white' />
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className='p-5'>
                      <h3 className='text-2xl font-semibold text-white'>
                        {vendor?.category || 'Beauty Service'}
                      </h3>

                      <p className='mt-1 text-gray-300'>
                        By {vendor?.businessName}
                      </p>

                      <div className='mt-3 flex items-center gap-2'>
                        <Star
                          size={16}
                          fill='currentColor'
                          className='text-yellow-400'
                        />

                        <span className='font-medium text-white'>4.8</span>

                        <span className='text-sm text-gray-400'>(95)</span>
                      </div>

                      <p className='mt-6 text-xl font-semibold text-white'>
                        From ₦{minPriceService?.price?.toLocaleString()}
                      </p>

                      <button
                        type='button'
                        onClick={() => setUserId(vendor?.userId)}
                        className='mt-5 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]'
                      >
                        Book Now
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
