
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const HeroContent = () => {
  return (
    <div>
      <span className="inline-block text-orange-500 mb-4 text-sm md:text-lg tracking-wider font-medium px-3 py-1 bg-orange-500/10 rounded-full">INDUSTRY LEADING RECRUITMENT MARKETING</span>
      
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
        Solve Your Driver Shortage With <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">ƷBI</span>
      </h1>
      
      <p className="text-gray-300 mb-4 md:mb-6 text-base md:text-lg">
        Streamlined recruitment marketing that delivers qualified CDL drivers while reducing your cost-per-hire by up to 40%.
      </p>
      
      <ul className="mb-6 md:mb-8 space-y-2 max-w-md mx-auto md:mx-0">
        {[
          "250% increase in qualified driver applications",
          "Multi-channel campaigns across all platforms",
          "Industry-specific targeting and messaging",
          "Proven track record with trucking companies"
        ].map((benefit, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-1" />
            <span className="text-gray-200 text-left text-sm md:text-base">{benefit}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <Link to="/recruitment-marketing" className="w-full sm:w-auto">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-5 rounded-md w-full text-base">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link to="/contact" className="w-full sm:w-auto">
          <Button variant="outline" className="border-gray-500 hover:bg-gray-800 text-white px-6 py-5 w-full text-base">
            Free Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
