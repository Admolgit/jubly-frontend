import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";

const Values = () => {
  return (
    <section className="py-20 bg-white">
      <motion.div
        className="max-w-6xl mx-auto px-6 text-center"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={fadeUp} className="text-2xl font-semibold mb-12">
          The work values we thrive for
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality Experts",
              desc: "Highly vetted professionals with years of experience.",
            },
            {
              title: "Great Service",
              desc: "Customer satisfaction is our highest priority.",
            },
            {
              title: "Best Facilities",
              desc: "Clean, modern and professional service spaces.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="p-6 border rounded-lg hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Values;
