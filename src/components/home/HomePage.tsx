import React from "react";
import HeroSection from "../HeroSection";
import RecruitmentMarketingSection from "./RecruitmentMarketingSection";
import ClientTestimonials from "./ClientTestimonials";
import WebServicesSection from "./WebServicesSection";
import FeaturedProducts from "./FeaturedProducts";
import AdvancedFeatures from "./AdvancedFeatures";
import CTASection from "../CTASection";
import NewsletterSection from "./NewsletterSection";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Recruitment Marketing */}
      <RecruitmentMarketingSection />
      
      {/* Client Testimonials */}
      <ClientTestimonials />
      
      {/* Web Services */}
      <WebServicesSection />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Advanced Features */}
      <AdvancedFeatures />
      
      {/* Call to Action */}
      <CTASection />
      
      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
};

export default HomePage;