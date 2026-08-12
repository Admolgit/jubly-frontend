import HeroImg from '../../assets/hero.png';
import { motion } from 'framer-motion';
import { Scissors, Flower2, Paintbrush, Hand, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';
import ProfessionalCard from './ProfessionalCard';
import CategoryCard from './CategoryCard';
import HowItWorks from './Howitworks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetAllVendorsQuery } from '../../features/vendor/vendorApi';
import { useGetUserIdMutation } from '../../features/users/userApi';

export default function Hero() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');

  const { data: vendorsData } = useGetAllVendorsQuery({});
  const [getUserId] = useGetUserIdMutation();

  const vendors = vendorsData?.data?.vendors || [];

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      const res = await getUserId(userId).unwrap();

      if (res.status === 200) {
        navigate(`/vendor-booking/${res.data.slug}`);
      }
    };

    fetchUser();
  }, [userId, getUserId, navigate]);
  return (
    <section className='relative bg-[#0F0223] font-sans'>
      <div className='absolute inset-0'>
        <div className='absolute left-20 h-96 w-96% rounded-full bg-pink-600/20 blur-[150px]' />

        <div className='absolute right-20 top-30 h-96 w-96 rounded-full bg-purple-700/20 blur-[150px]' />
      </div>

      <div className='max-w-7xl mx-auto px-8 py-20'>
        <div className='grid lg:grid-cols-2 gap-20 items-center'>
          {/* LEFT */}

          <div>
            <p className='text-pink-300 uppercase tracking-[5px]'>
              Beauty. Confidence. You.
            </p>

            <h1 className='mt-6 text-6xl font-bold leading-tight text-white'>
              Find a service
              <br />
              <span className='bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'>
                close to you
              </span>
            </h1>

            <p className='text-gray-300 mt-6 text-xl'>
              Discover top beauty professionals near you. Book. Relax. Shine.
            </p>

            <div className='mt-10'>
              <SearchBar />
            </div>

            <div className='grid grid-cols-5 gap-4 mt-10'>
              <CategoryCard icon={<Scissors />} title='Hair' />

              <CategoryCard icon={<Hand />} title='Massage' />

              <CategoryCard icon={<Paintbrush />} title='Makeup' />

              <CategoryCard icon={<Flower2 />} title='Spa' />

              <CategoryCard icon={<Sparkles />} title='Nails' />
            </div>
          </div>

          {/* RIGHT */}

          <div className='relative'>
            {/* RIGHT */}

            <div className='relative flex items-center justify-center'>
              {/* Glow */}
              <div className='absolute h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-2xl' />

              {/* Outer Ring */}
              <div className='absolute h-[500px] w-[500px] rounded-full border border-fuchsia-400/20' />

              {/* Inner Ring */}
              <div className='absolute h-[420px] w-[420px] rounded-full border-2 border-fuchsia-500/40' />

              {/* Hero Image */}
              <motion.img
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                }}
                src={HeroImg}
                alt='Beauty Professional'
                className='relative z-10 w-full max-w-[520px]'
              />

              {/* Floating Cards */}
              {vendors[0] && (
                <div className='absolute right-0 top-16 z-20'>
                  <ProfessionalCard
                    name={vendors[0]?.businessName}
                    role={vendors[0]?.category}
                    rating={4.9}
                    vendorImg={vendors[0]?.profileImage}
                    onNavigate={() => setUserId(vendors[0]?.userId)}
                  />
                </div>
              )}

              {vendors[1] && (
                <div className='absolute bottom-20 left-0 z-20'>
                  <ProfessionalCard
                    name={vendors[1]?.businessName}
                    role={vendors[1]?.category}
                    rating={5}
                    vendorImg={vendors[1]?.profileImage}
                    onNavigate={() => setUserId(vendors[1]?.userId)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='mt-20'>
          <HowItWorks />
        </div>
      </div>
    </section>
  );
}
