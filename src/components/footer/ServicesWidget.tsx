
import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ServiceGroup {
  title: string;
  items: Array<{
    title: string;
    href: string;
    color: string;
  }>;
}

interface ServicesWidgetProps {
  serviceGroups: ServiceGroup[];
  className?: string;
}

const ServicesWidget = ({ serviceGroups, className = "" }: ServicesWidgetProps) => {
  return (
    <div className={`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[320px] flex flex-col ${className}`}>
      <h3 className="text-xl font-semibold mb-4 text-white">Our Services</h3>
      <Accordion type="single" collapsible={false} defaultValue="Marketing Services" className="w-full flex-grow">
        {serviceGroups.map((group) => (
          <AccordionItem key={group.title} value={group.title} className="border-gray-700">
            <AccordionTrigger className="py-2 text-white hover:no-underline font-medium">
              {group.title}
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <ul className="space-y-2.5 pl-2">
                {group.items.map((service) => (
                  <li key={service.href}>
                    <Link 
                      to={service.href} 
                      className="footer-link hover:text-[color:var(--color)] flex items-center" 
                      style={{
                        "--color": service.color
                      } as React.CSSProperties}
                    >
                      <span className="w-1.5 h-1.5 bg-brand-gold/70 rounded-full mr-2"></span>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ServicesWidget;
