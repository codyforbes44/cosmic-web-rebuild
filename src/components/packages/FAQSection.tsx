
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const FAQSection: React.FC = () => {
  return (
    <div className="mt-24 text-center">
      <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
      <p className="text-gray-300 mb-8">
        Have more questions about our packages? Find answers to common questions or reach out to our team.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/faq?category=pricing">
          <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
            Pricing FAQs <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
        <Link to="/faq?category=services">
          <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
            Services FAQs <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
        <Link to="/contact">
          <Button className="bg-accent hover:bg-accent/80 text-white">
            Contact Us <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FAQSection;
