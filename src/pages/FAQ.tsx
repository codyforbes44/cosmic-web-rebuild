
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import LiveChat from '@/components/LiveChat/LiveChat';
import StarBackground from "@/components/StarBackground";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

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
        <div className="container mx-auto px-4 py-24 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center">
                      <HomeIcon className="h-4 w-4 mr-1" />
                      <span>Home</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>FAQ</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-300">
              Get answers to common questions about our services, products, and how we can help your business succeed
            </p>
          </motion.div>

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
