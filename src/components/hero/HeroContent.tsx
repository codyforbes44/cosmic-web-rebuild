
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const HeroContent = () => {
  return (
    <div>
      <span className="inline-block text-accent mb-4 text-sm md:text-lg tracking-wider font-medium px-3 py-1 bg-accent/10 rounded-full">INNOVATIVE SOLUTIONS</span>
      
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
        Transform Your Business With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">ƷBI</span>
      </h1>
      
      <p className="text-gray-300 mb-4 md:mb-6 text-base md:text-lg">
        Elevate your organization with our cutting-edge technology solutions and expert consulting.
      </p>
      
      <ul className="mb-6 md:mb-8 space-y-2 max-w-md mx-auto md:mx-0">
        {[
          "Custom software development tailored to your needs",
          "Data-driven insights to optimize your operations",
          "Strategic consulting from industry experts",
          "Ongoing support and maintenance"
        ].map((benefit, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-1" />
            <span className="text-gray-200 text-left text-sm md:text-base">{benefit}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <Link to="/get-quote" className="w-full sm:w-auto">
          <Button className="bg-accent hover:bg-accent/80 text-white px-6 py-5 rounded-md w-full text-base">
            Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link to="/services" className="w-full sm:w-auto">
          <Button variant="outline" className="border-gray-500 hover:bg-gray-800 text-white px-6 py-5 w-full text-base">
            View Our Services
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
