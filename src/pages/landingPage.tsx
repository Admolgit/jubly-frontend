import Categories from "../components/landing-page/Categories";
import Contact from "../components/landing-page/Contact";
// import Footer from "../components/landing-page/Footer";
import Gallery from "../components/landing-page/Gallery";
import Hero from "../components/landing-page/Hero";
import Journey from "../components/landing-page/Journey";
// import Navbar from "../components/landing-page/Navbar";
import Recommended from "../components/landing-page/Recommended";
import TestimonialSection from "../components/landing-page/Testimonials";
import Values from "../components/landing-page/Values";

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* <Navbar /> */}
      <Hero />
      <Categories />
      <Gallery />
      <Recommended />
      <TestimonialSection />
      <Values />
      <Journey />
      <Contact />
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
