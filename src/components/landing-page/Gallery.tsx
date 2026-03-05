import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";
import g1 from "../../assets/gallery-1.jpg";
import g2 from "../../assets/gallery-2.jpg";
import g3 from "../../assets/gallery-3.jpg";
import g4 from "../../assets/gallery-4.jpg";
import GalleryCarousel from "./GalleryCarousel";

const images = [g1, g2, g3, g4];


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
          className="text-sm tracking-widest uppercase mb-10 text-center text-purple-700"
        >
          Gallery
        </motion.h2>

        <GalleryCarousel images={images} />
      </motion.div>
    </section>
  );
};

export default Gallery;
