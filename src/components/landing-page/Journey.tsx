import { motion } from "framer-motion";
import { fadeUp } from "../animations";

const Journey = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-2xl font-semibold mb-4">
            The start of the journey
          </h2>
          <p className="text-gray-600 mb-6">
            Our platform bridges the gap between beauty professionals and
            customers, creating seamless booking experiences.
          </p>

          <ul className="space-y-4 text-sm">
            <li>✔ Seamless Signup</li>
            <li>✔ Instant Booking</li>
            <li>✔ Secure Payments</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img src="/images/journey.jpg" className="rounded-lg shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
