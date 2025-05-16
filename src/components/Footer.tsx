
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-space-deep-blue pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white"><span className="text-accent">Ʒ</span>BI</h3>
            <p className="text-gray-400 mb-4">
              Providing innovative technology solutions and expert consulting services to help businesses thrive in the digital age.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="footer-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="footer-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer-link" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="footer-link">Technology Solutions</Link></li>
              <li><Link to="/portfolio" className="footer-link">Portfolio</Link></li>
              <li><Link to="/news" className="footer-link">Industry News</Link></li>
              <li><Link to="/partners" className="footer-link">Our Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="footer-link">Our Mission</Link></li>
              <li><Link to="/team" className="footer-link">Our Team</Link></li>
              <li><Link to="/partners" className="footer-link">Partners</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest industry trends and company updates.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent"
              />
              <button 
                type="submit" 
                className="bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-md transition-colors"
              >
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
