
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

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
      <StarBackground />
      <Navbar />
      <div className="relative min-h-screen z-10">
        <div className="container mx-auto px-4 py-12">
          <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                404
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Oops! The page you're looking for doesn't exist
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button className="bg-accent hover:bg-accent/80 flex items-center gap-2" asChild>
              <a href="/">
                <Home size={18} />
                Return to Home
              </a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
