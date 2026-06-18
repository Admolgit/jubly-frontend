import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  name: string;
  role: string;
  rating: number;
}

export default function ProfessionalCard({ name, role, rating }: Props) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 5,
      }}
      className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 w-72"
    >
      <div className="flex gap-4">
        <img
          src="https://i.pravatar.cc/150"
          alt=""
          className="w-14 h-14 rounded-full"
        />

        <div>
          <div className="flex items-center gap-1">
            <Star size={15} fill="gold" color="gold" />
            <span className="text-white">{rating}</span>
          </div>

          <h4 className="text-white font-semibold">{name}</h4>

          <p className="text-gray-300 text-sm">{role}</p>
        </div>
      </div>

      <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        Book Now
      </button>
    </motion.div>
  );
}
