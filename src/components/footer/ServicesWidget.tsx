
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollToTopLink from '../ScrollToTopLink';

interface ServiceItem {
  title: string;
  href: string;
  color?: string;
}

interface ServiceGroup {
  title: string;
  items: ServiceItem[];
}

interface ServicesWidgetProps {
  serviceGroups: ServiceGroup[];
  defaultOpenGroup?: string;
  className?: string;
}

const ServicesWidget: React.FC<ServicesWidgetProps> = ({ 
  serviceGroups, 
  defaultOpenGroup = "Marketing Services",
  className = "" 
}) => {
  return (
    <div className={`bg-card/40 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-accent/20 h-full flex flex-col ${className}`}>
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">Our Services</h3>
      <Accordion 
        type="single" 
        collapsible 
        defaultValue={defaultOpenGroup} 
        className="w-full flex-grow"
      >
        {serviceGroups.map((group) => (
          <AccordionItem key={group.title} value={group.title} className="border-border/50">
            <AccordionTrigger className="py-2 text-foreground hover:no-underline font-medium text-sm md:text-base">
              {group.title}
            </AccordionTrigger>
            <AccordionContent className="pt-1 md:pt-2">
              <ul className="space-y-2 md:space-y-2.5 pl-2">
                {group.items.map((service) => (
                  <li key={service.href}>
                    <ScrollToTopLink 
                      to={service.href} 
                      className="text-muted-foreground hover:text-accent flex items-center text-xs md:text-sm transition-colors" 
                    >
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-accent/70 rounded-full mr-2"></span>
                      {service.title}
                    </ScrollToTopLink>
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
