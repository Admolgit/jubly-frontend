import { BadgeCheck, Shield, Tag, Headphones } from 'lucide-react';
import Seo from '../SEO';

const features = [
  {
    icon: BadgeCheck,
    title: 'Verified Professionals',
    description: 'All experts are verified and background checked',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your payments and data are 100% secure',
  },
  {
    icon: Tag,
    title: 'Best Price Guarantee',
    description: 'We ensure you get the best value',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: "We're here to help you anytime",
  },
];

export function TrustSection() {
  return (
    <section className=''>
      <Seo
        title='Jubly – Discover & Book Trusted Service Providers in Nigeria'
        description='Find trusted vendors for beauty, events, cakes, photography and more. Discover services, compare vendors, check availability and book securely with Jubly.'
      />
      <div
        className='
        bg-gradient-to-r
        from-[#16072d]
        via-[#1d0d3a]
        to-[#16072d]
        backdrop-blur-xl
        overflow-hidden
        '
      >
        <div className='grid lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10 max-w-7xl mx-auto px-6'>
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={`${index}-${item?.title}`}
                className='
                flex items-center gap-5
                p-8
                hover:bg-white/[0.02]
                transition-all
                '
              >
                <div
                  className='
                  flex
                  items-center
                  justify-center
                  h-16
                  w-16
                  rounded-2xl
                  bg-fuchsia-500/10
                  border
                  border-fuchsia-500/20
                  '
                >
                  <Icon className='text-fuchsia-400' size={34} />
                </div>

                <div>
                  <h3 className='text-white font-semibold'>{item.title}</h3>

                  <p className='text-sm text-gray-400 mt-2 leading-relaxed'>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
