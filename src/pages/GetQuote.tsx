
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import SEO from "@/components/SEO";
import QuoteHeader from "@/components/quote/QuoteHeader";
import QuoteForm from "@/components/quote/QuoteForm";
import ServicesList from "@/components/quote/ServicesList";

const GetQuote = () => {
  return (
    <>
      <SEO 
        title="Get a Free Consultation" 
        description="Request a personalized consultation for ƷBI's business and technology services. Our team will provide a detailed proposal tailored to your needs."
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
        type="website"
      />
      <StarBackground />
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24 z-10">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <QuoteHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
              {/* Services List - 4 columns on large screens */}
              <div className="lg:col-span-4 order-2 lg:order-1">
                <ServicesList />
              </div>
              
              {/* Quote Form - 8 columns on large screens */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GetQuote;
