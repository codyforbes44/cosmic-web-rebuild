
import React from 'react';
import { serviceCategories } from '../navbar/constants';
import WeatherWidget from './WeatherWidget';
import ContactWidget from './ContactWidget';
import SocialLinksWidget from './SocialLinksWidget';
import ServicesWidget from './ServicesWidget';

const FooterContent: React.FC = () => {
  // Group service categories by type for better organization
  const serviceGroups = [
    {
      title: "Marketing Services",
      items: serviceCategories.filter(service => 
        service.title.includes("Marketing") || service.title.includes("Social"))
    },
    {
      title: "Technology Services",
      items: serviceCategories.filter(service => 
        service.title.includes("Development") || 
        service.title.includes("Web") || 
        service.title.includes("AI"))
    },
    {
      title: "Strategic Services",
      items: serviceCategories.filter(service => 
        service.title.includes("Strategy") || service.title.includes("Consulting"))
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      {/* Column 1: Logo and Social Links */}
      <div>
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
      <div>
        <WeatherWidget />
      </div>
    </div>
  );
};

export default FooterContent;
