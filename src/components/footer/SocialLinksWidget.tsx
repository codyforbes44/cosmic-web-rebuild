
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

const defaultSocialLinks: SocialLink[] = [
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
];

const SocialLinksWidget: React.FC<SocialLinksWidgetProps> = ({ 
  logo = "/lovable-uploads/64ad379d-c330-4ed5-99d5-c6c349cc01c3.png",
  description = "Providing innovative technology solutions and expert consulting services to help businesses thrive in the digital age.",
  socialLinks = defaultSocialLinks,
  className = ""
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loops
    target.src = '/lovable-uploads/64ad379d-c330-4ed5-99d5-c6c349cc01c3.png'; // Fallback image
  };

  return (
    <div className={`bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 min-h-[320px] flex flex-col ${className}`}>
      <Link to="/" className="flex items-center mb-4">
        <img 
          src={logo} 
          alt="Company Logo" 
          className="h-12"
          onError={handleImageError}
        />
      </Link>
      <p className="text-gray-400 mb-6 flex-grow">
        {description}
      </p>
      <div className="flex space-x-5 mt-auto">
        {socialLinks.map((link, index) => (
          <a 
            key={index}
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link hover:text-brand-gold bg-space-deep-blue/60 p-3 rounded-full transition-all hover:bg-space-deep-blue" 
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
