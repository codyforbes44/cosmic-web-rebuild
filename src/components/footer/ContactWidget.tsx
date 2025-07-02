
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
    <div className={`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[320px] flex flex-col ${className}`}>
      <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
      <ul className="space-y-6 flex-grow flex flex-col justify-between">
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <li key={index}>
              <div className="flex items-start group">
                <IconComponent 
                  size={20} 
                  className="text-accent mr-3 mt-1 group-hover:text-brand-gold transition-colors" 
                />
                <div>
                  <p className="text-white font-medium mb-1">{item.label}</p>
                  {item.isLink ? (
                    <a 
                      href={item.href} 
                      className="text-gray-400 hover:text-brand-gold transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-400">{item.value}</p>
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
