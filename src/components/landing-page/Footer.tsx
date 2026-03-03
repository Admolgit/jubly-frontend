import Logo from "../logo";

const Footer = () => {
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
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs mt-10">
        © 2025 Stylicle. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
