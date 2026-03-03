import { motion } from "framer-motion";
import { fadeUp, fadeIn, stagger } from "../animations";
import HeroImg from "../../assets/hero.png";

const Hero = () => {
  return (
    <section id="hero" className="pt-28 pb-20 bg-purple-900 text-white">
      <motion.div
        className="max-w-6xl mx-auto px-6 
                   flex flex-col-reverse 
                   md:grid md:grid-cols-2 
                   gap-12 items-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* TEXT SECTION */}
        <motion.div variants={fadeUp} className="text-center md:text-left">
          <p className="uppercase text-purple-200 text-[10px] md:text-[16px]">
            Hair salon, Masseuse, Beauty Salon, Makeup Artist
          </p>

          <h1 className="text-[28px] md:text-[62px] text-[#F7E5C1] font-bold leading-tight mt-2">
            Find a service close to you
          </h1>

          <p className="text-purple-200 mt-4">
            Discover top beauty professionals near you.
          </p>

          {/* SEARCH */}
          <div
            className="mt-6 
                          flex flex-col md:flex-row 
                          bg-white rounded-lg 
                          overflow-hidden 
                          w-full 
                          md:w-auto"
          >
            <input
              className="flex-1 px-4 py-3 text-black outline-none"
              placeholder="Search services"
            />
            <input
              className="flex-1 px-4 py-3 text-black outline-none border-t md:border-t-0 md:border-l"
              placeholder="Location"
            />
            <button className="bg-purple-700 px-6 py-3 text-white md:rounded-none">
              Search
            </button>
          </div>
        </motion.div>

        {/* IMAGE SECTION */}
        <motion.img
          variants={stagger}
          src={HeroImg}
          className="rounded-lg shadow-lg w-full max-w-md md:max-w-full mx-auto"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
