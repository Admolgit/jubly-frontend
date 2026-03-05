import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";
import MakeOverIcon from '../../assets/makeover.png';
import BodyMassageIcon from '../../assets/body-massage.png';
import PhotographerIcon from '../../assets/camera.png';
import NailIcon from '../../assets/cut.png';
import BarberIcon from '../../assets/hairdresser.png';
import NailPolishIcon from '../../assets/nail-polish.png';

const categories = [
  "Makeup Artist",
  "Hair Stylist",
  "Massage",
  "Nail Technician",
  "Photography",
  "Barber",
];

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-sm tracking-widest mb-10 text-center text-purple-700 uppercase"
        >
          Categories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat}
              variants={fadeUp}
              className="flex flex-col items-center p-6 border rounded-lg text-center hover:shadow-lg cursor-pointer"
            >
              {cat === "Makeup Artist" && (
                <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
                  <img src={MakeOverIcon} alt="" />
                </div>
              )}
              {cat === "Hair Stylist" && (
                <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
                  <img src={NailIcon} alt="" />
                </div>
              )}
              {cat === "Massage" && (
                <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
                  <img src={BodyMassageIcon} alt="" />
                </div>
              )}
              {cat === "Nail Technician" && (
                <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
                  <img src={NailPolishIcon} alt="" />
                </div>
              )}
              {cat === "Photography" && (
                <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
                  <img src={PhotographerIcon} alt="" />
                </div>
              )}
              {cat === "Barber" && (
                <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
                  <img src={BarberIcon} alt="" />
                </div>
              )}
              {cat}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Categories;
