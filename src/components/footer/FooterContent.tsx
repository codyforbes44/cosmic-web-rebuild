
import React from 'react';
import { getServiceGroups } from '@/config/navigation';
import WeatherWidget from './WeatherWidget';
import ContactWidget from './ContactWidget';
import SocialLinksWidget from './SocialLinksWidget';
import ServicesWidget from './ServicesWidget';

const FooterContent: React.FC = () => {
  // Use centralized navigation helper - single source of truth
  const serviceGroups = getServiceGroups();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Column 1: Logo, Quick Links, and Social Links */}
      <div className="sm:col-span-2 lg:col-span-1">
        <SocialLinksWidget />
      </div>
      
      {/* Column 2: Services */}
      <div>
        <ServicesWidget serviceGroups={serviceGroups} />
      </div>
      
      {/* Column 3: Contact Info */}
      <div>
        <ContactWidget />
      </div>
      
      {/* Column 4: Weather Widget */}
      <div className="sm:col-span-2 lg:col-span-1">
        <WeatherWidget />
      </div>
    </div>
  );
};

export default FooterContent;
