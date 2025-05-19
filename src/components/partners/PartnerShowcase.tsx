
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Building, Globe, Handshake, Link2 } from "lucide-react";

// Partner data
const partners = {
  technology: [
    {
      name: "CloudTech Solutions",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=100&q=80",
      category: "Cloud Services",
      description: "Leading provider of cloud infrastructure and platform services for enterprise applications.",
      website: "https://example.com",
    },
    {
      name: "SecureNet Systems",
      logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&h=100&q=80",
      category: "Cybersecurity",
      description: "Advanced cybersecurity solutions protecting businesses from emerging digital threats.",
      website: "https://example.com",
    },
    {
      name: "DataStream Analytics",
      logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&h=100&q=80",
      category: "Data Analytics",
      description: "Powerful data analytics platforms enabling businesses to extract actionable insights.",
      website: "https://example.com",
    },
    {
      name: "NexGen Systems",
      logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=200&h=100&q=80",
      category: "AI Solutions",
      description: "Cutting-edge artificial intelligence solutions for automation and decision support.",
      website: "https://example.com",
    },
  ],
  solutions: [
    {
      name: "SmartServe CRM",
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&h=100&q=80",
      category: "Customer Relationship",
      description: "Comprehensive CRM platform designed for enterprise customer management.",
      website: "https://example.com",
    },
    {
      name: "FinTech Innovations",
      logo: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=200&h=100&q=80",
      category: "Financial Services",
      description: "Innovative fintech solutions for modern financial operations and transactions.",
      website: "https://example.com",
    },
    {
      name: "HealthTech Systems",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&h=100&q=80",
      category: "Healthcare IT",
      description: "Specialized healthcare technology solutions improving patient care and operations.",
      website: "https://example.com",
    },
  ],
  consulting: [
    {
      name: "Strategy Partners Group",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&h=100&q=80",
      category: "Business Strategy",
      description: "Expert business strategy consulting for digital transformation initiatives.",
      website: "https://example.com",
    },
    {
      name: "Global IT Advisors",
      logo: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=200&h=100&q=80",
      category: "IT Consulting",
      description: "Specialized IT advisory services for enterprise technology implementation.",
      website: "https://example.com",
    },
  ],
};

const PartnerShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState("technology");

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partner Network</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We've built partnerships with industry-leading organizations to provide our clients with the best technology solutions and services.
          </p>
        </div>

        <Tabs defaultValue="technology" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-space-deep-blue">
              <TabsTrigger value="technology" className="data-[state=active]:bg-accent/20">
                <Building className="mr-2 h-4 w-4" />
                Technology Partners
              </TabsTrigger>
              <TabsTrigger value="solutions" className="data-[state=active]:bg-accent/20">
                <Globe className="mr-2 h-4 w-4" />
                Solution Partners
              </TabsTrigger>
              <TabsTrigger value="consulting" className="data-[state=active]:bg-accent/20">
                <Handshake className="mr-2 h-4 w-4" />
                Consulting Partners
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="technology" className="mt-0">
            <PartnerGrid partners={partners.technology} />
          </TabsContent>
          
          <TabsContent value="solutions" className="mt-0">
            <PartnerGrid partners={partners.solutions} />
          </TabsContent>
          
          <TabsContent value="consulting" className="mt-0">
            <PartnerGrid partners={partners.consulting} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface Partner {
  name: string;
  logo: string;
  category: string;
  description: string;
  website: string;
}

interface PartnerGridProps {
  partners: Partner[];
}

const PartnerGrid: React.FC<PartnerGridProps> = ({ partners }) => {
  return (
    <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
      {partners.map((partner, index) => (
        <motion.div
          key={partner.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="min-w-[300px] max-w-[400px] flex-1 snap-start"
        >
          <Card className="bg-space-deep-blue border-gray-800 h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-accent/50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="w-32 h-16 flex items-center justify-center bg-white/5 rounded-md p-2">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                  {partner.category}
                </Badge>
              </div>
              <CardTitle className="mt-4 text-xl">{partner.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-gray-400 flex-grow mb-4">{partner.description}</p>
              <a 
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-brand-gold hover:text-brand-gold/80"
              >
                <Link2 className="h-4 w-4 mr-1.5" />
                Visit Partner Site
              </a>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PartnerShowcase;
