
import React from "react";
import HeroSection from "../HeroSection";
import WebDevelopmentServices from "./WebServicesSection";
import TechnologyShowcase from "./TechShowcase";
import ClientTestimonials from "./ClientTestimonials";
import NewsletterSection from "./NewsletterSection";

const MainContent: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WebDevelopmentServices />
      <TechnologyShowcase />
      <ClientTestimonials />
      <NewsletterSection />
    </>
  );
};

export default MainContent;
