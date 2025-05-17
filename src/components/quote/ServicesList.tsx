
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ServicesList = () => {
  const services = [
    {
      category: "Business Strategy",
      items: [
        "Digital Transformation",
        "Process Optimization",
        "Market Analysis & Research",
        "Growth Strategy"
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
      category: "Technology Solutions",
      items: [
        "Custom Software Development",
        "Enterprise Applications",
        "Cloud Migration & Management",
        "Data Analytics & Insights"
      ],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
      category: "AI & Innovation",
      items: [
        "AI Integration",
        "Process Automation",
        "Machine Learning Solutions",
        "Innovation Consulting"
      ],
      image: "https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      category: "Support Services",
      items: [
        "Managed IT Services",
        "24/7 Technical Support",
        "Training & Implementation",
        "Security & Compliance"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="space-y-6">
      {services.map((service, index) => (
        <Card key={index} className="bg-opacity-20 backdrop-blur-lg bg-space-deep-blue border border-opacity-20 border-white rounded-xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-white flex items-center justify-between">
              {service.category}
              {service.image && (
                <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-700">
                  <img 
                    src={service.image} 
                    alt={`${service.category} icon`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ul className="space-y-2">
              {service.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      
      <Card className="bg-opacity-20 backdrop-blur-lg bg-space-deep-blue border border-opacity-20 border-white rounded-xl overflow-hidden">
        <CardContent className="pt-6">
          <p className="text-gray-200">
            <span className="text-white font-medium">Need a custom service?</span> No problem! 
            Describe your specific requirements in the form and our team will create a 
            tailored solution for you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesList;
