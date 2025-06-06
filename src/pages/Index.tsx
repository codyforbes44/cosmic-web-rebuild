
import React from "react";
import HeroSection from "../components/HeroSection";
import ProductOfferings from "../components/ProductOfferings";
import TechnologyShowcase from "../components/TechnologyShowcase";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import { useAuth } from "@/components/auth/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-space-dark-blue">
      <SEO 
        title="ZepTech - Advanced Technology Solutions"
        description="Cutting-edge technology solutions including AI, machine learning, cloud computing, and digital transformation services."
      />
      <Navbar />
      <HeroSection />
      
      {/* Welcome message for authenticated users */}
      {user && (
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-space-deep-blue/60 border-gray-700 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Welcome back! 👋
                  </h2>
                  <p className="text-gray-300">
                    Ready to explore our advanced features? Check out your saved locations or manage your profile.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Link to="/weather">
                      <Star className="w-4 h-4 mr-2" />
                      Saved Locations
                    </Link>
                  </Button>
                  <Button asChild className="bg-brand-gold hover:bg-brand-gold/90 text-black">
                    <Link to="/profile">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <ProductOfferings />
      <TechnologyShowcase />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
