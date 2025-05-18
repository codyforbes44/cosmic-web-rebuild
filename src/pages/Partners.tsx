
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerShowcase from "@/components/partners/PartnerShowcase";
import PartnersHero from "@/components/partners/PartnersHero";
import PartnerBenefits from "@/components/partners/PartnerBenefits";
import BecomePartner from "@/components/partners/BecomePartner";
import SEO from "@/components/SEO";

const Partners: React.FC = () => {
  return (
    <>
      <SEO
        title="Our Partners"
        description="Meet the strategic partners that help ƷBI deliver exceptional technology solutions and services to our clients."
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
      />
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-24">
          <PartnersHero />
          <PartnerShowcase />
          <PartnerBenefits />
          <BecomePartner />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Partners;
