
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import SEO from "@/components/SEO";
import FAQHeader from "@/components/faq/FAQHeader";
import FAQSearch from "@/components/faq/FAQSearch";
import CategoryTabs from "@/components/faq/CategoryTabs";
import SearchResults from "@/components/faq/SearchResults";
import ContactCTA from "@/components/faq/ContactCTA";
import PopularSolutions from "@/components/faq/PopularSolutions";
import faqData from "@/components/faq/faqData";
import { FAQData } from "@/components/faq/types";

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('services');
  const navigate = useNavigate();
  const location = useLocation();

  // Set active category based on URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && Object.keys(faqData).includes(category)) {
      setActiveCategory(category);
    }
  }, [location]);

  // Simplified search functionality
  const filteredFAQs = Object.entries(faqData).reduce((acc, [category, questions]) => {
    const filteredQuestions = questions.filter(
      (item) => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredQuestions.length > 0) {
      acc[category] = filteredQuestions;
    }
    
    return acc;
  }, {} as FAQData);

  return (
    <>
      <SEO 
        title="Frequently Asked Questions | ƷBI Technology Solutions" 
        description="Get answers to frequently asked questions about ƷBI's business technology consulting services, process, pricing, technology expertise, and security practices."
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
        type="website"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Enhanced Header with CTAs */}
            <FAQHeader />
            
            {/* Search Bar */}
            <FAQSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            
            {/* Content */}
            <div className="max-w-4xl mx-auto space-card p-8 rounded-xl">
              {searchQuery ? (
                <SearchResults 
                  searchQuery={searchQuery} 
                  filteredFAQs={filteredFAQs} 
                  setSearchQuery={setSearchQuery} 
                />
              ) : (
                <CategoryTabs 
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  faqData={faqData}
                  navigate={navigate}
                />
              )}
            </div>
            
            {/* Enhanced Contact CTA with Social Proof */}
            <ContactCTA />
            
            {/* Enhanced Popular Topics with Value Props */}
            <PopularSolutions />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
