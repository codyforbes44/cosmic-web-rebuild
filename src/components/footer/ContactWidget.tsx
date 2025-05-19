
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
    <div className={`bg-space-deep-blue/40 backdrop-blur-sm p-4 rounded-lg border border-brand-gold/20 ${className}`}>
      <h3 className="text-lg font-medium mb-4 text-white">Contact Us</h3>
      <ul className="space-y-4">
        <li>
          <div className="flex items-start">
            <Mail size={18} className="text-accent mr-3 mt-1" />
            <div>
              <p className="text-white font-medium">Email</p>
              <a href={`mailto:${email}`} className="text-gray-400 hover:text-accent transition-colors">{email}</a>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-start">
            <Phone size={18} className="text-accent mr-3 mt-1" />
            <div>
              <p className="text-white font-medium">Phone</p>
              <a href={`tel:${phone}`} className="text-gray-400 hover:text-accent transition-colors">{phone}</a>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-start">
            <MapPin size={18} className="text-accent mr-3 mt-1" />
            <div>
              <p className="text-white font-medium">Location</p>
              <p className="text-gray-400">{location}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactWidget;
