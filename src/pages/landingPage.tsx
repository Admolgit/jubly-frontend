// import Categories from "../components/landing-page/Categories";
import Contact from "../components/landing-page/Contact";
// // import Footer from "../components/landing-page/Footer";
// import Gallery from "../components/landing-page/Gallery";
// import Hero from "../components/landing-page/Hero";
// // import Navbar from "../components/landing-page/Navbar";
import Recommended from "../components/landing-page/Recommended";
import TestimonialSection from "../components/landing-page/Testimonials";
// import Values from "../components/landing-page/Values";

import Categories from "../components/landing-page/Categories";
import Hero from "../components/landing-page/Hero";
import { TrustSection } from "../components/landing-page/Journey";
// import Navbar from "../components/landing-page/Navbar";

// const LandingPage = () => {
//   return (
//     <div className="font-sans">
//       {/* <Navbar /> */}
//       <Hero />
//       <Categories />
//       <Gallery />
//       <Recommended />
//       <TestimonialSection />
//       <Values />
//       <Journey />
//       <Contact />
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default LandingPage;

export default function LandingPage() {
  return (
    <main className="">
      {/* <Navbar /> */}
      <Hero />
      <Categories />
      <Recommended />
      <TestimonialSection />
      <TrustSection />
      <Contact />
    </main>
  );
}