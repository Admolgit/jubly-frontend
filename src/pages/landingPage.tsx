import Categories from "../components/landing-page/categories";
import Contact from "../components/landing-page/Contact";
import Footer from "../components/landing-page/Footer";
import Gallery from "../components/landing-page/Gallery";
import Hero from "../components/landing-page/hero";
import Journey from "../components/landing-page/Journey";
import Navbar from "../components/landing-page/navbar";
import Recommended from "../components/landing-page/Recommended";
import Testimonials from "../components/landing-page/Testimonials";
import Values from "../components/landing-page/Values";

const LandingPage = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Categories />
      <Gallery />
      <Recommended />
      <Testimonials />
      <Values />
      <Journey />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
