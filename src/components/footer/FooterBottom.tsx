
import React from 'react';
import ScrollToTopLink from '../ScrollToTopLink';

const FooterBottom: React.FC = () => {
  return (
    <div className="border-t border-gray-800 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} ƷBI. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <ScrollToTopLink 
            to="/privacy" 
            className="text-gray-500 hover:text-brand-gold transition-colors text-sm"
          >
            Privacy Policy
          </ScrollToTopLink>
          <ScrollToTopLink 
            to="/terms" 
            className="text-gray-500 hover:text-brand-gold transition-colors text-sm"
          >
            Terms of Service
          </ScrollToTopLink>
          <ScrollToTopLink 
            to="/accessibility" 
            className="text-gray-500 hover:text-brand-gold transition-colors text-sm"
          >
            Accessibility
          </ScrollToTopLink>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
