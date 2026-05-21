/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { fadeUp } from "../animations";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useCreateEnquryMutation } from "../../features/users/userApi";
import toast from "react-hot-toast";

type EnquiryFormInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Contact = () => {
  const [createEnquiry, { isLoading }] = useCreateEnquryMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormInput>();

  const onSubmit = async (data: any) => {
    try {
      const res = await createEnquiry(data).unwrap();

      if (res.status === 201) {
        toast.success(res.message);
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section id="contact" className="py-20 bg-purple-900 text-white">
      <motion.div
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-semibold text-center mb-10">
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
            <p className="text-sm mt-2">📧 support@Jubly.com</p>
            <p className="text-sm mt-2">📞 +234 800 000 0000</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label=""
              type="text"
              {...register("name", { required: "Name is required" })}
              error={errors.name?.message as any}
              className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
              placeholder="Name"
            />
            <Input
              label=""
              type="email"
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message as any}
              className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
              placeholder="Email"
            />
            <Input
              label=""
              type="text"
              {...register("phone", { required: "Phone is required" })}
              error={errors.phone?.message as any}
              className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
              placeholder="Phone"
            />
            <textarea
              className="border p-3 rounded w-full mb-1 border border-[#d9c7ff] outline-none transition focus:border-[#7c3aed]"
              placeholder="Message"
              {...register("message", { required: "Message is required" })}
            />
            <button className="w-full bg-purple-700 text-white py-3 rounded">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
