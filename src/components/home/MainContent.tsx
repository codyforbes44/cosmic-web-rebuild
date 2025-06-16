
import React from "react";
import HeroSection from "../HeroSection";
import WebDevelopmentServices from "../WebDevelopmentServices";
import TechnologyShowcase from "../TechnologyShowcase";
import Testimonials from "../Testimonials";
import Newsletter from "../Newsletter";

const MainContent: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WebDevelopmentServices />
      <TechnologyShowcase />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default MainContent;
