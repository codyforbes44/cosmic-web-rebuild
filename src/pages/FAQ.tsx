
import React, { useState } from 'react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import { HelpCircle } from 'lucide-react';

// Import refactored components
import FAQCategories from '@/components/FAQ/FAQCategories';
import FAQTestimonials from '@/components/FAQ/FAQTestimonials';
import FAQCTA from '@/components/FAQ/FAQCTA';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <StandardPageLayout
      seo={{
        title: "Frequently Asked Questions | Ʒʙɪ",
        description: "Find answers to commonly asked questions about Ʒʙɪ's services, products, and expertise in digital marketing and technology solutions.",
        keywords: "FAQ, frequently asked questions, business technology, digital marketing, Ʒʙɪ, technology solutions",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop&crop=center"
      }}
      breadcrumb={{ label: "FAQ" }}
      header={{
        title: "Frequently Asked Questions",
        description: "Get answers to common questions about our services, products, and how we can help your business succeed",
        icon: HelpCircle
      }}
    >
      <div className="max-w-4xl mx-auto">
        <FAQCategories activeTab={activeTab} setActiveTab={setActiveTab} />
        <FAQTestimonials />
        <FAQCTA />
      </div>
    </StandardPageLayout>
  );
};

export default FAQ;
