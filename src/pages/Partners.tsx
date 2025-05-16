
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerShowcase from "@/components/partners/PartnerShowcase";
import PartnersHero from "@/components/partners/PartnersHero";
import PartnerBenefits from "@/components/partners/PartnerBenefits";
import BecomePartner from "@/components/partners/BecomePartner";

const Partners: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Our Partners | ƷBI Technology Solutions</title>
        <meta name="description" content="Meet the strategic partners that help ƷBI deliver exceptional technology solutions and services to our clients." />
      </Helmet>
      
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
