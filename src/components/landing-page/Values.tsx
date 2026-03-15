import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";
import FirstImg from '../../assets/barber.png';
import SecondImg from '../../assets/feedback.png';
import ThirdImg from '../../assets/supply.png';

const Values = () => {
  return (
    <section className="py-20 bg-white">
      <motion.div
        className="max-w-6xl flex flex-col items-center justify-center mx-auto px-6"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1 className="text-sm tracking-widest mb-10 text-center text-purple-700 uppercase">
          Our Values
        </motion.h1>
        <motion.h2 variants={fadeUp} className="text-2xl font-semibold mb-12">
          The work values we thrive for
        </motion.h2>

        <div className="max-w-md">
          {[
            {
              title: "Quality Experts",
              desc: "Highly vetted professionals with years of experience.",
              img: FirstImg,
            },
            {
              title: "Great Service",
              desc: "Customer satisfaction is our utmost priority.",
              img: SecondImg,
            },
            {
              title: "Best Facilities",
              desc: "Clean, modern and professional service space for you beauty.",
              img: ThirdImg,
            },
          ].map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <div className="flex items-center gap-4 p-6 border-b rounded-lg hover:shadow-lg cursor-pointer">
                <div className="flex justify-center items-center w-[100px] h-[100px] bg-[#F3EAEA] border border-black rounded-md">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[60px] h-[60px] object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Values;
