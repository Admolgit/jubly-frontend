import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
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
          Gallery
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.img
              key={i}
              variants={fadeUp}
              src={`/images/gallery-${i}.jpg`}
              className="rounded-lg object-cover h-48 w-full"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Gallery;
