// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { motion } from "framer-motion";
// import { fadeUp } from "../animations";
// import Input from "../ui/Input";
// import { useForm } from "react-hook-form";
// import { useCreateEnquryMutation } from "../../features/users/userApi";
// import toast from "react-hot-toast";

// type EnquiryFormInput = {
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
// };

// const Contact = () => {
//   const [createEnquiry, { isLoading }] = useCreateEnquryMutation();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<EnquiryFormInput>();

//   const onSubmit = async (data: any) => {
//     try {
//       const res = await createEnquiry(data).unwrap();

//       if (res.status === 201) {
//         toast.success(res.message);
//       }
//       reset();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <section id="contact" className="py-20 bg-purple-900 text-white">
//       <motion.div
//         className="max-w-5xl mx-auto px-6"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeUp}
//       >
//         <h2 className="text-2xl font-semibold text-center mb-10">
//           We Are Ready To Assist You 24x7
//         </h2>

//         <div className="grid md:grid-cols-2 gap-12 bg-white text-black p-8 rounded-lg">
//           <div>
//             <h3 className="font-semibold mb-4">
//               We are here to help you always
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Reach out to us for any inquiries or assistance.
//             </p>

//             <p className="text-sm">📍 Lagos, Nigeria</p>
//             <p className="text-sm mt-2">📧 support@Jubly.com</p>
//             <p className="text-sm mt-2">📞 +234 800 000 0000</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <Input
//               label=""
//               type="text"
//               {...register("name", { required: "Name is required" })}
//               error={errors.name?.message as any}
//               className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
//               placeholder="Name"
//             />
//             <Input
//               label=""
//               type="email"
//               {...register("email", { required: "Email is required" })}
//               error={errors.email?.message as any}
//               className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
//               placeholder="Email"
//             />
//             <Input
//               label=""
//               type="text"
//               {...register("phone", { required: "Phone is required" })}
//               error={errors.phone?.message as any}
//               className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
//               placeholder="Phone"
//             />
//             <textarea
//               className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
//               placeholder="Message"
//               {...register("message", { required: "Message is required" })}
//             />
//             <button className="w-full bg-purple-700 text-white py-3 rounded">
//               {isLoading ? "Submitting..." : "Submit"}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Contact;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { fadeUp } from "../animations";
import toast from "react-hot-toast";

type NewsletterInput = {
  email: string;
};

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>();

  const onSubmit = async (data: NewsletterInput) => {
    try {
      console.log(data);

      toast.success("Successfully subscribed!");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="py-20 bg-[#060014] overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-7xl mx-auto px-6"
      >
        <div
          className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-gradient-to-r
          from-[#14052a]
          via-[#1a0938]
          to-[#14052a]
          p-8
          lg:p-12
        "
        >
          {/* Glow Effects */}

          <div className="absolute left-0 top-0 w-72 h-72 bg-fuchsia-600/10 blur-[120px]" />
          <div className="absolute right-0 bottom-0 w-72 h-72 bg-purple-600/10 blur-[120px]" />

          <div className="relative grid lg:grid-cols-[280px_1fr] gap-12 items-center">
            {/* Left Illustration */}

            <div className="flex justify-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-fuchsia-500/20 blur-3xl rounded-full" />

                <div
                  className="
                  relative
                  w-40
                  h-40
                  rounded-[32px]
                  bg-gradient-to-br
                  from-fuchsia-500
                  to-purple-700
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_60px_rgba(217,70,239,.35)]
                "
                >
                  <Mail
                    size={70}
                    className="text-white"
                  />
                </div>
              </motion.div>
            </div>

            {/* Content */}

            <div>
              <h2 className="text-white text-2xl lg:text-3xl font-semibold">
                Stay Updated with Best Offers
              </h2>

              <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
                Subscribe to our newsletter and get exclusive
                discounts, beauty tips, and special promotions
                delivered straight to your inbox.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      className="
                        w-full
                        h-16
                        rounded-2xl
                        px-6
                        bg-white/[0.04]
                        border
                        border-white/10
                        text-white
                        placeholder:text-gray-500
                        outline-none
                        focus:border-fuchsia-500/40
                      "
                    />

                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="
                      h-16
                      px-10
                      rounded-2xl
                      bg-gradient-to-r
                      from-fuchsia-500
                      to-purple-600
                      text-white
                      font-semibold
                      shadow-[0_10px_40px_rgba(217,70,239,.35)]
                      hover:scale-[1.02]
                      transition-all
                    "
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;