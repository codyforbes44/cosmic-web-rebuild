
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { serviceCategories, navLinks } from './navbar/constants';

const Footer = () => {
  // Group service categories by type for better organization
  const serviceGroups = {
    marketing: serviceCategories.filter(service => 
      service.title.includes("Marketing") || service.title.includes("Recruitment")),
    technology: serviceCategories.filter(service => 
      service.title.includes("Development") || 
      service.title.includes("Web") || 
      service.title.includes("Custom"))
  };
  
  // Get remaining services that don't fit into the above categories
  const otherServices = serviceCategories.filter(service => 
    !serviceGroups.marketing.includes(service) && 
    !serviceGroups.technology.includes(service));

  return (
    <footer className="relative bg-space-deep-blue pt-16 pb-8 border-t border-gray-800">
      {/* Opacity layer */}
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/64ad379d-c330-4ed5-99d5-c6c349cc01c3.png" 
                  alt="3BI Logo" 
                  className="h-12" 
                />
              </Link>
            </h3>
            <p className="text-gray-400 mb-4">
              Providing innovative technology solutions and expert consulting services to help businesses thrive in the digital age.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/3bi.io" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/3bi_io" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/3biio" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 col-span-1 md:col-span-2">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-medium mb-4 text-white">Marketing Services</h3>
              <ul className="space-y-2">
                {serviceGroups.marketing.map(service => (
                  <li key={service.href}>
                    <Link to={service.href} className="footer-link hover:text-[color:var(--color)]" style={{
                      "--color": service.color
                    } as React.CSSProperties}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-medium mb-4 mt-6 text-white">Technology Services</h3>
              <ul className="space-y-2">
                {serviceGroups.technology.map(service => (
                  <li key={service.href}>
                    <Link to={service.href} className="footer-link hover:text-[color:var(--color)]" style={{
                      "--color": service.color
                    } as React.CSSProperties}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-white">Strategic Services</h3>
              <ul className="space-y-2">
                {otherServices.map(service => (
                  <li key={service.href}>
                    <Link to={service.href} className="footer-link hover:text-[color:var(--color)]" style={{
                      "--color": service.color
                    } as React.CSSProperties}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start">
                  <Mail size={18} className="text-accent mr-3 mt-1" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:support@3bi.io" className="text-gray-400 hover:text-accent transition-colors">support@3bi.io</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start">
                  <Phone size={18} className="text-accent mr-3 mt-1" />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a href="tel:+18177572828" className="text-gray-400 hover:text-accent transition-colors">+1 (817) 757-2828</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start">
                  <MapPin size={18} className="text-accent mr-3 mt-1" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-400">Texas, USA</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest industry trends and company updates.</p>
            <form className="flex flex-col space-y-2">
              <input type="email" placeholder="Your email address" className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent" />
              <button type="submit" className="bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ƷBI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Terms of Service</Link>
              <Link to="/accessibility" className="text-gray-500 hover:text-brand-gold transition-colors text-sm">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
