
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerShowcase from "@/components/partners/PartnerShowcase";
import PartnersHero from "@/components/partners/PartnersHero";
import PartnerBenefits from "@/components/partners/PartnerBenefits";
import BecomePartner from "@/components/partners/BecomePartner";
import SEO from "@/components/SEO";
import StarBackground from "@/components/StarBackground";
import { Card, CardContent } from "@/components/ui/card";

const Partners: React.FC = () => {
  return (
    <>
      <SEO
        title="Our Partners"
        description="Meet the strategic partners that help ƷBI deliver exceptional technology solutions and services to our clients."
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
      />
      
      <StarBackground />
      <Navbar />
      
      <main className="relative flex-grow pt-24 z-10">
        <div className="container mx-auto px-4">
          <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our Partners
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Meet the strategic partners that help ƷBI deliver exceptional technology solutions and services
              </p>
            </CardContent>
          </Card>
        </div>
        
        <PartnerShowcase />
        <PartnerBenefits />
        <BecomePartner />
      </main>

      <Footer />
    </>
  );
};

export default Partners;
