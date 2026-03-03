import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../logo";

// import Button from "../ui/Button";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setIsOpen(false); // close mobile menu after click
  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="hover:text-purple-600"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <button
            className="px-4 py-2 border rounded text-sm cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-4 py-2 bg-purple-700 text-white rounded text-sm cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Signup
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left hover:text-purple-600"
            >
              {item.label}
            </button>
          ))}

          <div className="flex flex-col gap-3 pt-4">
            <button
              className="px-4 py-2 border rounded text-sm w-full"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-purple-700 text-white rounded text-sm w-full"
              onClick={() => navigate("/register")}
            >
              Signup
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
