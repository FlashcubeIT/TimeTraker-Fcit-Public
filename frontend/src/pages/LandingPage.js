import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Time from "../components/Time";
import Job from "../components/Job";
import Team from "../components/Team";
import Features from "../components/Features";
import Business from "../components/Business";
import Business1 from "../components/Business1";
import Price from "../components/Price";
import Blog from "../components/Blog";
import Faq from "../components/Faq";
import FormSection from "../components/FormSection";
import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Time />
      <Job />
      <Team />
      <Features />
      <Business />
      <Price />
      <Blog />
      <Business1 />
      <Faq />
      <FormSection />
      <Footer />
      <Footer2 />
    </div>
  );
}

export default LandingPage;
