
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface DesktopOfferCardProps {
  onRequestDemo: () => void;
}

const DesktopOfferCard = ({ onRequestDemo }: DesktopOfferCardProps) => {
  return (
    <div className="hidden md:block">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-accent/30 rounded-lg blur-xl"></div>
        <div className="bg-space-dark-blue/80 backdrop-blur-sm rounded-lg p-8 border border-gray-700 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Start Your Project Today</h3>
            <span className="text-accent font-medium">Limited Time</span>
          </div>
          <ul className="space-y-4 mb-6">
            {[
              "Free initial consultation",
              "Project assessment & roadmap",
              "Custom quote within 48 hours",
              "No commitment required"
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-5 w-5 text-accent mr-2" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
          <Button 
            className="w-full bg-accent hover:bg-accent/90 py-5 text-white"
            onClick={onRequestDemo}
          >
            Schedule Your Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesktopOfferCard;
