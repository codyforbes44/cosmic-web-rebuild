import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ResponsiveHeroOfferCardProps {
  onRequestDemo: () => void;
  isMobile: boolean;
}

const ResponsiveHeroOfferCard = memo(({ onRequestDemo, isMobile }: ResponsiveHeroOfferCardProps) => {
  if (isMobile) {
    return (
      <div className="mt-4 sm:mt-6 w-full py-4 sm:py-6 px-3 sm:px-5 bg-card/60 border border-border rounded-lg backdrop-blur-sm">
        <div className="text-center space-y-3 sm:space-y-4">
          <span className="inline-block mb-1 sm:mb-2 px-2 sm:px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
            LIMITED OFFER
          </span>
          <h3 className="text-base sm:text-lg font-bold text-foreground">
            Free Consultation
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Get expert advice and a custom quote within 48 hours.
          </p>
          <Button 
            className="w-full bg-accent hover:bg-accent-hover py-3 sm:py-4 text-accent-foreground text-sm font-medium transition-all duration-300"
            onClick={onRequestDemo}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    );
  }

  const offerItems = [
    "Free initial consultation",
    "Project assessment & roadmap",
    "Custom quote within 48 hours",
    "No commitment required"
  ];

  return (
    <div className="hidden md:block">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-accent/30 rounded-lg blur-xl"></div>
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 lg:p-8 border border-border relative">
          <div className="flex justify-between items-center mb-4 lg:mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-foreground">
              Start Your Project Today
            </h3>
            <span className="text-accent font-medium text-sm lg:text-base">
              Limited Time
            </span>
          </div>
          <ul className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
            {offerItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2 lg:gap-3">
                <Check className="h-4 w-4 lg:h-5 lg:w-5 text-accent flex-shrink-0" />
                <span className="text-muted-foreground text-sm lg:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <Button 
            className="w-full bg-accent hover:bg-accent-hover py-4 lg:py-5 text-accent-foreground font-medium transition-all duration-300"
            onClick={onRequestDemo}
          >
            Schedule Your Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
});

ResponsiveHeroOfferCard.displayName = 'ResponsiveHeroOfferCard';

export default ResponsiveHeroOfferCard;