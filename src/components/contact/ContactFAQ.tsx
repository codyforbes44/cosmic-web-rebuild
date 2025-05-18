
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ContactFAQ = () => {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-gray-700">
          <AccordionTrigger className="text-white hover:text-accent text-lg">
            How quickly can you respond to my inquiry?
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            We typically respond to all inquiries within 24 business hours. For urgent matters, 
            please indicate so in your message and we'll prioritize your request.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-gray-700">
          <AccordionTrigger className="text-white hover:text-accent text-lg">
            Do you offer free consultations?
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            Yes, we offer an initial 30-minute consultation free of charge. This gives us a chance 
            to understand your needs and determine if we're a good fit for your project.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-gray-700">
          <AccordionTrigger className="text-white hover:text-accent text-lg">
            What information should I prepare before contacting you?
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            It helps to have a brief description of your project or challenge, your timeline, 
            budget considerations, and any specific goals or requirements. The more information 
            you provide, the more tailored our response can be.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-gray-700">
          <AccordionTrigger className="text-white hover:text-accent text-lg">
            Do you work with clients internationally?
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            Absolutely! We work with clients around the globe. Our team is experienced in 
            remote collaboration and we have processes in place to ensure smooth communication 
            across different time zones.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border-gray-700">
          <AccordionTrigger className="text-white hover:text-accent text-lg">
            How can I request a quote for my project?
          </AccordionTrigger>
          <AccordionContent className="text-gray-300">
            You can request a quote by filling out our contact form, emailing us directly, or 
            visiting our dedicated "Get Quote" page for a more detailed quote request form.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ContactFAQ;
