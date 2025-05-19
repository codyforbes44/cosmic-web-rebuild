
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveChat from '@/components/LiveChat/LiveChat';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

// Organized FAQ items by category
const faqCategories = [
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

// Success stories for social proof
const successStories = [
  {
    quote: "The BI reporting tools from Ʒʙɪ transformed how we understand our customer data, leading to a 40% increase in marketing ROI.",
    author: "Sarah Johnson",
    position: "CMO, TechForward Inc.",
    stars: 5
  },
  {
    quote: "Implementing Ʒʙɪ's AI integration strategy helped us automate customer segmentation and personalization, increasing our conversion rate by 35%.",
    author: "Michael Chen",
    position: "Digital Director, InnovateNow",
    stars: 5
  }
];

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
      
      <div className="bg-space-dark-blue min-h-screen">
        <div className="container mx-auto px-4 py-24">
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
            
            {/* Social Proof Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">What Our Clients Say</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {successStories.map((story, index) => (
                  <Card key={index} className="bg-space-deep-blue/60 border-gray-700 shadow-xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(story.stars)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                      <p className="text-gray-300 italic mb-4">"{story.quote}"</p>
                      <div>
                        <p className="font-medium text-white">{story.author}</p>
                        <p className="text-sm text-gray-400">{story.position}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 bg-gradient-to-r from-space-dark-blue to-space-deep-blue p-8 rounded-xl border border-gray-700 shadow-xl"
            >
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our team is ready to answer any additional questions you might have about our services, products, or how we can help your business succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button 
                      className="bg-accent hover:bg-accent/90 text-white px-8 py-6 h-auto rounded-md font-medium transition-all shadow-lg hover:shadow-accent/20 hover:-translate-y-1 flex items-center"
                    >
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/get-quote">
                    <Button 
                      variant="outline"
                      className="border-accent/50 hover:bg-accent/10 text-white px-8 py-6 h-auto rounded-md font-medium transition-all shadow-lg hover:shadow-accent/20 hover:-translate-y-1 flex items-center"
                    >
                      Get a Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="mt-12 border-t border-gray-700 pt-8">
                <h3 className="text-xl font-bold text-white mb-6">Why Choose Ʒʙɪ?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: "Industry Expertise", description: "Domain knowledge across multiple sectors" },
                    { title: "Custom Solutions", description: "Tailored to your specific business needs" },
                    { title: "Proven Results", description: "Track record of driving client success" }
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="mr-3 p-2 rounded-full bg-accent/10">
                        <Check className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{benefit.title}</h4>
                        <p className="text-sm text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <LiveChat />
      <Footer />
    </>
  );
};

export default FAQ;
