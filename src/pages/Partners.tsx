
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PartnerShowcase from "@/components/partners/PartnerShowcase";
import PartnersHero from "@/components/partners/PartnersHero";
import PartnerBenefits from "@/components/partners/PartnerBenefits";
import BecomePartner from "@/components/partners/BecomePartner";
import SEO from "@/components/SEO";
import StarBackground from "@/components/StarBackground";

const Partners: React.FC = () => {
  return (
    <>
      <SEO
        title="Our Partners"
        description="Meet the strategic partners that help ƷBI deliver exceptional technology solutions and services to our clients."
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=630&fit=crop&crop=center"
      />
      
      <Navbar />
      <StarBackground />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb navigation */}
          <BreadcrumbNav currentPageLabel="Partners" />
          
          <PartnersHero />
          <PartnerShowcase />
          <PartnerBenefits />
          <BecomePartner />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Partners;
