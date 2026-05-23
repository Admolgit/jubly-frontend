import { useNavigate } from "react-router-dom";
import Logo from "../logo";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <Logo />
          <p className="text-sm mt-2">
            Connecting beauty professionals with customers.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li onClick={() => navigate("policy")} className="cursor-pointer">
              Privacy Policy
            </li>
            <li onClick={() => navigate("terms")} className="cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs mt-10">
        © 2025 Jubly. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
