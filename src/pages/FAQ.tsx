
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import LiveChat from '@/components/LiveChat/LiveChat';
import StarBackground from "@/components/StarBackground";
import PageHeader from "@/components/PageHeader";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { HelpCircle } from 'lucide-react';

// Import refactored components
import FAQCategories from '@/components/FAQ/FAQCategories';
import FAQTestimonials from '@/components/FAQ/FAQTestimonials';
import FAQCTA from '@/components/FAQ/FAQCTA';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <>
      <SEO
        title="Frequently Asked Questions | Ʒʙɪ"
        description="Find answers to commonly asked questions about Ʒʙɪ's services, products, and expertise in digital marketing and technology solutions."
        url="/faq"
        keywords="FAQ, frequently asked questions, business technology, digital marketing, Ʒʙɪ, technology solutions"
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
      />
      <Navbar />
      
      <div className="min-h-screen relative overflow-hidden">
        <StarBackground />
        <div className="container mx-auto px-3 sm:px-4 py-16 sm:py-20 md:py-24 relative z-10">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNav currentPageLabel="FAQ" />
          
          {/* Page Header */}
          <PageHeader 
            title="Frequently Asked Questions"
            description="Get answers to common questions about our services, products, and how we can help your business succeed"
            icon={HelpCircle}
          />

          <div className="max-w-4xl mx-auto">
            <FAQCategories activeTab={activeTab} setActiveTab={setActiveTab} />
            <FAQTestimonials />
            <FAQCTA />
          </div>
        </div>
      </div>
      
      <LiveChat />
      <Footer />
    </>
  );
};

export default FAQ;
