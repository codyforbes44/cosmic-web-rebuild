
import React from "react";
import HeroSection from "../HeroSection";
import RecruitmentMarketingSection from "./RecruitmentMarketingSection";
import ClientTestimonials from "./ClientTestimonials";

const MainContent: React.FC = () => {
  return (
    <>
      <HeroSection />
      <RecruitmentMarketingSection />
      <ClientTestimonials />
    </>
  );
};

export default MainContent;
