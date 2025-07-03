
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import QuoteForm from "@/components/quote/QuoteForm";
import ServicesList from "@/components/quote/ServicesList";
import { FileText } from "lucide-react";

const GetQuote = () => {
  return (
    <>
      <SEO 
        title="Get a Quote" 
        description="Request a personalized quote for ƷBI's business and technology services. Our team will provide a detailed proposal tailored to your needs."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&crop=center"
        type="website"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24">
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-3 sm:px-4">
            {/* Breadcrumb navigation */}
            <BreadcrumbNav currentPageLabel="Get a Quote" />
            
            {/* Page Header */}
            <PageHeader 
              title="Get a Quote"
              description="Request a personalized quote for our business and technology services. Our team will provide a detailed proposal tailored to your needs."
              icon={FileText}
            />
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
              {/* Services List - Full width on mobile, 4 columns on XL screens */}
              <div className="xl:col-span-4 order-1 xl:order-1">
                <ServicesList />
              </div>
              
              {/* Quote Form - Full width on mobile, 8 columns on XL screens */}
              <div className="xl:col-span-8 order-2 xl:order-2">
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
