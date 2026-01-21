import React from 'react';
import { getServiceGroups } from '@/config/navigation';
import WeatherWidget from './WeatherWidget';
import ContactWidget from './ContactWidget';
import SocialLinksWidget from './SocialLinksWidget';
import ServicesWidget from './ServicesWidget';

const FooterContent: React.FC = () => {
  const serviceGroups = getServiceGroups();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
      {/* Column 1: Logo, Quick Links, and Social Links */}
      <div className="md:col-span-1">
        <SocialLinksWidget />
      </div>
      
      {/* Column 2: Services */}
      <div className="md:col-span-1">
        <ServicesWidget serviceGroups={serviceGroups} />
      </div>
      
      {/* Column 3: Contact Info */}
      <div className="md:col-span-1">
        <ContactWidget />
      </div>
      
      {/* Column 4: Weather Widget */}
      <div className="md:col-span-1">
        <WeatherWidget />
      </div>
    </div>
  );
};

export default FooterContent;
