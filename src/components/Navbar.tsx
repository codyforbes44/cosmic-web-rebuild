
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const serviceCategories = [
  {
    title: "Strategic Consulting",
    description: "Technology strategy development and roadmap planning aligned with business objectives.",
    href: "/services?service=strategy",
    color: "#7C3AED"
  },
  {
    title: "Digital Transformation",
    description: "End-to-end digital transformation services to modernize legacy systems.",
    href: "/services?service=digital",
    color: "#2563EB"
  },
  {
    title: "Custom Software",
    description: "Tailored software solutions designed for your unique business challenges.",
    href: "/services?service=custom",
    color: "#E11D48"
  },
  {
    title: "Web & Mobile Apps",
    description: "Responsive, user-friendly applications for web and mobile platforms.",
    href: "/services?service=web",
    color: "#F59E0B"
  },
  {
    title: "Data Analytics",
    description: "Transform your data into actionable insights with advanced analytics.",
    href: "/services?service=analytics",
    color: "#059669"
  },
  {
    title: "AI & Machine Learning",
    description: "Leverage artificial intelligence to optimize operations and gain competitive advantages.",
    href: "/services?service=ai",
    color: "#8B5CF6"
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav when route changes
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Handle scroll events for navbar appearance
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Handle escape key for mobile nav
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio', disabled: true },
    { name: 'Packages', path: '/packages' },
    { name: 'Business Insights', path: '/news' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/services') {
      return location.pathname === path ? 'active' : '';
    }
    return location.pathname === path ? 'active' : '';
  };

  const isServicesActive = location.pathname === '/services';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-space-dark-blue/90 backdrop-blur-md py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 z-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png" 
              alt="ƷBI Logo" 
              className="h-9 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Home and other links */}
          {navLinks.slice(0, 1).map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link 
                to={link.path} 
                className={`nav-link ${isActive(link.path)}`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div 
                    className="h-0.5 bg-accent mt-1" 
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}

          {/* Services Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <NavigationMenu className="z-50">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`nav-link bg-transparent ${isServicesActive ? 'active' : ''}`}>
                    Services
                    {isServicesActive && (
                      <motion.div 
                        className="h-0.5 bg-accent mt-1 absolute bottom-0 left-0 right-0" 
                        layoutId="navbar-indicator"
                      />
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-gray-800 border border-gray-700">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {serviceCategories.map((service) => (
                        <li key={service.href}>
                          <Link
                            to={service.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-700 focus:bg-gray-700"
                            )}
                          >
                            <div className="text-sm font-medium leading-none" style={{ color: service.color }}>
                              {service.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                              {service.description}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>

          {/* Remaining links */}
          {navLinks.slice(1).map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (index + 2) * 0.1 }}
            >
              {link.disabled ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="nav-link text-gray-500 cursor-not-allowed flex items-center">
                        {link.name}
                        <Ban size={16} className="ml-1 opacity-70" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming soon</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Link 
                  to={link.path} 
                  className={`nav-link ${isActive(link.path)}`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div 
                      className="h-0.5 bg-accent mt-1" 
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              )}
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Link to="/get-quote">
              <Button className="bg-accent hover:bg-accent/80 text-white">Get a Quote</Button>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-white p-1 z-20" 
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-menu"
        >
          {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div 
            id="mobile-menu"
            className="md:hidden bg-space-deep-blue/95 backdrop-blur-lg fixed top-0 left-0 w-full h-full pt-20 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container mx-auto px-4 flex flex-col space-y-6">
              {/* Regular links */}
              {navLinks.slice(0, 1).map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    className={`nav-link text-xl ${isActive(link.path)}`}
                    onClick={() => setIsMobileNavOpen(false)}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Services with dropdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="nav-link text-xl">Services</div>
                <div className="pl-4 mt-2 space-y-2">
                  {serviceCategories.map((service, idx) => (
                    <Link 
                      key={service.href}
                      to={service.href} 
                      className="block text-gray-300 hover:text-white py-1"
                      onClick={() => setIsMobileNavOpen(false)}
                      style={{ color: service.color }}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Remaining links */}
              {navLinks.slice(1).map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index + 2) * 0.1 }}
                >
                  {link.disabled ? (
                    <span className="nav-link text-xl text-gray-500 cursor-not-allowed flex items-center">
                      {link.name}
                      <Ban size={18} className="ml-2 opacity-70" />
                    </span>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`nav-link text-xl ${isActive(link.path)}`}
                      onClick={() => setIsMobileNavOpen(false)}
                      aria-current={isActive(link.path) ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Link to="/get-quote" onClick={() => setIsMobileNavOpen(false)}>
                  <Button className="btn-primary mt-4 w-full">Get a Quote</Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
