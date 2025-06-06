
import { serviceCategories, navLinks } from './navbar/constants';
import WeatherWidget from './footer/WeatherWidget';
import ContactWidget from './footer/ContactWidget';
import SocialLinksWidget from './footer/SocialLinksWidget';
import ServicesWidget from './footer/ServicesWidget';
import ScrollToTopLink from './ScrollToTopLink';

const Footer = () => {
  // Group service categories by type for better organization
  const serviceGroups = [
    {
      title: "Marketing Services",
      items: serviceCategories.filter(service => 
        service.title.includes("Marketing") || service.title.includes("Recruitment"))
    },
    {
      title: "Technology Services",
      items: serviceCategories.filter(service => 
        service.title.includes("Development") || 
        service.title.includes("Web") || 
        service.title.includes("Custom"))
    },
    {
      title: "Strategic Services",
      items: serviceCategories.filter(service => 
        !service.title.includes("Marketing") && 
        !service.title.includes("Recruitment") &&
        !service.title.includes("Development") && 
        !service.title.includes("Web") && 
        !service.title.includes("Custom"))
    }
  ];

  return (
    <footer className="relative bg-space-deep-blue pt-16 pb-8 border-t border-gray-800">
      {/* Opacity layer */}
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and Social Links (No change) */}
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
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ƷBI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <ScrollToTopLink to="/privacy" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Privacy Policy</ScrollToTopLink>
              <ScrollToTopLink to="/terms" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Terms of Service</ScrollToTopLink>
              <ScrollToTopLink to="/accessibility" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Accessibility</ScrollToTopLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
