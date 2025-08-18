
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const HeroContent = () => {
  return (
    <div>
      <span className="inline-block text-brand-gold mb-4 text-sm md:text-lg tracking-wider font-medium px-3 py-1 bg-brand-gold/10 rounded-full">PROFESSIONAL RECRUITMENT MARKETING</span>
      
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
        Attract Top Talent With <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-orange-400">Strategic Recruitment Campaigns</span>
      </h1>
      
      <p className="text-gray-300 mb-4 md:mb-6 text-base md:text-lg max-w-2xl">
        Specialized recruitment marketing services that help you find qualified candidates faster and more cost-effectively. We create targeted campaigns across all industries that reduce your cost-per-hire and improve retention rates.
      </p>
      
      <ul className="mb-6 md:mb-8 space-y-2 max-w-2xl mx-auto md:mx-0">
        {[
          "Reduce cost-per-hire by up to 40% with targeted campaigns",
          "Multi-channel advertising across social media, search, and job boards",
          "Higher quality applications from qualified professionals",
          "Enhanced employer brand and company reputation"
        ].map((benefit, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-brand-gold mr-2 flex-shrink-0 mt-1" />
            <span className="text-gray-200 text-left text-sm md:text-base">{benefit}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <Link to="/demo" className="w-full sm:w-auto">
          <Button className="bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold px-6 py-5 rounded-md w-full text-base">
            See Live Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link to="/quote" className="w-full sm:w-auto">
          <Button variant="outline" className="border-gray-500 hover:bg-gray-800 text-white px-6 py-5 w-full text-base">
            Get Free Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
