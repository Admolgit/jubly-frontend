import { motion } from "framer-motion";
import { fadeUp } from "../animations";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-purple-900 text-white">
      <motion.div
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-semibold text-center mb-10">
          We Are Ready To Assist You 24x7
        </h2>

        <div className="grid md:grid-cols-2 gap-12 bg-white text-black p-8 rounded-lg">
          <div>
            <h3 className="font-semibold mb-4">
              We are here to help you always
            </h3>
            <p className="text-gray-600 mb-6">
              Reach out to us for any inquiries or assistance.
            </p>

            <p className="text-sm">📍 Lagos, Nigeria</p>
            <p className="text-sm mt-2">📧 support@stylicle.com</p>
            <p className="text-sm mt-2">📞 +234 800 000 0000</p>
          </div>

          <form className="space-y-4">
            <input
              className="w-full border px-4 py-2 rounded"
              placeholder="Name"
            />
            <input
              className="w-full border px-4 py-2 rounded"
              placeholder="Email"
            />
            <input
              className="w-full border px-4 py-2 rounded"
              placeholder="Phone"
            />
            <textarea
              className="w-full border px-4 py-2 rounded"
              placeholder="Message"
            />
            <button className="w-full bg-purple-700 text-white py-3 rounded">
              Submit
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
