
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-space-deep-blue pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">AstroVision</h3>
            <p className="text-gray-400 mb-4">
              Exploring the wonders of our universe through stunning visuals and educational content about astronomy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/planets" className="text-gray-400 hover:text-white transition-colors">Planets</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">News</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/partners" className="text-gray-400 hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Subscribe</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and discoveries.</p>
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
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} AstroVision. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</Link>
              <Link to="/accessibility" className="text-gray-500 hover:text-white transition-colors text-sm">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
