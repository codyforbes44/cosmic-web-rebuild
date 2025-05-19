
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface SocialLinksWidgetProps {
  logo?: string;
  description?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

const SocialLinksWidget = ({ 
  logo = "/lovable-uploads/64ad379d-c330-4ed5-99d5-c6c349cc01c3.png",
  description = "Providing innovative technology solutions and expert consulting services to help businesses thrive in the digital age.",
  socialLinks = [
    { 
      icon: <Facebook size={20} />, 
      href: "https://www.facebook.com/3bi.io",
      label: "Facebook" 
    },
    { 
      icon: <Twitter size={20} />, 
      href: "https://x.com/3bi_io",
      label: "Twitter" 
    },
    { 
      icon: <Linkedin size={20} />, 
      href: "https://www.linkedin.com/company/3biio",
      label: "LinkedIn" 
    }
  ],
  className = ""
}: SocialLinksWidgetProps) => {
  return (
    <div className={`bg-transparent backdrop-blur-sm p-4 rounded-lg ${className}`}>
      <h3 className="text-xl font-bold mb-4 text-white">
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Company Logo" 
            className="h-12" 
          />
        </Link>
      </h3>
      <p className="text-gray-400 mb-4">
        {description}
      </p>
      <div className="flex space-x-4">
        {socialLinks.map((link, index) => (
          <a 
            key={index}
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link" 
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksWidget;
