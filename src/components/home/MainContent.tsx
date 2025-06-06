
import React from "react";
import HeroSection from "../HeroSection";
import ProductOfferings from "../ProductOfferings";
import TechnologyShowcase from "../TechnologyShowcase";
import Testimonials from "../Testimonials";
import Newsletter from "../Newsletter";

const MainContent: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ProductOfferings />
      <TechnologyShowcase />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default MainContent;
