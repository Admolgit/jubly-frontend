import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";

const Recommended = () => {
  return (
    <section id="recommended" className="py-20 bg-white">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-[500] text-purple-700 mb-2 text-center"
        >
          Our Services
        </motion.h2>
        <motion.h2
          variants={fadeUp}
          className="text-2xl font-semibold mb-10 text-center"
        >
          Recommended
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="border rounded-lg overflow-hidden hover:shadow-lg"
            >
              <img src={`/images/vendor-${i}.jpg`} />
              <div className="p-4">
                <h3 className="font-semibold">Salon Name</h3>
                <p className="text-sm text-gray-500">From ₦5,000</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Recommended;
