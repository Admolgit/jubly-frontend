// import { motion } from "framer-motion";
// import { fadeUp, fadeIn, stagger } from "../animations";
import HeroImg from "../../assets/hero.png";

// const Hero = () => {
//   return (
//     <section id="hero" className="pt-28 pb-20 bg-purple-900 text-white">
//       <motion.div
//         className="max-w-6xl mx-auto px-6
//                    flex flex-col-reverse
//                    md:grid md:grid-cols-2
//                    gap-12 items-center"
//         initial="hidden"
//         animate="visible"
//         variants={fadeIn}
//       >
//         {/* TEXT SECTION */}
//         <motion.div variants={fadeUp} className="text-center md:text-left">
//           <p className="uppercase text-purple-200 text-[10px] md:text-[16px]">
//             Hair salon, Masseuse, Beauty Salon, Makeup Artist
//           </p>

//           <h1 className="text-[28px] md:text-[62px] text-[#F7E5C1] font-semibold leading-tight mt-2">
//             Find a service close to you
//           </h1>

//           <p className="text-purple-200 mt-4">
//             Discover top beauty professionals near you.
//           </p>

//           {/* SEARCH */}
//           <div
//             className="mt-6
//                           flex flex-col md:flex-row
//                           bg-white rounded-lg
//                           overflow-hidden
//                           w-full
//                           md:w-auto"
//           >
//             <input
//               className="flex-1 px-4 py-3 text-black outline-none"
//               placeholder="Search services"
//             />
//             <input
//               className="flex-1 px-4 py-3 text-black outline-none border-t md:border-t-0 md:border-l"
//               placeholder="Location"
//             />
//             <button className="bg-purple-700 px-6 py-3 text-white md:rounded-none">
//               Search
//             </button>
//           </div>
//         </motion.div>

//         {/* IMAGE SECTION */}
//         <motion.img
//           variants={stagger}
//           src={HeroImg}
//           className="rounded-lg shadow-lg w-full max-w-md md:max-w-full mx-auto"
//         />
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;

import { motion } from "framer-motion";
import { Scissors, Flower2, Paintbrush, Hand, Sparkles } from "lucide-react";

import SearchBar from "./SearchBar";
import ProfessionalCard from "./ProfessionalCard";
import CategoryCard from "./CategoryCard";
import HowItWorks from "./Howitworks";

export default function Hero() {
  return (
    <section className="relative bg-[#0F0223] font-sans">
      <div className="absolute inset-0">
        <div className="absolute left-20 h-96 w-96% rounded-full bg-pink-600/20 blur-[150px]" />

        <div className="absolute right-20 top-30 h-96 w-96 rounded-full bg-purple-700/20 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}

          <div>
            <p className="text-pink-300 uppercase tracking-[5px]">
              Beauty. Confidence. You.
            </p>

            <h1 className="mt-6 text-6xl font-bold leading-tight text-white">
              Find a service
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                close to you
              </span>
            </h1>

            <p className="text-gray-300 mt-6 text-xl">
              Discover top beauty professionals near you. Book. Relax. Shine.
            </p>

            <div className="mt-10">
              <SearchBar />
            </div>

            <div className="grid grid-cols-5 gap-4 mt-10">
              <CategoryCard icon={<Scissors />} title="Hair" />

              <CategoryCard icon={<Hand />} title="Massage" />

              <CategoryCard icon={<Paintbrush />} title="Makeup" />

              <CategoryCard icon={<Flower2 />} title="Spa" />

              <CategoryCard icon={<Sparkles />} title="Nails" />
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            {/* RIGHT */}

            <div className="relative flex items-center justify-center">
              {/* Glow */}
              <div className="absolute h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-2xl" />

              {/* Outer Ring */}
              <div className="absolute h-[500px] w-[500px] rounded-full border border-fuchsia-400/20" />

              {/* Inner Ring */}
              <div className="absolute h-[420px] w-[420px] rounded-full border-2 border-fuchsia-500/40" />

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
                alt="Beauty Professional"
                className="relative z-10 w-full max-w-[520px]"
              />

              {/* Floating Cards */}
              <div className="absolute right-0 top-16 z-20">
                <ProfessionalCard
                  name="Jessica Parker"
                  role="Hair Stylist"
                  rating={4.9}
                />
              </div>

              <div className="absolute bottom-20 left-0 z-20">
                <ProfessionalCard
                  name="Sarah Morgan"
                  role="Makeup Artist"
                  rating={5}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <HowItWorks />
        </div>
      </div>
    </section>
  );
}