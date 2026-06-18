import { motion } from "framer-motion";

interface Props {
  icon: React.ReactNode;
  title: string;
}

export default function CategoryCard({ icon, title }: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer"
    >
      <div className="text-pink-400 mb-3">{icon}</div>

      <h3 className="text-white">{title}</h3>
    </motion.div>
  );
}
