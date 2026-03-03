import { motion } from "framer-motion";
import { fadeUp } from "../animations";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-purple-900 text-white">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-semibold mb-8">What our customers say</h2>

        <div className="bg-purple-800 p-8 rounded-lg">
          <p className="italic">
            “Stylicle made booking beauty services effortless and fast.”
          </p>
          <p className="mt-4 font-semibold">— Lola A.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
