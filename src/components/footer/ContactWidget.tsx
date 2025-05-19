
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactWidgetProps {
  email?: string;
  phone?: string;
  location?: string;
  className?: string;
}

const ContactWidget = ({ 
  email = "support@3bi.io",
  phone = "+1 (817) 757-2828",
  location = "Texas, USA",
  className = ""
}: ContactWidgetProps) => {
  return (
    <div className={`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[320px] flex flex-col ${className}`}>
      <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
      <ul className="space-y-6 flex-grow flex flex-col justify-between">
        <li>
          <div className="flex items-start group">
            <Mail size={20} className="text-accent mr-3 mt-1 group-hover:text-brand-gold transition-colors" />
            <div>
              <p className="text-white font-medium mb-1">Email</p>
              <a href={`mailto:${email}`} className="text-gray-400 hover:text-brand-gold transition-colors">{email}</a>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-start group">
            <Phone size={20} className="text-accent mr-3 mt-1 group-hover:text-brand-gold transition-colors" />
            <div>
              <p className="text-white font-medium mb-1">Phone</p>
              <a href={`tel:${phone}`} className="text-gray-400 hover:text-brand-gold transition-colors">{phone}</a>
            </div>
          </div>
        </li>
        <li className="mb-auto">
          <div className="flex items-start group">
            <MapPin size={20} className="text-accent mr-3 mt-1 group-hover:text-brand-gold transition-colors" />
            <div>
              <p className="text-white font-medium mb-1">Location</p>
              <p className="text-gray-400">{location}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactWidget;
