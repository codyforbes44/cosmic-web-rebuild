
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
        answer: "Ʒʙɪ provides comprehensive digital solutions including Strategic Consulting, Recruitment Marketing, Digital Marketing campaigns, Social Media Management, Web & Mobile App Development, Data Analytics, AI & Machine Learning solutions, and Custom Development services for businesses across all industries."
      },
      {
        question: "What sets Ʒʙɪ apart from other technology and marketing firms?",
        answer: "Ʒʙɪ combines cutting-edge AI technology with industry expertise to deliver personalized solutions that address the unique challenges of modern businesses. We focus on data-driven strategies and proven methodologies to maximize ROI and drive sustainable growth."
      },
      {
        question: "What industries does Ʒʙɪ serve?",
        answer: "We serve clients across all industries including technology, healthcare, finance, manufacturing, retail, professional services, and more. Our solutions are designed to be adaptable to any business sector's unique needs and challenges."
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
        question: "What is Recruitment Marketing and how does it help businesses?",
        answer: "Recruitment Marketing is our specialized service for attracting and converting qualified candidates across all industries. We create multi-channel campaigns across social media, search engines, job boards, and industry websites, develop candidate personas, and optimize conversion processes to reduce cost-per-hire by up to 40% while improving candidate quality and retention."
      },
      {
        question: "How do your AI solutions benefit businesses?",
        answer: "Our AI solutions include predictive analytics, process automation, customer behavior analysis, and intelligent chatbots. These technologies help reduce operational costs, improve efficiency, enhance customer satisfaction, and provide valuable insights for strategic decision-making across various business functions."
      },
      {
        question: "What does Strategic Consulting include?",
        answer: "Our Strategic Consulting service provides technology roadmapping, digital transformation planning, system integration strategies, and ROI analysis. We help align your technology investments with business goals to maximize competitive advantage and operational efficiency."
      },
      {
        question: "How do you measure the success of recruitment marketing campaigns?",
        answer: "We track key metrics including cost-per-hire, application quality scores, conversion rates from application to hire, employee retention rates, and overall ROI. Our clients typically see 200-300% increases in qualified applications and 25-40% improvements in retention rates."
      },
      {
        question: "What makes your web development different?",
        answer: "We develop responsive websites and applications specifically designed for your industry needs, including customer portals, management systems, and analytics dashboards. Our solutions are optimized for mobile use and seamlessly integrate with your existing business processes."
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
        answer: "Our AI Chatbots are intelligent conversational interfaces that can handle customer inquiries, lead qualification, and support requests 24/7. They integrate with your existing systems and can be customized for industry-specific scenarios like order status updates, appointment scheduling, and customer assistance."
      },
      {
        question: "What does the Analytics Platform include?",
        answer: "Our Analytics Platform provides real-time dashboards, predictive analytics, performance tracking, and comprehensive reporting tools. It includes customer behavior metrics, marketing analytics, operational efficiency reports, and customizable KPI tracking for businesses across all sectors."
      },
      {
        question: "How does the Voice AI Assistant work?",
        answer: "Our Voice AI Assistant enables hands-free interaction for employees and customers, allowing voice commands for status updates, information retrieval, and communication while maintaining productivity and accessibility. It integrates with existing business systems and applications."
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
