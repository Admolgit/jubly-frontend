import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import LogoIcon from "../../assets/login-image.jpg";
import Recommended1 from "../../assets/pexels-alipazani-2878374.jpg";
import Recommended2 from "../../assets/pexels-adrienne-andersen-1174503-2552127.jpg";
import Recommended3 from "../../assets/pexels-wayne-fotografias-1812121-10279714.jpg";

const services = [
  {
    id: 1,
    title: "Salon Name",
    image: `${LogoIcon}`,
    rating: 4.5,
    reviews: 104,
    location: "Brookpark Ext, 27085, North Olmsted, 44070",
  },
  {
    id: 2,
    title: "Salon Name",
    image: `${Recommended1}`,
    rating: 4.5,
    reviews: 104,
    location: "2267 Main st, Fort Myers, 33901",
  },
  {
    id: 3,
    title: "Deluxe room",
    image: `${Recommended2}`,
    rating: 4.5,
    reviews: 104,
    location: "2267 Main st, Fort Myers, 33901",
  },
  {
    id: 4,
    title: "Meeting room",
    image: `${Recommended3}`,
    rating: 4.5,
    reviews: 104,
    location: "2267 Main st, Fort Myers, 33901",
  },
];

export default function RecommendedSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-24 bg-[#F8F6F7]">
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest text-purple-700 uppercase">
            Services
          </p>
          <h2 className="text-3xl font-semibold text-gray-800">Recommended</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Discover thoughtfully crafted services designed to meet your needs
            with excellence and attention to detail.
          </p>
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {services.map((item) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={item.id}
              className="min-w-[300px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5">
                {/* Rating */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1 text-purple-500">
                    <Star size={16} fill="currentColor" />
                    <span>{item.rating}</span>
                  </div>
                  <span>{item.reviews} reviews</span>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm text-gray-500 mt-2">
                  <MapPin size={16} className="mt-0.5" />
                  <span>{item.location}</span>
                </div>

                {/* Button */}
                <button className="mt-5 w-full border border-purple-500 text-purple-900 py-2 rounded-lg hover:text-purple-700 transition">
                  BOOK NOW
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
