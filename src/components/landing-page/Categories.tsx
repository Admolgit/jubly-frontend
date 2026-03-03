import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";

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
          className="text-2xl font-semibold mb-10 text-center text-purple-700"
        >
          Categories
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat}
              variants={fadeUp}
              className="p-6 border rounded-lg text-center hover:shadow-lg cursor-pointer"
            >
              {cat}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Categories;
