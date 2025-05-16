
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Planet {
  size: number;
  top: string;
  left: string;
  color: string;
  delay: number;
}

const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const planets: Planet[] = [
    { size: 100, top: "10%", left: "5%", color: "#F59E0B", delay: 0.2 }, // Orange
    { size: 60, top: "25%", left: "85%", color: "#06B6D4", delay: 0.3 }, // Teal
    { size: 40, top: "70%", left: "80%", color: "#8B5CF6", delay: 0.4 }, // Purple
    { size: 25, top: "60%", left: "15%", color: "#10B981", delay: 0.5 }, // Green
  ];

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-16">
      {/* Background planets */}
      {planets.map((planet, index) => (
        <div
          key={index}
          className="planet opacity-25"
          style={{
            width: planet.size,
            height: planet.size,
            top: planet.top,
            left: planet.left,
            backgroundColor: planet.color,
            boxShadow: `0 0 60px ${planet.color}80`,
            animationDelay: `${planet.delay}s`,
          }}
        />
      ))}

      <div 
        className={`container mx-auto px-4 py-20 z-10 text-center transition-all duration-1000 transform ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <span className="text-accent mb-4 block text-lg tracking-wider font-medium">EXPLORE THE COSMOS</span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
          Journey Through The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Infinite Universe
          </span>
        </h1>
        
        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
          Discover the mysteries of space, explore planets, stars, and galaxies
          through stunning visuals and cutting-edge astronomical insights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-accent hover:bg-accent/80 text-white px-8 py-6 rounded-md"
          >
            Start Exploring
          </Button>
          <Link to="/gallery">
            <Button
              variant="outline"
              className="border-gray-500 hover:bg-gray-800 text-white px-8 py-6"
            >
              View Gallery
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
