import React, { useState } from 'react';
import StandardPageLayout from '@/layouts/StandardPageLayout';
import { HelpCircle } from 'lucide-react';
import FAQCategories, { faqCategories } from '@/components/FAQ/FAQCategories';
import FAQTestimonials from '@/components/FAQ/FAQTestimonials';
import FAQCTA from '@/components/FAQ/FAQCTA';

// Flatten all FAQ items for SEO structured data
const allFaqItems = faqCategories.flatMap(category => 
  category.items.map(item => ({
    question: item.question,
    answer: item.answer
  }))
);

// Breadcrumbs for structured data
const breadcrumbsSchema = [
  { name: 'Home', url: 'https://3bi.io/' },
  { name: 'FAQ', url: 'https://3bi.io/faq' }
];

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <StandardPageLayout
      seo={{
        title: "Frequently Asked Questions | ƷBI",
        description: "Find answers to commonly asked questions about ƷBI's services, products, and expertise in digital marketing, AI solutions, and technology consulting.",
        keywords: "FAQ, frequently asked questions, business technology, digital marketing, ƷBI, AI solutions, web development, consulting services",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop&crop=center",
        faqs: allFaqItems,
        breadcrumbs: breadcrumbsSchema
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
