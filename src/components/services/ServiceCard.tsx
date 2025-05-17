
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  image: string;
  name: string;
}

const ServiceCard = ({ image, name }: ServiceCardProps) => {
  return (
    <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl overflow-hidden shadow-lg h-full">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
