
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LiveChat from '@/components/LiveChat/LiveChat';

const FAQ = () => {
  const faqItems = [
    {
      question: "What services does Ʒʙɪ offer?",
      answer: "Ʒʙɪ provides a comprehensive suite of digital marketing and technology solutions including digital marketing campaigns, business intelligence reporting, workflow optimization, AI integration, and technology migration services."
    },
    {
      question: "How can Ʒʙɪ help improve my marketing strategy?",
      answer: "We analyze your current marketing efforts and develop data-driven strategies tailored to your business goals. This includes optimizing digital campaigns, enhancing brand visibility, and implementing targeted advertising techniques to effectively reach your ideal audience."
    },
    {
      question: "What is Business Intelligence (BI) reporting?",
      answer: "BI reporting involves collecting, analyzing, and visualizing data related to marketing performance, customer behavior, and industry trends. This enables organizations to make informed strategic decisions, optimize marketing approaches, and identify growth opportunities."
    },
    {
      question: "What industries does Ʒʙɪ serve?",
      answer: "We serve clients across diverse industries including technology, healthcare, finance, manufacturing, retail, and more. Our marketing and technology solutions are tailored to meet the unique requirements of each sector."
    },
    {
      question: "How does Ʒʙɪ integrate AI into business processes?",
      answer: "We implement AI technologies across multiple business areas including customer segmentation, predictive analytics, automated content personalization, and interactive chatbots to enhance customer engagement and optimize operational efficiency."
    },
    {
      question: "What products does Ʒʙɪ offer?",
      answer: "We offer three main product solutions: 3BI Connect (a comprehensive CRM system), Carrier Partner Network (a logistics management platform), and TruckOnboard (an advanced fleet management solution)."
    },
    {
      question: "How can I get in touch with Ʒʙɪ?",
      answer: "You can reach us via phone at (817) 757-2828, email at support@3bi.io, through our website contact form, or via our social media channels on X (formerly Twitter) and LinkedIn."
    },
    {
      question: "What sets Ʒʙɪ apart from other marketing and technology firms?",
      answer: "Ʒʙɪ distinguishes itself through an innovative approach, deep expertise in data-driven strategies, and a commitment to leveraging cutting-edge technologies. Our personalized service and tailored solutions ensure we address the specific challenges and goals of each client effectively."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Ʒʙɪ</title>
        <meta name="description" content="Find answers to commonly asked questions about Ʒʙɪ's services, products, and expertise in digital marketing and technology solutions." />
      </Helmet>
      <SEO
        title="Frequently Asked Questions | Ʒʙɪ"
        description="Find answers to commonly asked questions about Ʒʙɪ's services, products, and expertise in digital marketing and technology solutions."
        url="/faq"
      />
      <Navbar />
      <div className="bg-space-dark-blue min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Get answers to common questions about our services, products, and how we can help your business succeed
          </p>

          <div className="max-w-3xl mx-auto bg-space-deep-blue p-6 rounded-xl border border-gray-700 shadow-xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border border-gray-700 rounded-lg overflow-hidden mb-4 bg-space-dark-blue/50 shadow-md"
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
          </div>

          <div className="mt-16 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-8">
              Our team is ready to answer any additional questions you might have about our services, products, or how we can help your business succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-md font-medium transition-all shadow-lg hover:shadow-accent/20 hover:-translate-y-1"
              >
                Contact Us
              </a>
              <a 
                href="/get-quote" 
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 rounded-md font-medium transition-all shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-1"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </div>
      <LiveChat />
      <Footer />
    </>
  );
};

export default FAQ;
