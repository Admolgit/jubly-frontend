// import { motion } from "framer-motion";
// import { fadeUp } from "../animations";
// import ReceptionistImg from "./../../assets/receptionists.jpg";

// const Journey = () => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={fadeUp}
//         >
//           <h2 className="text-2xl font-semibold mb-4">
//             The start of the journey
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Our platform bridges the gap between beauty professionals and
//             customers, creating seamless booking experiences.
//           </p>

//           <ul className="space-y-4 text-sm">
//             <li>✔ Seamless Signup</li>
//             <li>✔ Instant Booking</li>
//             <li>✔ Secure Payments</li>
//           </ul>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <img src={ReceptionistImg} className="rounded-lg shadow-lg" />
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Journey;

import { BadgeCheck, Shield, Tag, Headphones } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description: "All experts are verified and background checked",
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payments and data are 100% secure",
  },
  {
    icon: Tag,
    title: "Best Price Guarantee",
    description: "We ensure you get the best value",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here to help you anytime",
  },
];

export function TrustSection() {
  return (
    <section className="">
      <div
        className="
        bg-gradient-to-r
        from-[#16072d]
        via-[#1d0d3a]
        to-[#16072d]
        backdrop-blur-xl
        overflow-hidden
        "
      >
        <div className="grid lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10 max-w-7xl mx-auto px-6">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                flex items-center gap-5
                p-8
                hover:bg-white/[0.02]
                transition-all
                "
              >
                <div
                  className="
                  flex
                  items-center
                  justify-center
                  h-16
                  w-16
                  rounded-2xl
                  bg-fuchsia-500/10
                  border
                  border-fuchsia-500/20
                  "
                >
                  <Icon className="text-fuchsia-400" size={34} />
                </div>

                <div>
                  <h3 className="text-white font-semibold">{item.title}</h3>

                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}