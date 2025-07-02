
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
        answer: "Ʒʙɪ provides comprehensive digital solutions including Strategic Consulting, Recruitment Marketing (specialized for trucking companies), Digital Marketing campaigns, Social Media Management, Web & Mobile App Development, Data Analytics, AI & Machine Learning solutions, and Custom Development services."
      },
      {
        question: "What sets Ʒʙɪ apart from other technology and marketing firms?",
        answer: "Ʒʙɪ specializes in the transportation and logistics industry with deep expertise in driver recruitment and retention. We combine cutting-edge AI technology with industry-specific knowledge to deliver personalized solutions that address the unique challenges of trucking companies and logistics providers."
      },
      {
        question: "What industries does Ʒʙɪ primarily serve?",
        answer: "While we serve clients across various industries, we specialize in transportation, logistics, and trucking companies. Our recruitment marketing services are specifically designed for driver recruitment and retention in the commercial transportation sector."
      },
      {
        question: "How can I get in touch with Ʒʙɪ?",
        answer: "You can reach us via phone at (817) 757-2828, email at support@3bi.io, through our website contact form, or schedule a consultation through our demo booking system. We also maintain active social media presence on LinkedIn and other professional platforms."
      }
    ]
  },
  {
    id: "services",
    name: "Services",
    icon: "⚙️",
    items: [
      {
        question: "What is Recruitment Marketing and how does it help trucking companies?",
        answer: "Recruitment Marketing is our specialized service for attracting and converting qualified truck drivers. We create multi-channel campaigns across social media, search engines, and job boards, develop driver personas, and optimize conversion processes to reduce cost-per-hire by up to 40% while improving driver quality and retention."
      },
      {
        question: "How do your AI solutions benefit transportation companies?",
        answer: "Our AI solutions include predictive maintenance systems, route optimization, demand forecasting, and automated customer service chatbots. These technologies help reduce downtime, lower operational costs, improve efficiency, and enhance customer satisfaction in the transportation industry."
      },
      {
        question: "What does Strategic Consulting include?",
        answer: "Our Strategic Consulting service provides technology roadmapping, digital transformation planning, system integration strategies, and ROI analysis. We help align your technology investments with business goals to maximize competitive advantage and operational efficiency."
      },
      {
        question: "How do you measure the success of recruitment marketing campaigns?",
        answer: "We track key metrics including cost-per-hire, application quality scores, conversion rates from application to hire, driver retention rates, and overall ROI. Our clients typically see 200-300% increases in qualified applications and 25-40% improvements in retention rates."
      },
      {
        question: "What makes your web development different for logistics companies?",
        answer: "We develop responsive websites and mobile applications specifically designed for the logistics industry, including driver portals, load tracking systems, and customer dashboards. Our solutions are optimized for mobile use by drivers and dispatchers in the field."
      },
      {
        question: "Do you provide ongoing support and maintenance?",
        answer: "Yes, we offer comprehensive ongoing support including system monitoring, regular updates, performance optimization, and technical support. Our support packages are tailored to ensure your systems run smoothly and adapt to changing business needs."
      }
    ]
  },
  {
    id: "products",
    name: "Products",
    icon: "🧰",
    items: [
      {
        question: "What are AI Chatbots and how do they help my business?",
        answer: "Our AI Chatbots are intelligent conversational interfaces that can handle customer inquiries, driver support, and lead qualification 24/7. They integrate with your existing systems and can be customized for logistics-specific scenarios like load status updates and driver assistance."
      },
      {
        question: "What does the Analytics Platform include?",
        answer: "Our Analytics Platform provides real-time dashboards, predictive analytics, performance tracking, and comprehensive reporting tools. It includes driver performance metrics, recruitment analytics, operational efficiency reports, and customizable KPI tracking for transportation companies."
      },
      {
        question: "How does the Voice AI Assistant work?",
        answer: "Our Voice AI Assistant enables hands-free interaction for drivers and dispatchers, allowing voice commands for status updates, route information, and communication while maintaining safety compliance. It integrates with existing fleet management systems and mobile applications."
      },
      {
        question: "Can these products integrate with our existing systems?",
        answer: "Yes, all our products are designed with industry-standard APIs and flexible integration capabilities. We provide comprehensive onboarding support and work closely with your IT team to ensure seamless integration with your current technology stack."
      },
      {
        question: "What kind of customization is available?",
        answer: "Our products offer extensive customization options including custom workflows, branded interfaces, specific industry terminology, integration with your existing databases, and tailored reporting features to match your unique business requirements."
      },
      {
        question: "Do you offer training and support for your products?",
        answer: "Yes, we provide comprehensive training programs for your team, detailed documentation, video tutorials, and ongoing technical support. Our training covers both end-user functionality and administrative features to ensure successful adoption."
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
