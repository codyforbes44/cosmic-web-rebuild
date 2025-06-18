
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DesktopNavigation from "./navbar/DesktopNavigation";
import MobileNavigation from "./navbar/MobileNavigation";
import UserMenu from "./auth/UserMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function to determine if a path is active
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  // Check if services section is active
  const isServicesActive = location.pathname === '/services' || location.search.includes('service=');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-space-dark-blue/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent md:bg-transparent bg-space-dark-blue"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500">
            <img 
              src="/lovable-uploads/64ad379d-c330-4ed5-99d5-c6c349cc01c3.png" 
              alt="ZepTech" 
              className="h-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/lovable-uploads/64ad379d-c330-4ed5-99d5-c6c349cc01c3.png';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation 
            isActive={isActive}
            isServicesActive={isServicesActive}
            isProductsActive={false}
          />

          {/* Desktop Auth Menu */}
          <div className="hidden md:flex items-center gap-4">
            <UserMenu />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </div>
    </nav>
  );
};

export default Navbar;
