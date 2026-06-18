// import { useNavigate } from "react-router-dom";
// import Logo from "../logo";

// const Footer = () => {
//   const navigate = useNavigate()
//   return (
//     <footer className="bg-black text-gray-400 py-12">
//       <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
//         <div>
//           <Logo />
//           <p className="text-sm mt-2">
//             Connecting beauty professionals with customers.
//           </p>
//         </div>

//         <div>
//           <h4 className="text-white font-semibold mb-3">Explore</h4>
//           <ul className="space-y-2 text-sm">
//             <li className="cursor-pointer" onClick={() => navigate("/")}>
//               Home
//             </li>
//             <li>About</li>
//             <li>Services</li>
//             <li>Contact</li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="text-white font-semibold mb-3">Legal</h4>
//           <ul className="space-y-2 text-sm">
//             <li onClick={() => navigate("policy")} className="cursor-pointer">
//               Privacy Policy
//             </li>
//             <li onClick={() => navigate("terms")} className="cursor-pointer">
//               Terms & Conditions
//             </li>
//           </ul>
//         </div>
//       </div>

//       <p className="text-center text-xs mt-10">
//         © 2025 Jubly. All rights reserved.
//       </p>
//     </footer>
//   );
// };

// export default Footer;

import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#1a0f2e] text-gray-400 py-12 border-t border-purple-900/30">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-10">
        {/* Left Column - Logo + Description + Social */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <p className="text-sm mt-4 leading-relaxed">
            Your one-stop platform to discover
            <br />
            and book the best beauty &<br />
            wellness professionals near you.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 transition-colors flex items-center justify-center text-lg"
            >
              f
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 transition-colors flex items-center justify-center text-lg"
            >
              📷
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 transition-colors flex items-center justify-center text-lg"
            >
              𝕏
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 transition-colors flex items-center justify-center text-lg"
            >
              📌
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              About Us
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              Services
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              How It Works
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              Contact
            </li>
          </ul>
        </div>

        {/* For Clients */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">For Clients</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="cursor-pointer hover:text-white transition-colors">
              Browse Services
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              How to Book
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              <Link to={"/faq"}>FAQ</Link>
            </li>
            <li
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => navigate("/terms")}
            >
              Terms of Service
            </li>
            <li
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => navigate("/policy")}
            >
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* For Professionals */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">
            For Professionals
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li className="cursor-pointer hover:text-white transition-colors">
              Become a Pro
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              Pro Dashboard
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              Resources
            </li>
            <li className="cursor-pointer hover:text-white transition-colors">
              Help Center
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-lg">Contact Us</h4>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">📞</span>
              <div>+234 (090) 49181121</div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">✉️</span>
              <div>hello@jubly.com</div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">📍</span>
              <div>Surulere, Lagos. 10234</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-purple-900/30 mt-12 pt-6">
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Jubly. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
