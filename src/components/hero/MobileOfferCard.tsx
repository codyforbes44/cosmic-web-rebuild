
import { Button } from "@/components/ui/button";

interface MobileOfferCardProps {
  onRequestDemo: () => void;
}

const MobileOfferCard = ({ onRequestDemo }: MobileOfferCardProps) => {
  return (
    <div className="mt-6 w-full py-6 px-5 bg-space-dark-blue/60 border border-gray-700 rounded-lg backdrop-blur-sm">
      <div className="text-center">
        <span className="inline-block mb-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">LIMITED OFFER</span>
        <h3 className="text-lg font-bold mb-3 text-white">Free Consultation</h3>
        <p className="text-sm text-gray-300 mb-4">Get expert advice and a custom quote within 48 hours.</p>
        <Button 
          className="w-full bg-accent hover:bg-accent/90 py-4 text-white"
          onClick={onRequestDemo}
        >
          Get Started Now
        </Button>
      </div>
    </div>
  );
};

export default MobileOfferCard;
