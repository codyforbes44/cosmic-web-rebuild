
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceType } from "@/types/services";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceHeaderProps {
  services: ServiceType[];
  selectedService: ServiceType;
  onTabChange: (value: string) => void;
}

const ServiceHeader = ({ services, selectedService, onTabChange }: ServiceHeaderProps) => {
  return (
    <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
      <CardContent className="p-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Professional Technology Solutions
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-4">
            Comprehensive technology services designed to transform your business and drive innovation
          </p>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm rounded-full px-4 py-1">
            <span className="h-2 w-2 bg-accent rounded-full"></span>
            Trusted by 200+ businesses worldwide
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mt-10 mb-4">
          <Tabs 
            value={selectedService.id} 
            onValueChange={onTabChange}
            className="justify-center"
          >
            <TabsList className="bg-gray-800/60 inline-flex flex-wrap gap-2 h-auto p-2 rounded-xl">
              {services.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id}
                  className="data-[state=active]:text-white text-sm px-4 py-2 rounded-md transition-colors duration-200"
                  style={{ 
                    borderBottom: selectedService.id === service.id ? `2px solid ${service.color}` : 'none',
                    color: selectedService.id === service.id ? service.color : 'inherit'
                  }}
                >
                  {service.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-400 mt-4"
        >
          Select a service above to learn more or <a href="/get-quote" className="underline text-accent hover:text-accent/80">contact us</a> for a custom solution
        </motion.p>
      </CardContent>
    </Card>
  );
};

export default ServiceHeader;
