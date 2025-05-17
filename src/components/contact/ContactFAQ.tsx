
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ContactFAQ = () => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4 max-w-3xl mx-auto">
        <AccordionItem value="item-1" className="bg-gray-800/70 rounded-lg border border-gray-700">
          <AccordionTrigger className="px-5 py-4 text-lg font-medium hover:no-underline">
            What services does ƷBI offer?
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4 pt-1 text-gray-300">
            ƷBI offers a comprehensive range of business services including business consulting, data analytics, market research, strategic planning, digital transformation, and much more. We customize our services to meet your specific business needs.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="bg-gray-800/70 rounded-lg border border-gray-700">
          <AccordionTrigger className="px-5 py-4 text-lg font-medium hover:no-underline">
            How quickly can I expect a response after contacting you?
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4 pt-1 text-gray-300">
            We strive to respond to all inquiries within 24 business hours. For urgent matters, please indicate this in your message, and we'll prioritize your request.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="bg-gray-800/70 rounded-lg border border-gray-700">
          <AccordionTrigger className="px-5 py-4 text-lg font-medium hover:no-underline">
            Do you work with small businesses or only large corporations?
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4 pt-1 text-gray-300">
            We work with businesses of all sizes, from startups and small businesses to large enterprises. Our services are scalable and can be tailored to suit the needs and budget of your organization.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="bg-gray-800/70 rounded-lg border border-gray-700">
          <AccordionTrigger className="px-5 py-4 text-lg font-medium hover:no-underline">
            Can you help with international business projects?
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4 pt-1 text-gray-300">
            Yes, we have experience working with international clients and can assist with global business strategies, market entry plans, and cross-border partnerships. Our team understands the complexities of international business operations.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="bg-gray-800/70 rounded-lg border border-gray-700">
          <AccordionTrigger className="px-5 py-4 text-lg font-medium hover:no-underline">
            How do I request a quote for your services?
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-4 pt-1 text-gray-300">
            You can request a quote by filling out our contact form on this page, visiting our Get Quote page, or directly emailing us at info@zbi.com. Please provide details about your project so we can provide an accurate estimate.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ContactFAQ;
