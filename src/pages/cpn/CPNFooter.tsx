
import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, ArrowUpIcon } from 'lucide-react';

const CPNFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900/80 backdrop-blur-md mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white">Carrier Partner Network</span>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              A comprehensive platform connecting trucking companies and drivers, streamlining the employment transition process.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                support@carriernet.example.com
              </li>
              <li className="text-gray-400 text-sm">
                1-800-555-0123
              </li>
              <li className="text-gray-400 text-sm">
                123 Trucking Lane,<br />
                Transport City, TX 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Carrier Partner Network. A product of ƷBI Technology Solutions. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default CPNFooter;
