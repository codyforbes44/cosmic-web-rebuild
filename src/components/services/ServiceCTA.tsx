
import { ServiceType } from "@/types/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageSquare, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCTAProps {
  service: ServiceType;
}

const ServiceCTA = ({ service }: ServiceCTAProps) => {
  return (
    <Card className="bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-xl overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4" style={{ color: service.color }}>
              Ready to transform your business with {service.name}?
            </h3>
            <p className="text-gray-300 mb-6">
              Our experts are ready to help you implement the perfect solution for your unique business needs.
              Get started today with a no-obligation consultation.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                <span className="text-gray-200">Custom solution designed specifically for your business</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                <span className="text-gray-200">Implementation support from industry experts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                <span className="text-gray-200">Ongoing optimization to maximize your ROI</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col justify-center gap-4">
            <Link to="/get-quote" className="w-full">
              <Button className="w-full bg-accent hover:bg-accent/80 text-white">
                Get a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full">
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/20">
                <MessageSquare className="mr-2 h-4 w-4" /> Talk to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCTA;
