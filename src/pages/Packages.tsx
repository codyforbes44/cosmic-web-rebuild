
import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import PackagesHeader from "@/components/packages/PackagesHeader";
import PackagesGrid from "@/components/packages/PackagesGrid";
import FAQSection from "@/components/packages/FAQSection";
import HelpSection from "@/components/packages/HelpSection";
import { getSubdomain } from "@/lib/subdomain";

const Packages: React.FC = () => {
  const subdomain = getSubdomain();
  
  // If we're on a subdomain, don't render the main app's Packages page
  // This should be handled by the subdomain-specific app
  if (subdomain) {
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>All Subscription Plans | ƷBI Technology Solutions</title>
        <meta name="description" content="Choose the perfect subscription package for your business needs. From startups to enterprise, we offer flexible solutions to help you succeed." />
      </Helmet>

      <StarBackground />
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <PackagesHeader />
          <PackagesGrid />
          <FAQSection />
          <HelpSection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Packages;
