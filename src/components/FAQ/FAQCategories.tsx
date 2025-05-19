
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

// Organized FAQ items by category
export const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: "🔍",
    items: [
      {
        question: "What services does Ʒʙɪ offer?",
        answer: "Ʒʙɪ provides a comprehensive suite of digital marketing and technology solutions including digital marketing campaigns, business intelligence reporting, workflow optimization, AI integration, and technology migration services."
      },
      {
        question: "What sets Ʒʙɪ apart from other marketing and technology firms?",
        answer: "Ʒʙɪ distinguishes itself through an innovative approach, deep expertise in data-driven strategies, and a commitment to leveraging cutting-edge technologies. Our personalized service and tailored solutions ensure we address the specific challenges and goals of each client effectively."
      },
      {
        question: "What industries does Ʒʙɪ serve?",
        answer: "We serve clients across diverse industries including technology, healthcare, finance, manufacturing, retail, and more. Our marketing and technology solutions are tailored to meet the unique requirements of each sector."
      },
      {
        question: "How can I get in touch with Ʒʙɪ?",
        answer: "You can reach us via phone at (817) 757-2828, email at support@3bi.io, through our website contact form, or via our social media channels on X (formerly Twitter) and LinkedIn."
      }
    ]
  },
  {
    id: "services",
    name: "Services",
    icon: "⚙️",
    items: [
      {
        question: "How can Ʒʙɪ help improve my marketing strategy?",
        answer: "We analyze your current marketing efforts and develop data-driven strategies tailored to your business goals. This includes optimizing digital campaigns, enhancing brand visibility, and implementing targeted advertising techniques to effectively reach your ideal audience."
      },
      {
        question: "What is Business Intelligence (BI) reporting?",
        answer: "BI reporting involves collecting, analyzing, and visualizing data related to marketing performance, customer behavior, and industry trends. This enables organizations to make informed strategic decisions, optimize marketing approaches, and identify growth opportunities."
      },
      {
        question: "How does Ʒʙɪ integrate AI into business processes?",
        answer: "We implement AI technologies across multiple business areas including customer segmentation, predictive analytics, automated content personalization, and interactive chatbots to enhance customer engagement and optimize operational efficiency."
      }
    ]
  },
  {
    id: "products",
    name: "Products",
    icon: "🧰",
    items: [
      {
        question: "What products does Ʒʙɪ offer?",
        answer: "We offer three main product solutions: 3BI Connect (a comprehensive CRM system), Carrier Partner Network (a logistics management platform), and TruckOnboard (an advanced fleet management solution)."
      },
      {
        question: "How do Ʒʙɪ products integrate with existing systems?",
        answer: "Our products are designed with industry-standard APIs and flexible integration capabilities. We provide comprehensive onboarding and technical support to ensure seamless integration with your existing technology stack."
      },
      {
        question: "Are Ʒʙɪ products customizable to my specific business needs?",
        answer: "Yes, all our products offer customization options to align with your specific business requirements. Our team works closely with you to configure the perfect solution that addresses your unique challenges and workflows."
      }
    ]
  }
];

interface FAQCategoriesProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FAQCategories: React.FC<FAQCategoriesProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs 
      defaultValue="general" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="mb-12"
    >
      <TabsList className="w-full mb-8 bg-space-deep-blue/50 overflow-x-auto flex">
        {faqCategories.map((category) => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            className="text-base py-3 flex-1 data-[state=active]:bg-accent/10 data-[state=active]:text-accent"
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {faqCategories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-space-deep-blue/60 p-6 rounded-xl border border-gray-700 shadow-xl"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {category.items.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`${category.id}-item-${index}`} 
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-space-dark-blue/60 shadow-md hover:border-accent/30 transition-colors duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:text-accent text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-6 bg-space-deep-blue/30 text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FAQCategories;
