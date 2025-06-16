
import React from "react";
import HeroSection from "../HeroSection";
import WebDevelopmentServices from "./WebServicesSection";
import ClientTestimonials from "./ClientTestimonials";

const MainContent: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WebDevelopmentServices />
      <ClientTestimonials />
    </>
  );
};

export default MainContent;
