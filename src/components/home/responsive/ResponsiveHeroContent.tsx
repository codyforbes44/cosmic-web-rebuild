import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface ResponsiveHeroContentProps {
  isMobile: boolean;
}

const ResponsiveHeroContent = memo(({ isMobile }: ResponsiveHeroContentProps) => {
  const benefits = [
    "Reduce cost-per-hire by up to 40% with targeted campaigns",
    "Multi-channel advertising across social media, search, and job boards",
    "Higher quality applications from qualified professionals",
    "Enhanced employer brand and company reputation"
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <span className="inline-block text-accent mb-3 sm:mb-4 text-xs sm:text-sm md:text-base lg:text-lg tracking-wider font-medium px-2 sm:px-3 py-1 bg-accent/10 rounded-full">
        PROFESSIONAL RECRUITMENT MARKETING
      </span>
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-foreground leading-tight">
        Attract Top Talent With{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
          Strategic Recruitment Campaigns
        </span>
      </h1>
      
      <p className="text-muted-foreground mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
        Specialized recruitment marketing services that help you find qualified candidates faster and more cost-effectively. We create targeted campaigns across all industries that reduce your cost-per-hire and improve retention rates.
      </p>
      
      <ul className="mb-4 sm:mb-6 md:mb-8 space-y-2 sm:space-y-3 max-w-2xl mx-auto md:mx-0">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2 sm:gap-3">
            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0 mt-0.5 sm:mt-1" />
            <span className="text-muted-foreground text-left text-xs sm:text-sm md:text-base leading-relaxed">
              {benefit}
            </span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
        <Link to="/demo" className="w-full sm:w-auto">
          <Button 
            className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-4 sm:px-6 py-3 sm:py-4 md:py-5 rounded-md w-full text-sm sm:text-base transition-all duration-300"
            size={isMobile ? "default" : "lg"}
          >
            See Live Demo <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>
        <Link to="/quote" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-border hover:bg-muted text-foreground px-4 sm:px-6 py-3 sm:py-4 md:py-5 w-full text-sm sm:text-base transition-all duration-300"
            size={isMobile ? "default" : "lg"}
          >
            Get Free Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
});

ResponsiveHeroContent.displayName = 'ResponsiveHeroContent';

export default ResponsiveHeroContent;