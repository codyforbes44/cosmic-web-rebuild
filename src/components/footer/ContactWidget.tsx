
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  isLink?: boolean;
}

interface ContactWidgetProps {
  email?: string;
  phone?: string;
  location?: string;
  className?: string;
}

const ContactWidget: React.FC<ContactWidgetProps> = ({ 
  email = "support@3bi.io",
  phone = "+1 (817) 757-2828",
  location = "Texas, USA",
  className = ""
}) => {
  const contactItems: ContactItem[] = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      isLink: true
    },
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
      isLink: true
    },
    {
      icon: MapPin,
      label: "Location",
      value: location,
      isLink: false
    }
  ];

  return (
    <div className={`bg-card/40 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-accent/20 h-full flex flex-col ${className}`}>
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">Contact Us</h3>
      <ul className="space-y-3 md:space-y-4 flex-grow">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <li key={index}>
              <div className="flex items-start group">
                <IconComponent 
                  size={18} 
                  className="text-accent mr-2 md:mr-3 mt-1 group-hover:text-accent/80 transition-colors flex-shrink-0" 
                />
                <div className="min-w-0">
                  <p className="text-foreground text-sm md:text-base font-medium mb-0.5 md:mb-1">{item.label}</p>
                  {item.isLink ? (
                    <a 
                      href={item.href} 
                      className="text-muted-foreground hover:text-accent transition-colors text-xs md:text-sm break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-xs md:text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactWidget;
