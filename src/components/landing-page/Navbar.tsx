import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../logo";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Faqs", id: "how-it-works" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  return (
    <nav
      className="
      fixed
      left-0
      right-0
      top-0
      z-50
      backdrop-blur-xl
      bg-black/20
      border-b
      border-white/10
    "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}

        <div className="flex items-center gap-3">
          <Logo />
        </div>

        {/* Desktop Menu */}

        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="
                text-white/90
                hover:text-white
                transition
                relative
                after:absolute
                after:left-0
                after:-bottom-2
                after:h-[2px]
                after:w-0
                after:bg-fuchsia-500
                hover:after:w-full
                after:transition-all
              "
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-white/20
              text-white
              hover:bg-white/5
              transition
            "
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-gradient-to-r
              from-pink-500
              to-purple-600
              text-white
              shadow-lg
              shadow-purple-500/20
              hover:scale-[1.02]
              transition-all
            "
          >
            Signup
          </button>
        </div>

        {/* Mobile Toggle */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div
          className="
          lg:hidden
          border-t
          border-white/10
          bg-[#0d021f]/95
          backdrop-blur-xl
        "
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="
                  text-left
                  text-white
                  hover:text-fuchsia-400
                  transition
                "
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => navigate("/login")}
                className="
                  w-full
                  py-3
                  rounded-xl
                  border
                  border-white/20
                  text-white
                "
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-pink-500
                  to-purple-600
                  text-white
                "
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
