
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found | ƷBI"
        description="The page you're looking for doesn't exist. Return to our homepage to explore our services."
        image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630&fit=crop&crop=center"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-space-dark-blue to-space-deep-blue py-16 px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-accent hover:bg-accent/80 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
