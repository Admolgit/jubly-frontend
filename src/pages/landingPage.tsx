import Contact from "../components/landing-page/Contact";
import Recommended from "../components/landing-page/Recommended";
import TestimonialSection from "../components/landing-page/Testimonials";
import Categories from "../components/landing-page/Categories";
import Hero from "../components/landing-page/Hero";
import { TrustSection } from "../components/landing-page/Journey";

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