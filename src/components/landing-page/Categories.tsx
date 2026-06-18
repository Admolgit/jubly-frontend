// import { motion } from "framer-motion";
// import { fadeUp, stagger } from "../animations";
// import HairImg from "../../assets/makeover.png";
// import MassageImg from "../../assets/body-massage.png";
// import MakeupImg from "../../assets/camera.png";
// import NailsImg from "../../assets/cut.png";
// import SpaImg from "../../assets/hairdresser.png";
// import BrowsImg from "../../assets/nail-polish.png";

// const categories = [
//   "Makeup Artist",
//   "Hair Stylist",
//   "Massage",
//   "Nail Technician",
//   "Photography",
//   "Barber",
// ];

// const Categories = () => {
//   return (
//     <section className="py-20 bg-white">
//       <motion.div
//         className="max-w-6xl mx-auto px-6"
//         variants={stagger}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         <motion.h2
//           variants={fadeUp}
//           className="text-sm tracking-widest mb-10 text-center text-purple-700 uppercase"
//         >
//           Categories
//         </motion.h2>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {categories.map((cat) => (
//             <motion.div
//               key={cat}
//               variants={fadeUp}
//               className="flex flex-col items-center p-6 border rounded-lg text-center hover:shadow-lg cursor-pointer"
//             >
//               {cat === "Makeup Artist" && (
//                 <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
//                   <img src={MakeOverIcon} alt="" />
//                 </div>
//               )}
//               {cat === "Hair Stylist" && (
//                 <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
//                   <img src={NailIcon} alt="" />
//                 </div>
//               )}
//               {cat === "Massage" && (
//                 <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
//                   <img src={BodyMassageIcon} alt="" />
//                 </div>
//               )}
//               {cat === "Nail Technician" && (
//                 <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
//                   <img src={NailPolishIcon} alt="" />
//                 </div>
//               )}
//               {cat === "Photography" && (
//                 <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
//                   <img src={PhotographerIcon} alt="" />
//                 </div>
//               )}
//               {cat === "Barber" && (
//                 <div className="w-12 h-12 rounded-full bg-[#F3EAEA] flex items-center justify-center">
//                   <img src={BarberIcon} alt="" />
//                 </div>
//               )}
//               {cat}
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Categories;

// import HairImg from "../../assets/categories/hair.jpg";
// import MassageImg from "../../assets/categories/massage.jpg";
// import MakeupImg from "../../assets/categories/makeup.jpg";
// import NailsImg from "../../assets/categories/nails.jpg";
// import SpaImg from "../../assets/categories/spa.jpg";
// import BrowsImg from "../../assets/categories/brows.jpg";

const categories = [
  {
    name: "Hair Salon",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
    services: 120,
  },
  {
    name: "Massage",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    services: 90,
  },
  {
    name: "Makeup",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
    services: 150,
  },
  {
    name: "Nails",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
    services: 90,
  },
  {
    name: "Spa",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    services: 110,
  },
  {
    name: "Brows & Lashes",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    services: 80,
  },
];

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { fadeUp, stagger } from "../animations";

const Categories = () => {
  return (
    <section className="relative overflow-hidden bg-[#05011a] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#6d28d9_0%,transparent_40%)] opacity-20" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative mx-auto max-w-7xl px-6"
      >
        <div className="mb-12 flex items-center justify-between">
          <motion.h2
            variants={fadeUp}
            className=" text-2xl font-bold text-white"
          >
            ✦ Browse by Category ✦
          </motion.h2>

          <motion.a
            variants={fadeUp}
            href="#"
            className="hidden items-center gap-2 text-purple-300 transition hover:text-white md:flex"
          >
            View all categories
            <ArrowRight size={18} />
          </motion.a>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={fadeUp}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="group min-w-[220px] rounded-3xl border border-purple-500/20 bg-white/5 p-3 backdrop-blur-xl"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur">
                  <Heart size={16} />
                </button>
              </div>

              <div className="pt-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {category.name}
                </h3>

                <div className="mt-2 flex justify-center gap-1 text-yellow-400">
                  ★ ★ ★ ★ ★
                </div>

                <p className="mt-2 text-sm text-purple-200">
                  {category.services}+ Services
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-purple-300"
          >
            View all categories
            <ArrowRight size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Categories;
