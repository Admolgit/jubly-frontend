import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialsIcon1 from '../../assets/pexels-shvetsa-4316402.jpg';
import TestimonialsIcon2 from '../../assets/pexels-shvetsa-4316402.jpg';
// import TestimonialsIcon3 from '../../assets/pexels-shvetsa-4316402.jpg';

const testimonials = [
  {
    name: "Leslie Alexander",
    location: "Moncton, Canada",
    image: `${TestimonialsIcon1}`,
    title: "An exceptional experience from start to finish",
    message:
      "The service was professional and seamless. Everything was well organized, and the environment was welcoming. I would highly recommend them to anyone looking for quality and reliability.",
  },
  {
    name: "John Carter",
    location: "Toronto, Canada",
    image: `${TestimonialsIcon2}`,
    title: "Highly professional and reliable",
    message:
      "I was impressed by the attention to detail and customer care. The entire process was smooth, and the results exceeded my expectations.",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm tracking-widest text-purple-700 uppercase mb-3">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-14">
          What our Customers say...
        </h2>

        <div className="relative bg-purple-900 rounded-3xl p-12 md:p-16 text-white overflow-hidden">
          {/* Decorative bars */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
            <div className="w-6 h-24 bg-white/80 rounded-full"></div>
            <div className="w-6 h-40 bg-white/40 rounded-full"></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              {/* Image */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={testimonials[index].image}
                  alt={testimonials[index].name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-white"
                />
              </div>

              {/* Text */}
              <div className="text-left">
                <span className="text-5xl leading-none">“</span>
                <p className="text-sm text-gray-200 mt-2">
                  {testimonials[index].name}
                </p>
                <p className="text-xs text-gray-300 mb-4">
                  {testimonials[index].location}
                </p>

                <h3 className="text-xl font-semibold mb-3">
                  {testimonials[index].title}
                </h3>

                <p className="text-gray-200 text-sm leading-relaxed">
                  {testimonials[index].message}
                </p>

                <div className="text-right text-5xl mt-4">”</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-purple-900 text-white flex items-center justify-center hover:opacity-90"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
